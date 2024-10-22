/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import {
  NFTType,
  PaymentMethodType,
  RecordResponse,
} from '../../dto/constants/chain-structs';
import { Unauthorized } from '../../dto/errors/chain-errors';
import { ContractType, getGasPrice } from '../../dto/constants/chain-constants';
import { getShopABI } from '../../dto/constants/chain-abis';
import { checkWallet, uploadMetadata } from './evm.helpers';
import { DroplinkedChainConfig } from '../../dto/configs/chain.config';
import {
  IProductDetails,
  ISKUDetails,
} from '../../dto/interfaces/record-web3-product.interface';
import { IWeb3Context } from '../../dto/interfaces/web3-context.interface';

function getRecordData(
  chainConfig: DroplinkedChainConfig,
  product: ISKUDetails & IProductDetails,
  metadataURL: string,
  nftContract: string
) {
  const { contractType } = chainConfig;
  const {
    acceptsManageWallet,
    amount,
    beneficiaries,
    currencyAddress,
    price,
    royalty,
    type,
  } = product;
  const result = {
    _nftAddress: nftContract,
    _uri: metadataURL,
    _amount: amount,
    _accepted: acceptsManageWallet,
    _affiliatePercentage: royalty,
    _price: price,
    _currencyAddress: currencyAddress,
    _royalty: royalty,
    _nftType: NFTType.ERC1155,
    _productType: type,
    _paymentType: PaymentMethodType.USD,
    _beneficiaries: beneficiaries,
  };

  if ([ContractType.TYPE0, ContractType.TYPE2].includes(contractType)) {
    return { ...result, _receiveUSDC: true };
  }
  return result;
}

async function prepareRecordData(
  chainConfig: DroplinkedChainConfig,
  skuData: ISKUDetails,
  productData: IProductDetails,
  context: IWeb3Context
) {
  const { nftContract, modalInterface } = context;

  if (!nftContract) {
    throw new Unauthorized(
      `Missing required fields: nftContract`,
      chainConfig.address,
      chainConfig.address
    );
  }

  const { description } = productData;
  const { skuID } = skuData;
  const recordData = { ...skuData, ...productData };

  console.log(JSON.stringify(recordData));

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
    chainConfig,
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
): Promise<RecordResponse> {
  const { modalInterface, nftContract, shopContractAddress } = context;

  if (!nftContract || !shopContractAddress) {
    throw new Unauthorized(
      `Missing required fields: nftContract or shopContractAddress`,
      chainConfig.address,
      chainConfig.address
    );
  }

  const signer = chainConfig.provider.getSigner();

  modalInterface.waiting('Connecting to wallet...');

  await checkWallet(signer, chainConfig.address);

  modalInterface.waiting('Getting shop contract...');

  const contract = new ethers.Contract(
    shopContractAddress,
    getShopABI(chainConfig.contractType),
    signer
  );

  try {
    const products = skus.map((sku) => {
      return prepareRecordData(chainConfig, sku, product, context);
    });

    let tx;
    if (chainConfig.gasPredictable) {
      modalInterface.waiting('CallStatic...');
      await contract.callStatic['mintAndRegisterBatch'](products);
      modalInterface.waiting('Estimating gas...');
      const gasEstimation = (
        await contract.estimateGas['mintAndRegisterBatch'](products)
      ).toBigInt();
      modalInterface.waiting('Got gas estimation: ' + gasEstimation);
      const gasPrice = (await getGasPrice(chainConfig.provider)).valueOf();
      modalInterface.waiting('Got gas price: ' + gasPrice);
      modalInterface.waiting('Sending transaction...');
      tx = await contract['mintAndRegisterBatch'](products, {
        gasLimit: (gasEstimation * BigInt(105)) / BigInt(100),
        gasPrice: gasPrice,
      });
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
