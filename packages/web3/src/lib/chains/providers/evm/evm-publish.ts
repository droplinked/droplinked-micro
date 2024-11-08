/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import {
  EthAddress,
  toEthAddress,
  Uint256,
} from '../../dto/constants/chain-structs';
import { getShopABI } from '../../dto/constants/chain-abis';
import { AlreadyRequested } from '../../dto/errors/chain-errors';
import { ContractType, getGasPrice } from '../../dto/constants/chain-constants';
import { ModalInterface } from '../../dto/interfaces/modal-interface.interface';
import { Chain } from '../../dto/chains';

export const EVMPublishRequest = async function ({
  provider,
  chain,
  address,
  productId,
  shopAddress,
  modalInterface,
  contractType,
}: {
  provider: any;
  chain: Chain;
  address: string;
  productId: Uint256;
  shopAddress: EthAddress;
  modalInterface: ModalInterface;
  contractType: ContractType;
}) {
  const signer = provider.getSigner();
  if (
    (await signer.getAddress()).toLocaleLowerCase() !==
    address.toLocaleLowerCase()
  ) {
    throw new Error('Address does not match signer address');
  }
  modalInterface.waiting('Requesting affiliate...');
  const contract = new ethers.Contract(
    shopAddress,
    getShopABI(contractType),
    signer
  );
  try {
    await contract.callStatic['requestAffiliate'](productId);
    const gasEstimation = (
      await contract.estimateGas['requestAffiliate'](productId)
    )
      .toBigInt()
      .valueOf();
    modalInterface.waiting('Sending request...');
    const tx = await contract['requestAffiliate'](productId, {
      gasLimit: (gasEstimation * BigInt(105)) / BigInt(100),
      gasPrice: getGasPrice(provider),
    });
    modalInterface.waiting('Confirming...');
    const receipt = await tx.wait();
    const logs = receipt.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .filter((log: any) => log != null);
    const affiliateLog = logs.find(
      (log: any) => log.name === 'AffiliateRequested'
    );
    const requestId = affiliateLog.args.requestId;
    const publisher = affiliateLog.args.requester;
    modalInterface.success('Request Sent.');
    return {
      transactionHash: tx.hash,
      requestId: requestId,
      publisher: publisher,
    };
  } catch (e: any) {
    if (e.code.toString() === 'ACTION_REJECTED') {
      modalInterface.error('Transaction Rejected');
      throw new Error('Transaction Rejected');
    }
    const err = contract.interface.parseError(e.data);
    if (err.name === 'AlreadyRequested') {
      modalInterface.error('Request Already Sent!');
      throw new AlreadyRequested(productId, toEthAddress(address));
    }
    throw e;
  }
};
