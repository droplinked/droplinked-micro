/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import {
  getDeployerAddress,
  getShopByteCode,
} from '../../dto/constants/chain-constants';
import { deployerABI } from '../../dto/constants/chain-abis';
import { DroplinkedChainConfig } from '../../dto/configs/chain.config';
import { IWeb3Context } from '../../dto/interfaces/web3-context.interface';
import { IDeployShop } from '../../dto/interfaces/deploy-shop.interface';
import {
  DeployShopResponse,
  EthAddress,
  toEthAddress,
  UserDeniedException,
} from '../../../web3';
import { checkWallet } from './evm.helpers';

const sixify = (num: number): string => {
  return num.toString().padStart(6, '0');
};

async function getConstructorArgs(
  shopDetails: IDeployShop,
  deployerAddress: EthAddress,
  address: string
) {
  const commonArgs = [
    shopDetails.shopName || '',
    shopDetails.shopAddress || '',
    address,
    shopDetails.shopLogo || '',
    shopDetails.shopDescription || '',
    deployerAddress,
  ];
  return commonArgs;
}

export async function deployEVMShop(
  chainConfig: DroplinkedChainConfig,
  web3Context: IWeb3Context,
  shopDetails: IDeployShop
): Promise<DeployShopResponse> {
  console.log({
    ...chainConfig,
    ...web3Context,
    ...shopDetails,
  });

  const { modalInterface } = web3Context;
  const { address, chain, network, provider } = chainConfig;
  const signer = provider.getSigner();

  modalInterface.waiting('got the signer: ' + (await signer.getAddress()));

  await checkWallet(signer, address);

  const deployerAddress = toEthAddress(
    await getDeployerAddress(chain, network)
  );

  modalInterface.waiting('Got deployer contract address');

  const contract = new ethers.Contract(deployerAddress, deployerABI, signer);

  modalInterface.waiting('Getting shop bytecode');

  const byteCode = await getShopByteCode();

  modalInterface.waiting('got bytecode');

  const salt =
    '0x' +
    address.split('0x')[1] +
    '000000000000000000' +
    sixify(Math.floor(Math.random() * 1000000) + 1);

  modalInterface.waiting('created salt');
  console.log(salt);

  const constructorArgs = await getConstructorArgs(
    shopDetails,
    deployerAddress,
    address
  );

  modalInterface.waiting('created constructor args');
  console.log(constructorArgs);

  const bytecodeWithArgs = ethers.utils.defaultAbiCoder.encode(
    [
      'string',
      'string',
      'address',
      'string',
      'string',
      'address',
    ],
    constructorArgs
  );

  modalInterface.waiting('Created bytecodeWithArgs');
  console.log(bytecodeWithArgs);

  try {
    let tx: any;
    const fullBytecode = byteCode + bytecodeWithArgs.split('0x')[1];
    console.log({ fullBytecode });
    if (chainConfig.gasPredictable) {
      modalInterface.waiting('CallStatic to estimate gas');
      await contract.callStatic['deployShop'](fullBytecode, salt);
      modalInterface.waiting('Sending transaction');
      tx = await contract['deployShop'](fullBytecode, salt, {});
    } else {
      modalInterface.waiting('Sending transaction');
      tx = await contract['deployShop'](fullBytecode, salt);
    }
    modalInterface.waiting('Waiting for confirmation...');
    const receipt = await tx.wait();
    modalInterface.waiting('Transaction confirmed, extracting data...');
    const logs = receipt.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .filter((log: any) => log != null);
    const shopDeployLog = logs.find((log: any) => log.name === 'ShopDeployed');
    const deployedShopAddress = shopDeployLog.args.shop;
    const deployedNFTAddress = shopDeployLog.args.nftContract;
    modalInterface.success('Deployment successful!');
    return {
      transactionHash: tx.hash,
      deployedShopAddress,
      deployedNFTAddress,
    };
  } catch (e: any) {
    modalInterface.error('Error during deployment.');
    if (e.code.toString() === 'ACTION_REJECTED') {
      modalInterface.error('Transaction Rejected');
      throw new UserDeniedException();
    }
    try {
      const err = contract.interface.parseError(e.data);
      modalInterface.error(`Contract error: ${err}`);
      throw err;
    } catch (parseError: any) {
      modalInterface.error('Unhandled error during deployment.');
      throw new Error(parseError || 'Unknown error occurred.');
    }
  }
}
