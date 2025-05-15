# API Reference

## Classes

### DropWeb3

The main class for interacting with blockchain networks and wallets.

```typescript
class DropWeb3 {
  constructor(workingNetwork: Network);
  
  web3Instance(config: Web3ChainConfig): IChainProvider;
  getWalletInfo(): Promise<WalletInfo>;
}
```

#### Parameters

- `workingNetwork`: The network to connect to (MAINNET, TESTNET, or DEV)

#### Methods

##### `web3Instance(config: Web3ChainConfig): IChainProvider`

Creates a chain provider instance based on the provided configuration.

**Parameters:**
```typescript
interface Web3ChainConfig {
  chain: Chain;
  method: Web3Actions;
  modalInterface?: IModalInterface;
  preferredWallet?: ChainWallet | ChainWallet[];
  userAddress?: string;
  nftContractAddress?: string;
  shopContractAddress?: string;
}
```

**Returns:** An instance of `IChainProvider`

##### `getWalletInfo(): Promise<WalletInfo>`

Gets wallet information and handles user authentication.

**Returns:**
```typescript
interface WalletInfo {
  address: string;
  signature: string;
  nonce: number;
  timestamp: string;
}
```

### Chain Providers

#### EVMProvider

Provider for EVM-compatible chains.

```typescript
class EVMProvider implements IChainProvider {
  constructor(chain: Chain, network: Network, switchable: boolean);
  
  connect(): Promise<ConnectionInfo>;
  disconnect(): Promise<void>;
  signMessage(message: string): Promise<string>;
  signTransaction(tx: Transaction): Promise<string>;
  // ... other methods
}
```

#### SolanaProvider

Provider for Solana blockchain.

```typescript
class SolanaProvider implements IChainProvider {
  constructor(network: Network);
  
  connect(): Promise<ConnectionInfo>;
  disconnect(): Promise<void>;
  signMessage(message: string): Promise<string>;
  signTransaction(tx: Transaction): Promise<string>;
  // ... other methods
}
```

## Interfaces

### IChainProvider

The base interface for all chain providers.

```typescript
interface IChainProvider {
  connect(): Promise<ConnectionInfo>;
  disconnect(): Promise<void>;
  signMessage(message: string): Promise<string>;
  signTransaction(tx: Transaction): Promise<string>;
  setAddress(address: string): this;
  setModal(modal: IModalInterface): this;
  setWallet(wallet: ChainWallet): this;
  setAxiosInstance(instance: KyInstance): this;
  setNFTContractAddress(address: string): this;
  setShopContractAddress(address: string): this;
  setWalletModal(modal: any): this;
}
```

### IModalInterface

Interface for modal interactions.

```typescript
interface IModalInterface {
  showLoading(message?: string): void;
  hideLoading(): void;
  showError(message: string): void;
  showSuccess(message: string): void;
  showWarning(message: string): void;
  showInfo(message: string): void;
}
```

### Web3 Actions

```typescript
enum Web3Actions {
  LOGIN = 'login',
  DEPLOY = 'deploy',
  RECORD_AFFILIATE = 'record_affiliate',
  PAYMENT = 'payment',
  CLAIM = 'claim',
  AIRDROP = 'airdrop'
}
```

### Chain Types

```typescript
enum Chain {
  ETH = 'ethereum',
  BSC = 'binance',
  POLYGON = 'polygon',
  BASE = 'base',
  SKALE = 'skale',
  LINEA = 'linea',
  SOLANA = 'solana',
  UNSTOPPABLE = 'unstoppable',
  REDBELLY = 'redbelly',
  BITLAYER = 'bitlayer',
  // Planned chains
  NEAR = 'near',
  CASPER = 'casper',
  XRPLSIDECHAIN = 'xrplsidechain',
  STACKS = 'stacks'
}
```

### Network Types

```typescript
enum Network {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  DEV = 'dev'
}
```

### Wallet Types

```typescript
enum ChainWallet {
  Metamask = 'metamask',
  Phantom = 'phantom',
  UnstoppableDomains = 'unstoppable'
}
```

## Methods

### NFT Operations

```typescript
interface NFTOperations {
  mintNFT(params: MintParams): Promise<string>;
  transferNFT(tokenId: string, to: string): Promise<string>;
  approveNFT(operator: string, tokenId: string): Promise<string>;
  getTokenURI(tokenId: string): Promise<string>;
}

interface MintParams {
  tokenURI: string;
  recipient: string;
  metadata?: Record<string, any>;
}
```

### Shop Operations

```typescript
interface ShopOperations {
  deployShop(params: DeployParams): Promise<string>;
  recordAffiliate(params: RecordParams): Promise<string>;
  claimRewards(params: ClaimParams): Promise<string>;
  getShopInfo(shopId: string): Promise<ShopInfo>;
}

interface DeployParams {
  name: string;
  symbol: string;
  baseURI: string;
  options?: Record<string, any>;
}

interface RecordParams {
  shopId: string;
  affiliateAddress: string;
  productId: string;
  amount: string;
}

interface ClaimParams {
  shopId: string;
  rewardId: string;
}
```

### Token Operations

```typescript
interface TokenOperations {
  airdropTokens(params: AirdropParams): Promise<string>;
  transferTokens(params: TransferParams): Promise<string>;
  approveTokens(params: ApproveParams): Promise<string>;
  getAllowance(owner: string, spender: string): Promise<string>;
}

interface AirdropParams {
  recipients: string[];
  amounts: string[];
  tokenAddress: string;
}

interface TransferParams {
  to: string;
  amount: string;
  tokenAddress: string;
}

interface ApproveParams {
  spender: string;
  amount: string;
  tokenAddress: string;
}
```

## Events

### Provider Events

```typescript
interface ProviderEvents {
  'connect': (address: string) => void;
  'disconnect': () => void;
  'chainChanged': (chainId: string) => void;
  'accountsChanged': (accounts: string[]) => void;
}
```

### Transaction Events

```typescript
interface TransactionEvents {
  'transactionHash': (hash: string) => void;
  'receipt': (receipt: TransactionReceipt) => void;
  'confirmation': (confirmationNumber: number, receipt: TransactionReceipt) => void;
  'error': (error: Error) => void;
}
```

## Error Types

```typescript
class WalletNotFoundException extends Error {}
class MetaMaskNotFoundException extends Error {}
class AccountAccessDeniedException extends Error {}
class NoAccountsFoundException extends Error {}
class SignatureRequestDeniedException extends Error {}
class ChainNotImplementedException extends Error {}
class WalletError extends Error {}
class ModalNotFoundException extends Error {}
```

## Constants

```typescript
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const DEFAULT_GAS_LIMIT = '300000';
const DEFAULT_GAS_PRICE = '20000000000';

const CHAIN_IDS = {
  ETH_MAINNET: '0x1',
  ETH_GOERLI: '0x5',
  BSC_MAINNET: '0x38',
  BSC_TESTNET: '0x61',
  POLYGON_MAINNET: '0x89',
  POLYGON_MUMBAI: '0x13881'
  // ... other chain IDs
};
``` 