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
  try {
    const url = `https://apiv3dev.droplinked.com/storage/shopByteCode${shopByteCodesByType[contractType]}`;
    const result = String((await axios.get(url)).data.value);
    return result;
  } catch (err) {
    console.error(`Failed to get shop bytecode: ${err}`);
    throw new Error(`Unable to get shop bytecode`);
  }
}

// TODO: needs to be refactored: return base on contract type
async function getPaymentProxyABI(chain: Chain) {
  if (chain === Chain.SKALE) {
    const proxyABISkale = [
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'OwnableInvalidOwner',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'OwnableUnauthorizedAccount',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'priceTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'currentTimestamp',
            type: 'uint256',
          },
        ],
        name: 'oldPrice',
        type: 'error',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'memo',
            type: 'string',
          },
        ],
        name: 'ProductPurchased',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'uint256[]',
            name: 'tbdValues',
            type: 'uint256[]',
          },
          {
            internalType: 'address[]',
            name: 'tbdReceivers',
            type: 'address[]',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'isAffiliate',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'shopAddress',
                type: 'address',
              },
            ],
            internalType: 'struct PurchaseData[]',
            name: 'cartItems',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'memo',
            type: 'string',
          },
        ],
        name: 'droplinkedPurchase',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];
    return proxyABISkale;
  } else {
    const proxyABI = [
      {
        inputs: [],
        name: 'InvalidInitialization',
        type: 'error',
      },
      {
        inputs: [],
        name: 'NotInitializing',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'OwnableInvalidOwner',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'OwnableUnauthorizedAccount',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'priceTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'currentTimestamp',
            type: 'uint256',
          },
        ],
        name: 'oldPrice',
        type: 'error',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newHeartBeat',
            type: 'uint256',
          },
        ],
        name: 'HeartBeatChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint64',
            name: 'version',
            type: 'uint64',
          },
        ],
        name: 'Initialized',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'memo',
            type: 'string',
          },
        ],
        name: 'ProductPurchased',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_heartBeat',
            type: 'uint256',
          },
        ],
        name: 'changeHeartBeat',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256[]',
            name: 'tbdValues',
            type: 'uint256[]',
          },
          {
            internalType: 'address[]',
            name: 'tbdReceivers',
            type: 'address[]',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'isAffiliate',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'shopAddress',
                type: 'address',
              },
            ],
            internalType: 'struct PurchaseData[]',
            name: 'cartItems',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint80',
            name: 'roundId',
            type: 'uint80',
          },
          {
            internalType: 'string',
            name: 'memo',
            type: 'string',
          },
        ],
        name: 'droplinkedPurchase',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'heartBeat',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_heartBeat',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_chainLinkProvider',
            type: 'address',
          },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];
    return proxyABI;
  }
}

async function getGasPrice(
  provider: ethers.providers.Web3Provider
): Promise<bigint> {
  return (await provider.getGasPrice()).toBigInt();
}

export { getShopByteCode, getGasPrice, getPaymentProxyABI };

export default getDeployerAddress;
