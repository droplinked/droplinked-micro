/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { Chain, Network, getGasPrice } from '../../dto/chains';
import { IChainPayment } from '../../dto/interfaces/chain-payment.interface';
import { erc20ABI, getPaymentProxyABI } from '../../dto/constants/chain-abis';
import {
  getProxyAddress,
  ZERO_ADDRESS,
} from '../../dto/constants/chain-constants';
import { DroplinkedChainConfig } from '../../dto/configs/chain.config';
import { IWeb3Context } from '../../dto/interfaces/web3-context.interface';
import { isAddress } from 'ethers/lib/utils';

import {
  InsufficientBalanceException,
  InsufficientTokenBalanceException,
  InvalidParametersException,
  ModalInterface,
  Unauthorized,
  UserDeniedException,
} from '../../../web3';
import {
  SkaleUsdcAddressForMainnet,
  SkaleUsdcAddressForTestnet,
} from './evm-constants';

/**
 * Handles the approval of custom tokens before making a purchase.
 * @param data Payment data required for processing the transaction.
 * @param contractAddress Address of the contract to approve.
 * @param provider Ethereum provider instance.
 * @param signerAddress Address of the signer.
 * @param modalInterface Interface for displaying modal messages.
 */
async function handleCustomTokenApproval(
  data: IChainPayment,
  contractAddress: string,
  signer: ethers.Signer,
  signerAddress: string,
  modalInterface: ModalInterface
) {
  modalInterface.waiting('Initiating token approval...');

  if (!data.tokenAddress) {
    throw new InvalidParametersException('Token address is not set');
  }

  try {
    const customTokenContract = new ethers.Contract(
      data.tokenAddress,
      erc20ABI,
      signer
    );

    const approvalAmount = await customTokenContract['allowance'](
      signerAddress,
      contractAddress
    );

    const userTokenBalance = await customTokenContract['balanceOf'](
      signerAddress
    );

    modalInterface.waiting('Calculating total sum...');
    const totalSum = data.tbdValues.reduce(
      (total, value) =>
        (total as ethers.BigNumber).add(ethers.BigNumber.from(value)),
      ethers.BigNumber.from(0)
    );

    if (approvalAmount.gt(totalSum)) {
      modalInterface.waiting('Already approved the needed amount');
      return;
    }

    modalInterface.waiting('Checking token balance...');
    if (userTokenBalance.lt(totalSum)) {
      throw new InsufficientTokenBalanceException();
    }

    modalInterface.waiting('Approving tokens...');
    const approveTx = await customTokenContract['approve'](
      contractAddress,
      ethers.constants.MaxUint256
    );
    modalInterface.waiting('Waiting for approval confirmation...');
    await approveTx.wait();
    modalInterface.waiting('Token approval confirmed');
  } catch (error: unknown) {
    handleError(error);
  }
}

/**
 * Main function to handle the droplinked payment process.
 * @param chainConfig Configuration for the blockchain chain.
 * @param web3Context Context containing web3 related interfaces.
 * @param data Payment data required for processing the transaction.
 * @returns An object containing the transaction hash and crypto amount.
 */
export const droplinked_payment = async function (
  chainConfig: DroplinkedChainConfig,
  web3Context: IWeb3Context,
  data: IChainPayment
) {
  const { modalInterface } = web3Context;
  const { provider, chain, network, address } = chainConfig;

  if (!data.tbdReceivers.every(isAddress)) {
    throw new InvalidParametersException('Invalid receiver address found');
  }

  if (!data.tbdValues.every((value) => ethers.BigNumber.from(value).gt(0))) {
    throw new InvalidParametersException('tbdValues must be positive numbers');
  }

  data.chainLinkRoundId = data.chainLinkRoundId || '0';

  const signer = provider.getSigner();

  modalInterface.waiting('Got signer...');

  if (!data.tbdValues) {
    throw new InvalidParametersException(
      `Invalid tbdValues: ${data.tbdValues}`
    );
  }

  if (!data.tbdReceivers) {
    throw new InvalidParametersException(
      `Invalid tbdReceivers: ${data.tbdReceivers}`
    );
  }

  if (!data.memo) {
    throw new InvalidParametersException(
      `Memo is required for payment, current memo: ${data.memo}`
    );
  }

  if (data.tbdReceivers.length !== data.tbdValues.length) {
    throw new InvalidParametersException(
      'tbdReceivers and tbdValues must be the same length'
    );
  }

  const signerAddress = (await signer.getAddress()).toLowerCase();
  if (signerAddress !== address.toLowerCase()) {
    throw new Unauthorized('droplinked_payment', signerAddress, address);
  }

  modalInterface.waiting('Initial checks done...');

  let contractAddress: string;
  try {
    contractAddress = await getProxyAddress(chain, network);
  } catch (error: any) {
    throw new Error('Failed to get contract address: ' + error.message);
  }

  let contract: ethers.Contract;
  try {
    contract = new ethers.Contract(
      contractAddress,
      getPaymentProxyABI(),
      signer
    );
  } catch (error: any) {
    throw new Error('Failed to create contract instance: ' + error.message);
  }

  modalInterface.waiting('Got contract...');

  try {
    modalInterface.waiting(`
        Purchase Details:
			data.tbdValues: ${data.tbdValues}
			data.tbdReceivers: ${data.tbdReceivers}
			currency: ${data.tokenAddress},
			data.chainLinkRoundId: ${data.chainLinkRoundId}
			data.memo: ${data.memo}
			data.totalPrice: ${Number(data.totalPrice)}
			`);

    if (chain === Chain.REDBELLY) {
      return await redbellyPayment(data, contract);
    } else if (chain === Chain.SKALE) {
      return await skalePayment(
        data,
        network,
        signer,
        contract,
        address,
        contractAddress,
        modalInterface
      );
    }

    const isCustom = data.tokenAddress && data.tokenAddress !== ZERO_ADDRESS;

    modalInterface.waiting(`The payment is custom? ${isCustom}`);

    if (isCustom) {
      await handleCustomTokenApproval(
        data,
        contractAddress,
        signer,
        signerAddress,
        modalInterface
      );
    } else {
      data.tbdValues = data.tbdValues.map((value) =>
        parseInt(value.toString(), 10)
      );
    }

    modalInterface.waiting('Performing static call...');

    try {
      await contract.callStatic['droplinkedPurchase'](
        data.tbdValues,
        data.tbdReceivers,
        data.tokenAddress,
        data.chainLinkRoundId,
        data.memo,
        {
          value: isCustom ? ethers.BigNumber.from(0) : data.totalPrice,
        }
      );
    } catch (error: any) {
      throw new Error('Transaction will fail: ' + error.message);
    }
    modalInterface.waiting('Static Call done');

    let gasPrice: bigint;
    try {
      gasPrice = await getGasPrice(provider);
    } catch (error: any) {
      throw new Error('Failed to get gas price: ' + error.message);
    }

    modalInterface.waiting(`Got gas price: ${gasPrice}`);

    modalInterface.waiting('Calling estimate gas...');

    let gasEstimation: ethers.BigNumber;
    try {
      gasEstimation = await contract.estimateGas['droplinkedPurchase'](
        data.tbdValues,
        data.tbdReceivers,
        data.tokenAddress,
        data.chainLinkRoundId,
        data.memo,
        {
          value: isCustom ? ethers.BigNumber.from(0) : data.totalPrice,
        }
      );
    } catch (error: any) {
      throw new Error(
        `Gas estimation failed: ${error.message}. Please check the transaction parameters.`
      );
    }

    modalInterface.waiting(`gas estimation done: ${gasEstimation.toString()}`);
    const gasLimit = gasEstimation.mul(105).div(100);

    const baseValue = isCustom
      ? ethers.BigNumber.from(0)
      : ethers.BigNumber.from(data.totalPrice);

    modalInterface.waiting(
      `Gas limit: ${gasLimit.toString()}, gas price: ${gasPrice.toString()}, base: ${baseValue.toString()}`
    );

    let userBalance: ethers.BigNumber;
    try {
      userBalance = await provider.getBalance(address);
    } catch (error: any) {
      throw new Error('Failed to get user balance: ' + error.message);
    }

    modalInterface.waiting(`User balance: ${userBalance}`);

    const totalCost = baseValue.add(gasLimit.mul(gasPrice));

    if (userBalance.lt(totalCost)) {
      throw new InsufficientBalanceException();
    }

    modalInterface.waiting('Calling purchase...');
    const tx = await contract['droplinkedPurchase'](
      data.tbdValues,
      data.tbdReceivers,
      data.tokenAddress,
      data.chainLinkRoundId,
      data.memo,
      {
        gasLimit: gasLimit,
        value: isCustom ? ethers.BigNumber.from(0) : data.totalPrice,
      }
    );

    modalInterface.waiting('Waiting for transaction...');
    await tx.wait();
    modalInterface.waiting(`Transaction done`);
    return { transactionHash: tx.hash, cryptoAmount: data.totalPrice };
  } catch (e: unknown) {
    handleError(e);
  }
};

/**
 * Handles the payment process for the REDBELLY chain.
 * @param data Payment data required for processing the transaction.
 * @param contract Contract instance for the REDBELLY chain.
 * @returns An object containing the transaction hash and crypto amount.
 */
const redbellyPayment = async function (
  data: IChainPayment,
  contract: ethers.Contract
) {
  try {
    data.tbdValues = data.tbdValues.map((_item, index) => {
      return Number.parseInt(data.tbdValues[index].toString(), 10);
    });

    const tx = await contract['droplinkedPurchase'](
      data.tbdValues,
      data.tbdReceivers,
      ZERO_ADDRESS,
      data.chainLinkRoundId,
      data.memo,
      {
        value: data.totalPrice,
        gasLimit: 3_000_000, // Fixed gas limit
      }
    );
    // wait for the transaction to submit
    await tx.wait();
    return { transactionHash: tx.hash, cryptoAmount: data.totalPrice };
  } catch (error: unknown) {
    handleError(error);
  }
};

/**
 * Handles the payment process for the SKALE chain.
 * @param data Payment data required for processing the transaction.
 * @param chain The blockchain chain identifier.
 * @param network The network environment (testnet or mainnet).
 * @param signer The signer instance.
 * @param contract The contract instance.
 * @param address The user's address.
 * @returns An object containing the transaction hash and crypto amount.
 */
const skalePayment = async function (
  data: IChainPayment,
  network: Network,
  signer: ethers.Signer,
  contract: ethers.Contract,
  address: string,
  proxyAddress: string,
  modalInterface: ModalInterface
) {
  try {
    const usdcAddress =
      network === Network.TESTNET
        ? SkaleUsdcAddressForTestnet
        : SkaleUsdcAddressForMainnet;

    data.tokenAddress = usdcAddress;

    await handleCustomTokenApproval(
      data,
      proxyAddress,
      signer,
      address,
      modalInterface
    );

    const tx = await contract['droplinkedPurchase'](
      data.tbdValues,
      data.tbdReceivers,
      usdcAddress,
      '0',
      data.memo
    );
    return { transactionHash: tx.hash, cryptoAmount: data.totalPrice };
  } catch (error: unknown) {
    handleError(error);
  }
};

function handleError(error: unknown): never {
  if (error instanceof Error) {
    if (
      (error as any).code?.toString() === 'ACTION_REJECTED' ||
      error.message.includes('User denied') ||
      error.message.includes('User cancelled transaction')
    ) {
      throw new UserDeniedException();
    }
    throw error;
  } else {
    throw new Error('An unknown error occurred');
  }
}
