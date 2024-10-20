/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { Chain, Network, getGasPrice } from '../../dto/chains';
import { IChainPayment } from '../../dto/interfaces/chain-payment.interface';
import { erc20ABI } from '../../dto/constants/chain-abis';
import {
  getPaymentProxyABI,
  getProxyAddress,
} from '../../dto/constants/chain-constants';

export const droplinked_payment = async function (
  provider: any,
  chain: Chain,
  network: Network,
  address: string,
  data: IChainPayment
) {
  const signer = provider.getSigner();
  if (!data.cartItems) {
    data.cartItems = [];
  }
  if (!data.tbdReceivers || !data.tbdValues) {
    data.tbdReceivers = [];
    data.tbdValues = [];
  }
  if (
    (await signer.getAddress()).toLocaleLowerCase() !==
    address.toLocaleLowerCase()
  )
    throw new Error('Address does not match signer address');
  const contractAddress = await getProxyAddress(chain, network);
  const contract = new ethers.Contract(
    contractAddress,
    await getPaymentProxyABI(chain),
    signer
  );
  try {
    console.log(`
			data.tbdValues: ${data.tbdValues}
			data.tbdReceivers: ${data.tbdReceivers}
			data.cartItems: ${data.cartItems}
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
        chain,
        network,
        signer,
        contract,
        address
      );
    }

    const isCustom =
      data.tokenAddress &&
      data.tokenAddress !== '0x0000000000000000000000000000000000000000';

    if (isCustom) {
      console.log('approving');
      const customTokenContract = new ethers.Contract(
        data.tokenAddress as string,
        erc20ABI,
        provider
      );

      const userCustomTokenBalance = ethers.BigNumber.from(
        await customTokenContract['balanceOf'](address)
      );

      const totalSum = data.tbdValues.reduce((total, currentValue) =>
        ethers.BigNumber.from(total).add(ethers.BigNumber.from(currentValue))
      );

      if (userCustomTokenBalance.lt(totalSum)) {
        throw new Error('Insufficient token balance');
      }

      if (!data.tokenAddress) {
        throw new Error('Token Address is not set');
      }

      console.log('Approving');
      const tokenContract = new ethers.Contract(
        data.tokenAddress,
        erc20ABI,
        signer
      );
      const totalValue = ethers.BigNumber.from(totalSum);
      const approveTx = await tokenContract['approve'](
        contractAddress,
        totalValue
      );
      await approveTx.wait();
      console.log('Approved');
    }
    if (!isCustom) {
      data.tbdValues = data.tbdValues.map((item, index) => {
        return Number.parseInt(data.tbdValues[index].toString());
      });
    }

    // check native currency balance for gas and payment
    const userBalance = await signer.getBalance();
    if (userBalance.lt(data.totalPrice)) {
      throw new Error('Insufficient balance');
    }

    await contract.callStatic['droplinkedPurchase'](
      data.tbdValues,
      data.tbdReceivers,
      data.cartItems,
      data.tokenAddress,
      data.chainLinkRoundId!,
      data.memo,
      {
        value: data.totalPrice,
      }
    );
    console.log('static call done');
    const gasPrice = await getGasPrice(provider);
    const gasEstimation = (
      await contract.estimateGas['droplinkedPurchase'](
        data.tbdValues,
        data.tbdReceivers,
        data.cartItems,
        data.tokenAddress,
        data.chainLinkRoundId!,
        data.memo,
        {
          value: data.totalPrice,
        }
      )
    )
      .toBigInt()
      .valueOf();
    console.log('gas estimation done');
    const gasLimit = (gasEstimation * BigInt(105)) / BigInt(100);
    if (
      userBalance.lt(
        ethers.BigNumber.from(data.totalPrice).add(
          gasLimit * gasPrice.valueOf()
        )
      )
    ) {
      throw new Error('Insufficient balance');
    }

    const tx = await contract['droplinkedPurchase'](
      data.tbdValues,
      data.tbdReceivers,
      data.cartItems,
      data.tokenAddress,
      data.chainLinkRoundId!,
      data.memo,
      {
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        value: data.totalPrice,
      }
    );
    return { deploy_hash: tx.hash, cryptoAmount: data.totalPrice };
  } catch (e: any) {
    if (
      (e?.code && e?.code?.toString() === 'ACTION_REJECTED') ||
      (e?.message !== undefined && e?.message === 'User cancelled transaction')
    ) {
      throw new Error('Transaction Rejected');
    }
    throw e;
  }
};

const redbellyPayment = async function (
  data: IChainPayment,
  contract: ethers.Contract
) {
  data.tbdValues = data.tbdValues.map((item, index) => {
    return Number.parseInt(data.tbdValues[index].toString());
  });
  const tx = await contract['droplinkedPurchase'](
    data.tbdValues,
    data.tbdReceivers,
    data.cartItems,
    '0x0000000000000000000000000000000000000000',
    data.chainLinkRoundId,
    data.memo,
    {
      value: data.totalPrice,
      gasLimit: 3e6,
    }
  );
  return { deploy_hash: tx.hash, cryptoAmount: data.totalPrice };
};

const skalePayment = async function (
  data: IChainPayment,
  chain: Chain,
  network: Network,
  signer: ethers.Signer,
  contract: ethers.Contract,
  address: string
) {
  const usdcAddress =
    network === Network.TESTNET
      ? '0x2aebcdc4f9f9149a50422fff86198cb0939ea165'
      : '0x7Cf76E740Cb23b99337b21F392F22c47Ad910c67';
  const usdcContract = new ethers.Contract(usdcAddress, erc20ABI, signer);
  const userTokenBalance = await usdcContract['balanceOf'](address);
  if (userTokenBalance.lt(data.totalPrice)) {
    throw new Error('Insufficient balance');
  }
  const approveTx = await usdcContract['approve'](
    await getProxyAddress(chain, network),
    data.totalPrice
  );
  console.log({ approveTx });
  await approveTx.wait();
  console.log('Approved');
  console.log({ data });
  const tx = await contract['droplinkedPurchase'](
    data.tbdValues,
    data.tbdReceivers,
    data.cartItems,
    usdcAddress,
    data.memo
  );
  return { deploy_hash: tx.hash, cryptoAmount: data.totalPrice };
};
