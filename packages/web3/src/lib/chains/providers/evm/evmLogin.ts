/* eslint-disable @typescript-eslint/no-explicit-any */
import { Buffer } from 'buffer';
import { Chain, Network } from '../../dto/chains';
import { ModalInterface } from '../../dto/interfaces/modal-interface.interface';
import { AxiosInstance } from 'axios';
import { WalletNotFoundException } from '../../dto/errors/chain-errors';

const chainNames = {
  [Chain.BINANCE]: {
    [Network.TESTNET]: {
      chainName: 'Smart Chain - Testnet',
      chainId: '0x61',
      nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    },
    [Network.MAINNET]: {
      chainName: 'Smart Chain',
      chainId: '0x38',
      nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
    },
  },
  [Chain.POLYGON]: {
    [Network.TESTNET]: {
      chainName: 'Polygon Amoy Testnet',
      chainId: '0x13882',
      nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
      rpcUrls: ['https://rpc-amoy.polygon.technology'],
    },
    [Network.MAINNET]: {
      chainName: 'Polygon Mainnet',
      chainId: '0x89',
      nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
      rpcUrls: ['https://polygon-rpc.com/'],
    },
  },
  [Chain.XRPLSIDECHAIN]: {
    [Network.TESTNET]: {
      chainName: 'XRPL EVM Sidechain',
      chainId: '0x15f902',
      nativeCurrency: { name: 'XRP', decimals: 18, symbol: 'XRP' },
      rpcUrls: ['https://rpc-evm-sidechain.xrpl.org'],
    },
    [Network.MAINNET]: {
      chainName: 'XRPL EVM Sidechain',
      chainId: '0x15f902',
      nativeCurrency: { name: 'XRP', decimals: 18, symbol: 'XRP' },
      rpcUrls: ['https://rpc-evm-sidechain.xrpl.org'],
    },
  },
  [Chain.CASPER]: {
    [Network.TESTNET]: {
      chainName: 'Smart Chain - Testnet',
      chainId: '0x38',
      nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    },
    [Network.MAINNET]: {
      chainName: 'Smart Chain',
      chainId: '0x61',
      nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    },
  },
  [Chain.STACKS]: {
    [Network.TESTNET]: {
      chainName: 'Smart Chain - Testnet',
      chainId: '0x38',
      nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    },
    [Network.MAINNET]: {
      chainName: 'Smart Chain',
      chainId: '0x61',
      nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    },
  },
  [Chain.NEAR]: {
    [Network.TESTNET]: {
      chainName: 'Aurora Testnet',
      chainId: '0x4e454153',
      nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
      rpcUrls: ['https://testnet.aurora.dev'],
    },
    [Network.MAINNET]: {
      chainName: 'Aurora Mainnet',
      chainId: '0x4e454152',
      nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
      rpcUrls: ['https://mainnet.aurora.dev'],
    },
  },
  [Chain.SKALE]: {
    [Network.TESTNET]: {
      chainName: 'SKALE Testnet Calypso Hub',
      chainId: '0x3A14269B',
      nativeCurrency: { name: 'sFUEL', decimals: 18, symbol: 'sFUEL' },
      rpcUrls: ['https://testnet.skalenodes.com/v1/giant-half-dual-testnet'],
    },
    [Network.MAINNET]: {
      chainName: 'SKALE Testnet Calypso Hub',
      chainId: '0x3A14269B',
      nativeCurrency: { name: 'sFUEL', decimals: 18, symbol: 'sFUEL' },
      rpcUrls: ['https://testnet.skalenodes.com/v1/giant-half-dual-testnet'],
    },
  },
  [Chain.BASE]: {
    [Network.TESTNET]: {
      chainName: 'Base Sepolia',
      chainId: '0x14a34',
      nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
      rpcUrls: ['https://sepolia.base.org'],
    },
    [Network.MAINNET]: {
      chainName: 'Base Mainnet',
      chainId: '0x2105',
      nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
      rpcUrls: ['https://mainnet.base.org/'],
    },
  },
  [Chain.LINEA]: {
    [Network.MAINNET]: {
      chainName: 'Linea',
      chainId: '0xe708',
      nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'LineaETH' },
      rpcUrls: ['https://rpc.linea.build'],
    },
    [Network.TESTNET]: {
      chainName: 'Linea',
      chainId: '0xe704',
      nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'LineaETH' },
      rpcUrls: ['https://rpc.sepolia.linea.build'],
    },
  },
  [Chain.ETH]: {
    [Network.MAINNET]: {
      chainName: 'Ethereum',
      chainId: '0x1',
      nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
      rpcUrls: ['https://mainnet.infura.io/v3/'],
    },
    [Network.TESTNET]: {
      chainName: 'Sepolia',
      chainId: '0xaa36a7',
      nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
      rpcUrls: ['https://eth-sepolia.public.blastapi.io/'],
    },
  },
  [Chain.REDBELLY]: {
    [Network.TESTNET]: {
      chainName: 'Redbelly Network Testnet',
      chainId: '0x99',
      nativeCurrency: { name: 'RBNT', decimals: 18, symbol: 'RBNT' },
      rpcUrls: ['https://governors.testnet.redbelly.network'],
    },
    [Network.MAINNET]: null,
  },
};

export const isMetamaskInstalled = (): boolean => {
  const { ethereum } = window as any;
  return Boolean(ethereum && ethereum.isMetaMask);
};
export const isCoinBaseInstalled = (): boolean => {
  const { ethereum } = window as any;
  return Boolean(
    ethereum &&
      ethereum.providers.find((x: any) => {
        return x.isCoinbaseWallet;
      }) !== -1
  );
};

export async function getAccounts(ethereum: any) {
  return await ethereum.request({ method: 'eth_accounts' });
}

export function isWalletInstalled(chain: string) {
  if (
    [
      'POLYGON',
      'XRPLSIDECHAIN',
      'NEAR',
      'BINANCE',
      'BASE',
      'LINEA',
      'ETH',
      'REDBELLY',
      'SKALE',
    ].includes(chain)
  ) {
    return {
      installed: isMetamaskInstalled(),
      walletName: 'MetaMask wallet',
    };
  } else if (chain === 'SOLANA') {
    return {
      installed: (window as any).phantom?.solana?.isPhantom,
      walletName: 'Phantom wallet',
    };
  } else if (chain === 'CASPER') {
    throw new WalletNotFoundException('Casper is not supported yet');
  }
  throw new WalletNotFoundException('Wallet not found');
}

export async function isWalletConnected(ethereum: any) {
  const accounts = await getAccounts(ethereum);
  return accounts && accounts[0] > 0;
}

export async function isChainCorrect(
  ethereum: any,
  chain: Chain,
  network: Network
) {
  const chainId = await ethereum.request({ method: 'eth_chainId' });
  return (
    String(chainId).toLowerCase() ===
    (chainNames as any)[chain][network].chainId.toLowerCase()
  );
}

export async function changeChain(
  ethereum: any,
  chain: Chain,
  network: Network
) {
  await ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: (chainNames as any)[chain][network].chainId }],
  });
}

async function requestAccounts(ethereum: any) {
  try {
    return await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
  }
}

export async function getBalance(
  provider: any,
  address: string
): Promise<number> {
  return Number(
    await provider.provider.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    })
  );
}

export async function evmLogin(
  provider: any,
  chain: Chain,
  network: Network,
  modalInterface: ModalInterface,
  axiosInstance: AxiosInstance
): Promise<{
  address: string;
  signature: string;
}> {
  const ethereum = provider.provider;

  modalInterface.waiting('Connecting to wallet...');
  if (!(await isWalletConnected(ethereum))) {
    modalInterface.waiting('Connecting to wallet');
    await requestAccounts(ethereum);
  }

  const address = (await getAccounts(ethereum))[0];
  try {
    const chainDetails = (chainNames as any)[chain][network];
    modalInterface.waiting('Adding chain...');
    await (window as any).ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainName: chainDetails.chainName,
          chainId: chainDetails.chainId,
          nativeCurrency: chainDetails.nativeCurrency,
          rpcUrls: chainDetails.rpcUrls,
        },
      ],
    });
  } catch (err) {
    modalInterface.error(err as any);
    console.log(err);
  }
  await changeChain(ethereum, chain, network);
  modalInterface.waiting('Signing message...');
  try {
    const msg = `0x${Buffer.from(
      `Please sign this message to let droplinked view your PublicKey & Address and validate your identity`,
      'utf8'
    ).toString('hex')}`;
    if (chain === Chain.SKALE) {
      const distributionRequest = (
        await axiosInstance.post(`shop/sFuelDistribution`, {
          wallet: address,
          isTestnet: network === Network.TESTNET,
        })
      ).data;
      console.log(distributionRequest);
    }

    const signature = await ethereum.request({
      method: 'personal_sign',
      params: [msg, address],
    });
    return {
      address: address,
      signature: signature,
    };
  } catch (err) {
    modalInterface.error(
      ((err as any).code as number) === 4001
        ? 'User rejected the signing'
        : (err as string)
    );
    throw new Error(
      ((err as any).code as number) === 4001
        ? 'User rejected the signing'
        : (err as string)
    );
  }
}
