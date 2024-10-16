/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import {
  Beneficiary,
  EthAddress,
  NFTType,
  PaymentMethodType,
  ProductType,
  RecordResponse,
} from '../../dto/constants/chain-structs';
import { Unauthorized } from '../../dto/errors/chain-errors';
import { ContractType, getGasPrice } from '../../dto/constants/chain-constants';
import { ModalInterface } from '../../dto/interfaces/modal-interface.interface';
import { RecordProduct } from '../../dto/record.dto';
import { AxiosInstance } from 'axios';
import { getShopABI } from '../../dto/constants/chain-abis';
import { uploadMetadata } from './evm.helpers';
import { DroplinkedChainConfig } from '../../dto/configs/chain.config';
import {
  IProductDetails,
  ISKUDetails,
} from '../../dto/interfaces/record-web3-product.interface';
import { IWeb3Context } from '../../dto/interfaces/web3-context.interface';

function getRecordData(
  chainConfig: DroplinkedChainConfig,
  product: ISKUDetails & IProductDetails,
  metadataURL: string
) {
  const { contractType } = chainConfig;
  const {
    acceptsManageWallet,
    amount,
    beneficiaries,
    currencyAddress,
    nftContract,
    price,
    royalty,
    type,
  } = product;
  type Product = {
    _nftAddress: string;
    _uri: string;
    _amount: number;
    _accepted: boolean;
    _affiliatePercentage: number;
    _price: number;
    _currencyAddress: string;
    _royalty: number;
    _nftType: NFTType;
    _productType: ProductType;
    _paymentType: PaymentMethodType;
    _beneficiaries: Beneficiary[];
  };
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

export async function recordProduct(
  chainConfig: DroplinkedChainConfig,
  skuData: ISKUDetails,
  productData: IProductDetails,
  context: IWeb3Context
): Promise<RecordResponse> {
  const { description, shopAddress } = productData;
  const { skuID } = skuData;
  const recordData = { ...skuData, ...productData };
  console.log(JSON.stringify(recordData));
  const signer = chainConfig.provider.getSigner();
  if (
    (await signer.getAddress()).toLocaleLowerCase() !==
    chainConfig.address.toLocaleLowerCase()
  ) {
    throw new Error('Address does not match signer address');
  }

  const contract = new ethers.Contract(
    shopAddress,
    getShopABI(chainConfig.contractType),
    signer
  );

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
  const product = getRecordData(chainConfig, recordData, metadataURL);

  try {
    await contract.callStatic['mintAndRegister'](product);
    const gasEstimation = (
      await contract.estimateGas['mintAndRegister'](product)
    ).toBigInt();

    const gasPrice = (await getGasPrice(chainConfig.provider)).valueOf();
    const tx = await contract['mintAndRegister'](product, {
      gasLimit: (gasEstimation * BigInt(105)) / BigInt(100),
      gasPrice: gasPrice,
    });
    await tx.wait();
    return { transactionHash: tx.hash };
  } catch (e: any) {
    console.error(e);
    if (e.code.toString() === 'ACTION_REJECTED') {
      context.modalInterface.error('Transaction Rejected');
      throw new Error('Transaction Rejected');
    }
    const err = contract.interface.parseError(e.data);
    if (err.name === 'OwnableUnauthorizedAccount') {
      context.modalInterface.error('You are not the owner of the shop');
      throw new Unauthorized('record', chainConfig.address, shopAddress);
    }
    context.modalInterface.error(e);
    throw e;
  }
}

export async function recordBatch(
  chainConfig: DroplinkedChainConfig,
  context: IWeb3Context,
  products: RecordProduct[]
): Promise<RecordResponse> {
  return { transactionHash: '' };
}
