/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chain, Network } from '../../dto/chains';
import { ModalInterface } from '../../dto/interfaces/modal-interface.interface';
import { AxiosInstance } from 'axios';
import {
  ChainSwitchException,
  UserDeniedException,
  WalletError,
  WalletNotFoundException,
} from '../../dto/errors/chain-errors';

const chainNames = {
  [Chain.BINANCE]: {
    [Network.TESTNET]: {
      chainName: 'Smart Chain - Testnet',
      chainId: '0x61',
      nativeCurrency: { name: 'TBNB', decimals: 18, symbol: 'tBNB' },
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

// Utility: Check if Coinbase Wallet is installed
export const isCoinBaseInstalled = (): boolean => {
  const { ethereum } = window as any;
  return Boolean(
    ethereum &&
      ethereum.providers?.some((provider: any) => provider.isCoinbaseWallet)
  );
};

// Utility: Get connected accounts
export async function getAccounts(ethereum: any): Promise<string[]> {
  try {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (!accounts || accounts.length === 0) {
      return [];
    }
    return accounts;
  } catch (error: any) {
    throw new WalletError(`Failed to retrieve accounts: ${error}`);
  }
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

// Utility: Check if wallet is connected
export async function isWalletConnected(ethereum: any): Promise<boolean> {
  const accounts = await getAccounts(ethereum);
  return accounts && accounts.length > 0;
}

// Check if the chain is correct
export async function isChainCorrect(
  ethereum: any,
  chain: Chain,
  network: Network
): Promise<boolean> {
  try {
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    return (
      String(chainId).toLowerCase() ===
      (chainNames as any)[chain][network].chainId.toLowerCase()
    );
  } catch (error: any) {
    throw new ChainSwitchException(
      `Failed to verify the correct chain: ${error.message}`
    );
  }
}

// Switch to the correct chain
export async function changeChain(
  ethereum: any,
  chain: Chain,
  network: Network
) {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: (chainNames as any)[chain][network].chainId }],
    });
  } catch (error: any) {
    throw new ChainSwitchException(`Failed to switch chains: ${error.message}`);
  }
}

// Request account access
async function requestAccounts(ethereum: any) {
  try {
    return await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error: any) {
    throw new UserDeniedException(
      `User denied account access: ${error.message}`
    );
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
  nonce: number;
  date: string;
}> {
  const ethereum = provider.provider;

  try {
    modalInterface.waiting('Connecting to wallet...');

    if (!(await isWalletConnected(ethereum))) {
      modalInterface.waiting('Requesting account access...');
      await requestAccounts(ethereum);
    }

    const address = (await getAccounts(ethereum))[0];

    // Switch to the correct chain
    modalInterface.waiting('Switching to the correct chain...');
    await changeChain(ethereum, chain, network);

    // Optionally add the chain
    const chainDetails = (chainNames as any)[chain][network];
    try {
      modalInterface.waiting('Adding chain...');
      await ethereum.request({
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
      console.warn(
        'Chain already added or error occurred while adding chain:',
        err
      );
    }

    // Handle SKALE-specific fuel distribution
    if (chain === Chain.SKALE) {
      const distributionRequest = (
        await axiosInstance.post('shop/sFuelDistribution', {
          wallet: address,
          isTestnet: network === Network.TESTNET,
        })
      ).data;
      console.log(distributionRequest);
    }

    // Sign the message
    modalInterface.waiting('Signing message...');
    // Generate a nonce for added security
    const nonce = Math.floor(Math.random() * 10000000);

    // Get the current date and time for transparency
    const currentDate = new Date().toLocaleString();
    const message = `Welcome to Droplinked!
      
      Please sign this message to verify your identity and securely log in.
      
      - Nonce: ${nonce}
      - Date: ${currentDate}
      
      This action will not incur any gas fees or blockchain transactions.`;

    const signer = provider.getSigner();

    const signature = await signer.signMessage(message);

    return { address, signature, nonce, date: currentDate };
  } catch (err) {
    modalInterface.error(
      err instanceof UserDeniedException
        ? 'User denied the request'
        : 'An error occurred while connecting to the wallet'
    );
    throw err;
  }
}