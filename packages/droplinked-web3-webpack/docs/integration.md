# Integration Guide

## Getting Started

### Installation

```bash
# Using npm
npm install @droplinked/web3-webpack

# Using yarn
yarn add @droplinked/web3-webpack
```

### Basic Setup

```typescript
import { DropWeb3, Network, Chain, Web3Actions } from '@droplinked/web3-webpack';

// Initialize the Web3 instance
const web3 = new DropWeb3(Network.TESTNET);

// Create a chain provider
const provider = web3.web3Instance({
  chain: Chain.ETH,
  method: Web3Actions.LOGIN
});
```

## Configuration

### Network Configuration

```typescript
// Available networks
enum Network {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  DEV = 'dev'
}

// Network-specific settings
const networkConfig = {
  mainnet: {
    apiUrl: 'https://apiv3.droplinked.com',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID'
  },
  testnet: {
    apiUrl: 'https://apiv3dev.droplinked.com',
    rpcUrl: 'https://goerli.infura.io/v3/YOUR-PROJECT-ID'
  }
};
```

### Chain Configuration

```typescript
// Supported chains
enum Chain {
  ETH = 'ethereum',
  BSC = 'binance',
  POLYGON = 'polygon',
  SOLANA = 'solana',
  // ... other chains
}

// Chain-specific settings
const chainConfig = {
  ethereum: {
    chainId: '0x1', // mainnet
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    decimals: 18
  },
  // ... other chain configurations
};
```

## Usage Examples

### 1. Wallet Connection

```typescript
// Connect wallet
async function connectWallet() {
  try {
    const provider = web3.web3Instance({
      chain: Chain.ETH,
      method: Web3Actions.LOGIN,
      preferredWallet: ChainWallet.Metamask
    });

    const walletInfo = await provider.connect();
    console.log('Connected wallet:', walletInfo.address);
    
    return walletInfo;
  } catch (error) {
    console.error('Wallet connection failed:', error);
    throw error;
  }
}
```

### 2. NFT Operations

```typescript
// Mint NFT
async function mintNFT(metadata: NFTMetadata) {
  const provider = web3.web3Instance({
    chain: Chain.ETH,
    method: Web3Actions.RECORD_AFFILIATE,
    nftContractAddress: 'YOUR_NFT_CONTRACT_ADDRESS'
  });

  const mintTx = await provider.mintNFT({
    tokenURI: metadata.tokenURI,
    recipient: metadata.recipient
  });

  return mintTx;
}

// Transfer NFT
async function transferNFT(tokenId: string, to: string) {
  const provider = web3.web3Instance({
    chain: Chain.ETH,
    method: Web3Actions.RECORD_AFFILIATE,
    nftContractAddress: 'YOUR_NFT_CONTRACT_ADDRESS'
  });

  const transferTx = await provider.transferNFT(tokenId, to);
  return transferTx;
}
```

### 3. Shop Operations

```typescript
// Deploy shop
async function deployShop(shopConfig: ShopConfig) {
  const provider = web3.web3Instance({
    chain: Chain.ETH,
    method: Web3Actions.DEPLOY
  });

  const deployTx = await provider.deployShop({
    name: shopConfig.name,
    symbol: shopConfig.symbol,
    baseURI: shopConfig.baseURI
  });

  return deployTx;
}

// Record affiliate
async function recordAffiliate(params: RecordParams) {
  const provider = web3.web3Instance({
    chain: Chain.ETH,
    method: Web3Actions.RECORD_AFFILIATE,
    shopContractAddress: params.shopAddress
  });

  const recordTx = await provider.recordAffiliate(params);
  return recordTx;
}
```

### 4. Token Operations

```typescript
// Airdrop tokens
async function airdropTokens(params: AirdropParams) {
  const provider = web3.web3Instance({
    chain: Chain.ETH,
    method: Web3Actions.AIRDROP
  });

  const airdropTx = await provider.airdropTokens(params);
  return airdropTx;
}
```

## Best Practices

### 1. Error Handling

```typescript
// Implement proper error handling
async function safeOperation() {
  try {
    const provider = web3.web3Instance({
      chain: Chain.ETH,
      method: Web3Actions.LOGIN
    });

    await provider.connect();
  } catch (error) {
    if (error instanceof WalletNotFoundException) {
      // Handle wallet not found
      showWalletInstallPrompt();
    } else if (error instanceof ChainNotImplementedException) {
      // Handle unsupported chain
      showUnsupportedChainMessage();
    } else {
      // Handle other errors
      handleGenericError(error);
    }
  }
}
```

### 2. Event Handling

```typescript
// Subscribe to events
function setupEventListeners(provider: IChainProvider) {
  provider.on('connect', (address: string) => {
    console.log('Wallet connected:', address);
    updateUIState({ connected: true, address });
  });

  provider.on('disconnect', () => {
    console.log('Wallet disconnected');
    updateUIState({ connected: false, address: null });
  });

  provider.on('chainChanged', (chainId: string) => {
    console.log('Chain changed:', chainId);
    handleChainChange(chainId);
  });
}
```

### 3. Transaction Management

```typescript
// Handle transactions with proper feedback
async function handleTransaction(txPromise: Promise<string>) {
  try {
    showLoadingState();
    const txHash = await txPromise;
    
    showPendingState(txHash);
    const receipt = await provider.waitForTransaction(txHash);
    
    if (receipt.status === 1) {
      showSuccessState();
      return receipt;
    } else {
      throw new Error('Transaction failed');
    }
  } catch (error) {
    showErrorState(error);
    throw error;
  } finally {
    hideLoadingState();
  }
}
```

## Security Considerations

### 1. Private Key Management

```typescript
// NEVER store private keys in code or localStorage
// Use secure wallet connections instead
const INCORRECT_WAY = {
  privateKey: 'never-store-private-keys'
};

// Correct way: Use wallet connection
const provider = web3.web3Instance({
  chain: Chain.ETH,
  method: Web3Actions.LOGIN
});
```

### 2. Transaction Signing

```typescript
// Always verify transaction parameters before signing
async function safeTransactionSigning(tx: Transaction) {
  // Verify recipient
  if (!isValidAddress(tx.to)) {
    throw new Error('Invalid recipient address');
  }

  // Verify amount
  if (!isValidAmount(tx.value)) {
    throw new Error('Invalid transaction amount');
  }

  // Proceed with signing
  return await provider.signTransaction(tx);
}
```

### 3. Network Security

```typescript
// Verify network connection
async function verifyNetwork() {
  const currentNetwork = await provider.getNetwork();
  
  if (currentNetwork.chainId !== expectedChainId) {
    throw new Error('Wrong network connected');
  }
  
  return currentNetwork;
}
```

## Performance Tips

### 1. Provider Caching

```typescript
// Cache provider instances
const providerCache = new Map<string, IChainProvider>();

function getCachedProvider(chain: Chain, network: Network): IChainProvider {
  const key = `${chain}-${network}`;
  
  if (!providerCache.has(key)) {
    const provider = web3.web3Instance({
      chain,
      method: Web3Actions.LOGIN
    });
    providerCache.set(key, provider);
  }
  
  return providerCache.get(key)!;
}
```

### 2. Batch Operations

```typescript
// Batch multiple operations
async function batchOperations(operations: Operation[]) {
  const provider = web3.web3Instance({
    chain: Chain.ETH,
    method: Web3Actions.RECORD_AFFILIATE
  });

  const batch = operations.map(op => ({
    target: op.contract,
    data: op.encodedData
  }));

  return await provider.multicall(batch);
}
```

## Troubleshooting

### Common Issues and Solutions

1. **Wallet Connection Issues**
```typescript
async function troubleshootWallet() {
  const ethereum = (window as any).ethereum;
  
  if (!ethereum) {
    return 'Please install MetaMask';
  }
  
  if (!ethereum.isConnected()) {
    return 'Wallet is not connected';
  }
  
  const chainId = await ethereum.request({ method: 'eth_chainId' });
  if (chainId !== expectedChainId) {
    return 'Wrong network connected';
  }
}
```

2. **Transaction Failures**
```typescript
async function handleTransactionError(error: any) {
  if (error.code === 4001) {
    return 'Transaction rejected by user';
  }
  
  if (error.code === -32603) {
    return 'Internal JSON-RPC error';
  }
  
  return 'Unknown error occurred';
}
``` 