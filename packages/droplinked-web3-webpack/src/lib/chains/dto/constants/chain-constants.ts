/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { Chain, Network } from '../chains';
import { toEthAddress } from './chain-structs';
import ky from 'ky';

export const ZERO_ADDRESS = toEthAddress(
  '0x0000000000000000000000000000000000000000'
);

export const DROPLINKED_MANAGER = '0x2F86E1B1A69D259b9609b40E3cbEBEa29946f979';

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
    const response = (await await ky.get(url).json()) as any;
    return response.value;
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

async function getShopByteCode(): Promise<string> {
  try {
    const url = `https://apiv3dev.droplinked.com/storage/shopByteCodeType0`;
    const result = String(((await await ky.get(url).json()) as any).value);
    return result;
  } catch (err) {
    console.error(`Failed to get shop bytecode: ${err}`);
    throw new Error(`Unable to get shop bytecode`);
  }
}

async function getGasPrice(
  provider: ethers.providers.Web3Provider
): Promise<bigint> {
  return (await provider.getGasPrice()).toBigInt();
}

export { getShopByteCode, getGasPrice };
