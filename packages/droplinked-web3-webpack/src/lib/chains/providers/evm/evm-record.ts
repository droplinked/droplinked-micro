/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import {
  NFTType,
} from '../../dto/constants/chain-structs';
import { FieldNotFound, Unauthorized } from '../../dto/errors/chain-errors';
import { getGasPrice } from '../../dto/constants/chain-constants';
import { getShopABI } from '../../dto/constants/chain-abis';
import { checkWallet, uploadMetadata } from './evm.helpers';
import { DroplinkedChainConfig } from '../../dto/configs/chain.config';
import {
  IProductDetails,
  ISKUDetails,
} from '../../dto/interfaces/record-web3-product.interface';
import { IWeb3Context } from '../../dto/interfaces/web3-context.interface';

function getRecordData(
  product: ISKUDetails & IProductDetails,
  metadataURL: string,
  nftContract: string
) {
  const {
    acceptsManageWallet,
    amount,
    royalty,
    type,
  } = product;
  return {
    nftAddress: nftContract,
    uri: metadataURL,
    amount: amount,
    accepted: acceptsManageWallet,
    affiliatePercentage: royalty,
    royalty: royalty,
    nftType: NFTType.ERC1155,
    productType: type,
  };
}

async function prepareRecordData(
  chainConfig: DroplinkedChainConfig,
  skuData: ISKUDetails,
  productData: IProductDetails,
  context: IWeb3Context
) {
  const { nftContract, modalInterface } = context;

  if (!nftContract) {
    throw new FieldNotFound(
      'nftContract'
    );
  }

  const { description } = productData;
  const { skuID } = skuData;
  const recordData = { ...skuData, ...productData };

  modalInterface.waiting('Uploading metadata...');

  const properties = {
    _id: recordData.skuProperties['_id'],
    ownerID: recordData.skuProperties['ownerID'],
    price: recordData.skuProperties['price'],
    quantity: recordData.skuProperties['quantity'],
    externalID: recordData.skuProperties['externalID'],
    options: recordData.skuProperties['options'],
    royalty: recordData.skuProperties['royalty'],
    createdAt: recordData.skuProperties['createdAt'],
  };

  const metadata = {
    name: recordData.productTitle,
    description: description,
    image: recordData.imageUrl,
    properties: properties,
  };

  const metadataURL = await uploadMetadata(
    metadata,
    skuID,
    context.axiosInstance
  );

  modalInterface.waiting(`Metadata uploaded: ${metadataURL}`);

  modalInterface.waiting('Getting recordData');
  const product = getRecordData(
    recordData,
    metadataURL,
    nftContract
  );

  modalInterface.waiting('Got recordData');
  return product;
}

export async function recordProduct(
  chainConfig: DroplinkedChainConfig,
  context: IWeb3Context,
  product: IProductDetails,
  skus: ISKUDetails[]
): Promise<{ transactionHash: string }> {
  const { modalInterface, nftContract, shopContractAddress } = context;

  if (!nftContract || !shopContractAddress) {
    throw new FieldNotFound(
      `nftContract||shopContractAddress`,
    );
  }

  const signer = chainConfig.provider.getSigner();

  modalInterface.waiting('Connecting to wallet...');

  await checkWallet(signer, chainConfig.address);

  modalInterface.waiting('Getting shop contract...');

  const contract = new ethers.Contract(
    shopContractAddress,
    getShopABI(),
    signer
  );

  try {
    const products = await Promise.all(
      skus.map((sku) => prepareRecordData(chainConfig, sku, product, context))
    );
    console.log({ products });
    let tx;
    if (chainConfig.gasPredictable) {
      modalInterface.waiting('CallStatic...');

      await contract.callStatic['mintAndRegisterBatch'](products);

      modalInterface.waiting('Estimating gas...');
      const gasEstimation = (
        await contract.estimateGas['mintAndRegisterBatch'](products)
      ).toBigInt();

      modalInterface.waiting('Got gas estimation: ' + gasEstimation);

      modalInterface.waiting(`Getting the gasPrice of the network...`);

      const gasPrice = (await getGasPrice(chainConfig.provider)).valueOf();

      modalInterface.waiting('Got gas price: ' + gasPrice);

      modalInterface.waiting('Sending transaction...');

      tx = await contract['mintAndRegisterBatch'](products);
    } else {
      modalInterface.waiting('Sending transaction...');
      tx = await contract['mintAndRegisterBatch'](products);
    }
    await tx.wait();
    modalInterface.success('Transaction successful');
    return { transactionHash: tx.hash };
  } catch (e: any) {
    if (e.code && e.code.toString() === 'ACTION_REJECTED') {
      context.modalInterface.error('Transaction Rejected');
      throw new Error('Transaction Rejected');
    }
    try {
      const err = contract.interface.parseError(e.data);
      if (err.name === 'OwnableUnauthorizedAccount') {
        context.modalInterface.error('You are not the owner of the shop');
        throw new Unauthorized(
          'record',
          chainConfig.address,
          shopContractAddress
        );
      } else {
        context.modalInterface.error(err.name);
      }
      context.modalInterface.error(e);
      throw e;
    } catch (error) {
      modalInterface.error(`Unexpected error: ${error}`);
      throw error;
    }
  }
}
