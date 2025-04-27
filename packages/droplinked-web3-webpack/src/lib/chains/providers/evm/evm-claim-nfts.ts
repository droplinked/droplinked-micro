/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { getShopABI } from '../../dto/constants/chain-abis';
import {
  DroplinkedChainConfig,
  IWeb3Context,
  toEthAddress,
} from '../../../web3';
import { ClaimNFTInputs } from '../../dto/interfaces/claim-nft-inputs';
import { DROPLINKED_MANAGER } from '../../dto/constants/chain-constants';

export async function claimNFT(
  data: ClaimNFTInputs,
  chainConfig: DroplinkedChainConfig,
  context: IWeb3Context
) {
  console.log({ data, chainConfig, context });
  const { modalInterface } = context;
  const signer = await chainConfig.provider.getSigner();
  const shopABI = getShopABI();
  modalInterface.waiting('Claiming NFTs...');
  const contract = new ethers.Contract(
    toEthAddress(context.shopContractAddress as string),
    shopABI,
    signer
  );
  try {
    modalInterface.waiting('Claiming NFTs...');
    console.log(DROPLINKED_MANAGER, data.signature.signature, {
      cart: data.signature.purchaseData.map((item) => {
        return {
          amount: item.amount,
          productId: item.productId,
          nullifier: item.nullifier,
        };
      }),
      shop: context.shopContractAddress,
    });
    type PurchasedItem = {
      amount: number;
      productId: ethers.BigNumberish;
      nullifier: ethers.BigNumberish;
    };
    const cart: PurchasedItem[] = data.signature.purchaseData.map((item) => {
      return {
        amount: item.amount,
        productId: BigInt(item.productId),
        nullifier: BigInt(item.nullifier),
      };
    });
    const tx = await contract['claimPurchase'](
      DROPLINKED_MANAGER,
      data.signature.signature,
      {
        cart: cart,
        shop: context.shopContractAddress,
      }
    );
    modalInterface.waiting('Waiting for transaction...');
    await tx.wait();
    modalInterface.success('Claimed NFTs!');
    return {
      transactionHash: tx.hash,
    };
  } catch (e: any) {
    console.error(e);
    if (e.code && e.code.toString() === 'ACTION_REJECTED') {
      context.modalInterface.error('Transaction Rejected');
      throw new Error('Transaction Rejected');
    }
    try {
      const err = contract.interface.parseError(e.data);
      if (err !== null && err.name === 'OwnableUnauthorizedAccount')
        context.modalInterface.error(err.name);
      context.modalInterface.error(e);
      throw e;
    } catch (error) {
      modalInterface.error(`Unexpected error: ${error}`);
      throw error;
    }
  }
}
