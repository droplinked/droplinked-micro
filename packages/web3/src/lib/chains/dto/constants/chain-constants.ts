import axios from 'axios';
import { ethers } from 'ethers';
import { Chain, Network } from '../chains';

export enum ContractType {
  TYPE0,
  TYPE1,
  TYPE2,
  TYPE3,
}

async function getAddress(
  chain: Chain,
  network: Network,
  addressType: 'Deployer' | 'Proxy' | 'FundsProxy'
): Promise<string> {
  const toPascalCase = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  try {
    const apiPrefix = network === Network.TESTNET ? 'apiv3dev' : 'apiv3';
    const chainName = toPascalCase(Chain[chain]);
    const networkName = toPascalCase(Network[network]);
    const url = `https://${apiPrefix}.droplinked.com/storage/${chainName}${networkName}ContractAddress${addressType}`;

    const response = await axios.get(url);
    return response.data.value;
  } catch (error) {
    console.error(
      `Failed to fetch ${addressType.toLowerCase()} address:`,
      error
    );
    throw new Error(`Unable to get ${addressType.toLowerCase()} address`);
  }
}

export async function getDeployerAddress(
  chain: Chain,
  network: Network
): Promise<string> {
  return getAddress(chain, network, 'Deployer');
}

export async function getProxyAddress(
  chain: Chain,
  network: Network
): Promise<string> {
  return getAddress(chain, network, 'Proxy');
}

export async function getFundsProxy(
  chain: Chain,
  network: Network
): Promise<string> {
  return getAddress(chain, network, 'FundsProxy');
}

async function getShopByteCode(contractType: ContractType): Promise<string> {
  const shopByteCodesByType = {
    [ContractType.TYPE0]: 'Type0',
    [ContractType.TYPE1]: 'Type1',
    [ContractType.TYPE2]: 'Type2',
    [ContractType.TYPE3]: 'Type3',
  };
  const url = `https://apiv3dev.droplinked.com/storage/shopByteCode${shopByteCodesByType[contractType]}`;
  const result = String((await axios.get(url)).data.value);
  return result;
}

async function getGasPrice(
  provider: ethers.providers.Web3Provider
): Promise<bigint> {
  return (await provider.getGasPrice()).toBigInt();
}

export { getShopByteCode, getGasPrice };

export default getDeployerAddress;
