# Features

## Supported Chains

### EVM Compatible Chains
1. **Ethereum (ETH)**
   - Mainnet
   - Testnet (Goerli/Sepolia)
   - Development network

2. **Binance Smart Chain (BSC)**
   - Mainnet
   - Testnet
   - Development network

3. **Polygon**
   - Mainnet
   - Testnet (Mumbai)
   - Development network

4. **Base**
   - Mainnet
   - Testnet
   - Development network

5. **SKALE**
   - Mainnet
   - Testnet
   - Development network

6. **Linea**
   - Mainnet
   - Testnet
   - Development network

7. **Redbelly**
   - Mainnet
   - Testnet
   - Development network

8. **BitLayer**
   - Mainnet
   - Testnet
   - Development network

### Non-EVM Chains
1. **Solana**
   - Mainnet
   - Testnet (Devnet)
   - Development network

2. **Unstoppable Domains**
   - Mainnet
   - Testnet
   - Development network

### Planned Chains (In Development)
- NEAR Protocol
- Casper
- XRP Ledger Sidechain
- Stacks

## Wallet Integration

### Supported Wallets
1. **MetaMask**
   - Account connection
   - Transaction signing
   - Message signing
   - Network switching

2. **Phantom**
   - Solana account management
   - Transaction signing
   - Program interaction

3. **Unstoppable Domains**
   - Domain resolution
   - Authentication
   - Profile integration

### Features
- Multi-wallet support
- Automatic wallet detection
- Secure authentication flow
- Custom wallet modal interface
- Wallet preference management

## Smart Contract Interaction

### NFT Operations
```typescript
interface NFTOperations {
  mint(params: MintParams): Promise<string>
  transfer(to: string, tokenId: string): Promise<string>
  approve(operator: string, tokenId: string): Promise<string>
  getTokenURI(tokenId: string): Promise<string>
}
```

### Shop Contract Features
```typescript
interface ShopOperations {
  deploy(params: DeployParams): Promise<string>
  recordAffiliate(params: RecordParams): Promise<string>
  claimRewards(params: ClaimParams): Promise<string>
  getShopInfo(shopId: string): Promise<ShopInfo>
}
```

### Token Operations
```typescript
interface TokenOperations {
  airdrop(params: AirdropParams): Promise<string>
  transfer(params: TransferParams): Promise<string>
  approve(params: ApproveParams): Promise<string>
  getAllowance(owner: string, spender: string): Promise<string>
}
```

## Authentication Flow

### 1. Wallet Connection
```typescript
const walletInfo = await web3.getWalletInfo();
// Returns: { address, signature, nonce, timestamp }
```

### 2. Message Signing
- Nonce-based authentication
- Timestamp validation
- Custom message formatting
- Signature verification

### 3. Session Management
- Token-based authentication
- Session persistence
- Automatic reconnection
- Logout handling

## Transaction Management

### 1. Transaction Building
```typescript
interface TransactionBuilder {
  setTo(address: string): this
  setValue(amount: string): this
  setData(data: string): this
  setGasLimit(limit: string): this
  setGasPrice(price: string): this
  build(): Transaction
}
```

### 2. Transaction Monitoring
- Status tracking
- Confirmation monitoring
- Receipt validation
- Error handling

### 3. Gas Management
- Gas estimation
- Gas price optimization
- EIP-1559 support
- Fee suggestions

## Event Handling

### 1. Contract Events
```typescript
interface EventListener {
  subscribe(eventName: string, callback: Function): void
  unsubscribe(eventName: string): void
  once(eventName: string, callback: Function): void
}
```

### 2. Wallet Events
- Connect/Disconnect
- Network change
- Account change
- Chain change

### 3. Transaction Events
- Pending
- Confirmed
- Failed
- Dropped

## Error Handling

### 1. Custom Exceptions
- Detailed error messages
- Error classification
- Recovery suggestions
- Debug information

### 2. User Feedback
- Modal notifications
- Error descriptions
- Action suggestions
- Recovery options

## Network Management

### 1. Network Switching
```typescript
interface NetworkManager {
  switchNetwork(chainId: string): Promise<void>
  addNetwork(config: NetworkConfig): Promise<void>
  getCurrentNetwork(): Promise<Network>
}
```

### 2. Network Configuration
- RPC endpoints
- Chain IDs
- Network metadata
- Explorer URLs

## Development Tools

### 1. Testing Utilities
- Mock providers
- Test networks
- Fixture data
- Helper functions

### 2. Debugging Tools
- Transaction inspector
- Event logger
- State tracker
- Error analyzer 