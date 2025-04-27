/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { EthAddress, Uint256 } from '../../dto/constants/chain-structs';
import { getShopABI } from '../../dto/constants/chain-abis';
import { getGasPrice } from '../../dto/constants/chain-constants';
import {
  RequestAlreadyConfirmed,
  RequestDoesntExist,
  RequestNotConfirmed,
  Unauthorized,
} from '../../dto/errors/chain-errors';
import { ModalInterface } from '../../dto/interfaces/modal-interface.interface';
import { Chain } from '../../dto/chains';

export const EVMApproveRequest = async function (
  provider: ethers.BrowserProvider,
  chain: Chain,
  address: EthAddress,
  requestId: Uint256,
  shopAddress: EthAddress,
  modalInterface: ModalInterface,
): Promise<string> {
  const signer = await provider.getSigner();
  if (
    (await signer.getAddress()).toLocaleLowerCase() !==
    address.toLocaleLowerCase()
  ) {
    throw new Error('Address does not match signer address');
  }
  modalInterface.waiting('Approving request...');
  const contract = new ethers.Contract(
    shopAddress,
    getShopABI(),
    signer
  );
  try {
    await contract['approveRequest'].staticCall(requestId);
    const gasEstimation = (
      await contract['approveRequest'].estimateGas(requestId)
    )
      .valueOf();
    modalInterface.waiting('Approving...');
    const tx = await contract['approveRequest'](requestId, {
      gasLimit: (gasEstimation * BigInt(105)) / BigInt(100),
      gasPrice: getGasPrice(provider),
    });
    modalInterface.success('Request Approved.');
    return tx.hash;
  } catch (e: any) {
    if (e.code.toString() === 'ACTION_REJECTED') {
      throw new Error('Transaction Rejected');
    }
    const err = contract.interface.parseError(e.data);
    if (err && err.name === 'RequestAlreadyConfirmed') {
      throw new RequestAlreadyConfirmed(requestId, shopAddress);
    } else if (err && err.name === 'RequestDoesntExist') {
      throw new RequestDoesntExist(requestId, shopAddress);
    } else if (err && err.name === 'OwnableUnauthorizedAccount') {
      throw new Unauthorized('Approve', address, shopAddress);
    } else {
      throw e;
    }
  }
};

export const EVMDisapproveRequest = async function (
  provider: ethers.BrowserProvider,
  chain: Chain,
  address: EthAddress,
  requestId: Uint256,
  shopAddress: EthAddress,
  modalInterface: ModalInterface,
) {
  const signer = await provider.getSigner();
  if (
    (await signer.getAddress()).toLocaleLowerCase() !==
    address.toLocaleLowerCase()
  ) {
    throw new Error('Address does not match signer address');
  }
  modalInterface.waiting('Disapproving request...');
  const contract = new ethers.Contract(
    shopAddress,
    getShopABI(),
    signer
  );
  try {
    await contract['disapprove'].staticCall(requestId);
    const gasEstimation = (await contract['disapprove'].estimateGas(requestId))
      .valueOf();
    modalInterface.waiting('Disapproving...');
    const tx = await contract['disapprove'](requestId, {
      gasLimit: (gasEstimation * BigInt(105)) / BigInt(100),
      gasPrice: getGasPrice(provider),
    });
    modalInterface.success('Request Disapproved.');
    return tx.hash;
  } catch (e: any) {
    if (e.code.toString() === 'ACTION_REJECTED') {
      throw new Error('Transaction Rejected');
    }
    const err = contract.interface.parseError(e.data);
    if (err && err.name === 'OwnableUnauthorizedAccount') {
      throw new Unauthorized('Disapprove', address, shopAddress);
    } else if (err && err.name === 'RequestDoesntExist') {
      throw new RequestDoesntExist(requestId, shopAddress);
    } else if (err && err.name === 'RequestNotConfirmed') {
      throw new RequestNotConfirmed(requestId, shopAddress);
    }
    throw e;
  }
};
