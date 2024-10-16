/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { Chain, Network } from '../../dto/chains';
import {
  ContractType,
  getDeployerAddress,
  getFundsProxy,
  getGasPrice,
  getShopByteCode,
} from '../../dto/constants/chain-constants';
import { deployerABI } from '../../dto/constants/chain-abis';
import { chainLink } from '../../dto/configs/chainlink-addresses';
import { ModalInterface } from '../../dto/interfaces/modal-interface.interface';

export async function EVMDeployShop(
  provider: any,
  chain: Chain,
  network: Network,
  address: string,
  shopName: string,
  shopAddress: string,
  shopOwner: string,
  shopLogo: string,
  shopDescription: string,
  modalInterface: ModalInterface,
  contractType: ContractType
) {
  console.log({
    chain,
    network,
    address,
    shopName,
    shopAddress,
    shopOwner,
    shopLogo,
    shopDescription,
  });
  const signer = provider.getSigner();
  modalInterface.waiting('got the signer: ' + (await signer.getAddress()));
  if (
    (await signer.getAddress()).toLocaleLowerCase() !==
    address.toLocaleLowerCase()
  ) {
    throw new Error('Address does not match signer address');
  }
  const deployerAddress = await getDeployerAddress(chain, network);
  modalInterface.waiting('Getting ready to deploy...');
  const contract = new ethers.Contract(deployerAddress, deployerABI, signer);
  modalInterface.waiting('got deployer contract');
  const byteCode = await getShopByteCode(contractType);
  modalInterface.waiting('got bytecode');
  const sixify = (num: number): string => {
    return num.toString().padStart(6, '0');
  };
  const salt =
    '0x' +
    address.split('0x')[1] +
    '000000000000000000' +
    sixify(Math.floor(Math.random() * 1000000) + 1);
  modalInterface.waiting('created salt');
  let constructorArgs;
  if (chain === Chain.REDBELLY || chain === Chain.SKALE) {
    console.log('Skale or redbelly');
    constructorArgs = [
      shopName ? shopName : '',
      shopAddress,
      shopOwner,
      shopLogo ? shopLogo : '',
      shopDescription ? shopDescription : '',
      deployerAddress,
    ];
  } else
    constructorArgs = [
      shopName ? shopName : '',
      shopAddress,
      shopOwner,
      shopLogo ? shopLogo : '',
      shopDescription ? shopDescription : '',
      deployerAddress,
      (chainLink as any)[chain][network],
      await getFundsProxy(chain, network),
    ];
  modalInterface.waiting('created constructor args');
  let bytecodeWithArgs;
  if (chain === Chain.REDBELLY || chain === Chain.SKALE) {
    bytecodeWithArgs = ethers.utils.defaultAbiCoder.encode(
      ['string', 'string', 'address', 'string', 'string', 'address'],
      constructorArgs
    );
  } else {
    bytecodeWithArgs = ethers.utils.defaultAbiCoder.encode(
      [
        'string',
        'string',
        'address',
        'string',
        'string',
        'address',
        'address',
        'address',
      ],
      constructorArgs
    );
  }
  modalInterface.waiting('Created bytecodeWithArgs');
  try {
    if (chain !== Chain.REDBELLY && chain !== Chain.SKALE) {
      modalInterface.waiting('Deploying');
      await contract.callStatic['deployShop'](
        byteCode + bytecodeWithArgs.split('0x')[1],
        salt
      );
      const gasEstimation = (
        await contract.estimateGas['deployShop'](
          byteCode + bytecodeWithArgs.split('0x')[1],
          salt
        )
      )
        .toBigInt()
        .valueOf();
      modalInterface.waiting('Deploying Shop...');
      const tx = await contract['deployShop'](
        byteCode + bytecodeWithArgs.split('0x')[1],
        salt,
        {
          gasLimit: (gasEstimation * BigInt(105)) / BigInt(100),
          gasPrice: getGasPrice(provider),
        }
      );
      modalInterface.waiting('Waiting for confirmation...');
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
      const shopDeployLog = logs.find(
        (log: any) => log.name === 'ShopDeployed'
      );
      const deployedShopAddress = shopDeployLog.args.shop;
      const deployedNFTAddress = shopDeployLog.args.nftContract;
      modalInterface.success('Shop Deployed');
      return {
        transaction_id: tx.hash,
        deployedShopAddress,
        deployedNFTAddress,
      };
    } else {
      modalInterface.waiting('Deploying Shop...');

      const tx = await contract['deployShop'](
        byteCode + bytecodeWithArgs.split('0x')[1],
        salt
      );
      modalInterface.waiting('Waiting for confirmation...');
      const receipt = await tx.wait();
      const logs = receipt.logs
        .map((log: any) => {
          try {
            return contract.interface.parseLog(log);
          } catch (e: any) {
            console.log(`failed to parse logs: ${e}`);
            return null;
          }
        })
        .filter((log: any) => log !== null) as any;
      const shopDeployLog = logs.find(
        (log: any) => log.name === 'ShopDeployed'
      );
      const deployedShopAddress = shopDeployLog.args.shop;
      const deployedNFTAddress = shopDeployLog.args.nftContract;
      modalInterface.success('Shop Deployed');
      return {
        transaction_id: tx.hash,
        deployedShopAddress,
        deployedNFTAddress,
      };
    }
  } catch (e: any) {
    console.log(e);
    if (e.code.toString() === 'ACTION_REJECTED') {
      modalInterface.error('Transaction Rejected');
      throw new Error('Transaction Rejected');
    }
    const err = contract.interface.parseError(e.data);
    modalInterface.error(err as any);
    throw err;
  }
}
