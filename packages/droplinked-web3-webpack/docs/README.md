# Project Onboarding Guide

Welcome to the DropLinked Web3 integration library! This document is designed to bring new developers up to speed on how the system is structured, how its core components interact, and how to extend or maintain functionality. It covers architecture, key abstractions, concrete implementations (with a focus on EVM-compatible chains), error handling, configuration, and end-to-end usage examples.

---

## 0. Project Structure

```
│   index.ts
│   
└───lib
    │   web3.ts
    │   
    ├───chains
    │   │   chain-provider.ts
    │   │   README.md
    │   │   
    │   ├───dto
    │   │   │   chains.ts
    │   │   │   
    │   │   ├───configs
    │   │   │       chain.config.ts
    │   │   │       chainlink-addresses.ts
    │   │   │       README.md
    │   │   │       web3-config.ts
    │   │   │
    │   │   ├───constants
    │   │   │       airdrop-abi.ts
    │   │   │       chain-abis.ts
    │   │   │       chain-constants.ts
    │   │   │       chain-structs.ts
    │   │   │       README.md
    │   │   │
    │   │   ├───errors
    │   │   │       chain-errors.ts
    │   │   │
    │   │   └───interfaces
    │   │           airdrop-token.interface.ts
    │   │           chain-payment.interface.ts
    │   │           chain-provider.interface.ts
    │   │           claim-nft-inputs.ts
    │   │           deploy-shop.interface.ts
    │   │           login-result.interface.ts
    │   │           modal-interface.interface.ts
    │   │           payment-interface.ts
    │   │           record-web3-product.interface.ts
    │   │           web3-context.interface.ts
    │   │
    │   └───providers
    │       ├───evm
    │       │       evm-affiliate.ts
    │       │       evm-airdrop.ts
    │       │       evm-claim-nfts.ts
    │       │       evm-constants.ts
    │       │       evm-deploy-shop.ts
    │       │       evm-login.ts
    │       │       evm-payments.ts
    │       │       evm-provider.ts
    │       │       evm-publish.ts
    │       │       evm-record.ts
    │       │       evm.helpers.ts
    │       │       README.md
    │       │
    │       ├───solana
    │       │       README.md
    │       │       solana-provider.ts
    │       │
    │       └───unstoppable
    │               unstoppable-provider.ts
    │
    └───wallet-providers
            appkit.ts
```


---

## 1. High-Level Architecture

At the heart of this library is a **factory** class called `DropWeb3`, which, given a chosen network (Testnet, Mainnet, etc.), exposes a **single entry point** (`web3Instance`) to obtain a configured provider that implements the `IChainProvider` interface. Each provider (e.g., `EVMProvider`, `SolanaProvider`, `UnstoppableProvider`) encapsulates all chain-specific logic, from wallet connection through contract interaction and transaction management.

The design follows the **Strategy pattern**: calling code never directly references blockchain-specific classes; it only relies on the uniform methods defined by `IChainProvider`. This ensures that adding support for new chains or networks requires zero changes to application-level logic.

---

## 2. Core Interfaces and Types

### 2.1 IChainProvider Interface

Defines the contract every chain provider must fulfill. Key methods:

- **`setAxiosInstance(axiosInstance: KyInstance)`**: Inject a custom HTTP client for backend calls (e.g., metadata upload, address lookup).
- **`walletLogin()`**: Trigger user login via wallet, returning `{ address, signature, nonce, timestamp }`.
- **`deployShop(shopDetails: IDeployShop)`**: Deploy a shop smart contract, returning addresses and constructor args.
- **`recordProduct(productData: IProductDetails, skuData: ISKUDetails[])`**: Mint NFTs and register product metadata with your shop contract.
- **`publishRequest(productId: Uint256, shopAddress: EthAddress)`**: Request affiliate permission to publish a product.
- **`approveRequest(requestId: Uint256, shopAddress: EthAddress)`** / **`disapproveRequest(...)`**: Approve or disapprove affiliate requests.
- **`payment(data: IPaymentInputs)`**: Execute a payment, handling token approvals and transfers.
- **`customPayment(data: IChainPayment)`**: Low-level payment via proxy contracts.
- **`paymentWithToken(receiver: string, amount: number, tokenAddress: string)`**: Direct token transfer.
- **`claimNFTs(data: ClaimNFTInputs)`**: Process NFT claim transactions.
- **`executeAirdrop(airdropId: string)`**: Run batch airdrops of NFTs or tokens.
- **Chaining setters**: `setAddress`, `setWallet`, `setModal`, `setNFTContractAddress`, `setShopContractAddress`, `setWalletModal` – provide a *fluent API* to configure context before invoking actions.
- **`disconnect()`**: Cleanly disconnect from the wallet or provider.

All methods return Promises, and setter methods return `this` for easy chaining.

### 2.2 Web3ChainConfig & Web3Actions

Controls how `DropWeb3.web3Instance()` configures your provider:

- **`method: Web3Actions`**: One of `LOGIN`, `DEPLOY`, `RECORD_AFFILIATE`, `PAYMENT`, `CLAIM`, `AIRDROP`.
- **`chain: Chain`** and **`network: Network`**: Specify which blockchain and sub-network to target.
- **`preferredWallet: ChainWallet | ChainWallet[]`**: Wallet(s) to prompt (e.g., MetaMask, Phantom, Unstoppable Domains).
- **`userAddress`, `nftContractAddress`, `shopContractAddress`**: Provide runtime data required by certain actions.
- **`modalInterface`**: Inject a UI layer for status, confirmations, or error dialogues.

The factory interprets these configs to instantiate and configure the correct provider.

### 2.3 DroplinkedChainConfig

A lightweight internal structure used by helper functions. Contains:

- **`provider: ethers.BrowserProvider`** – low-level RPC connection.
- **`chain: Chain`, `network: Network`, `userAddress: EthAddress`** – routing details.
- **`axiosInstance: KyInstance`** – API client.
- **`modalInterface: ModalInterface`** – user feedback hook.
- **`gasPredictable: boolean`** – hint for gas estimation strategies.

---

## 3. The DropWeb3 Factory

Implemented in `chain-provider.ts`, the `DropWeb3` class:

1. **Constructor**: Accepts a `Network` enum; initializes a `ky` client pointing to dev or prod API endpoints.
2. **chainMapping**: A nested dictionary mapping each `Chain` and `Network` combination to a specific provider instance.
3. **`web3Instance(config: Web3ChainConfig)`**:
   - Validates that an implementation exists for the requested chain/network.
   - Retrieves or constructs a modal via `AppKitProvider`.
   - Calls chaining setters on the provider instance: `.setAddress()`, `.setWallet()`, `.setModal()`, `.setAxiosInstance()`.
   - Returns the configured `IChainProvider`.

**Usage Example**:
```ts
const factory = new DropWeb3(Network.TESTNET);
const provider = factory.web3Instance({
  method: Web3Actions.DEPLOY,
  chain: Chain.ETH,
  userAddress: '0xabc...'
});
```

---

## 4. Implementation: EVMProvider

Located at `lib/chains/providers/evm/evm-provider.ts`, `EVMProvider`:

### 4.1 Construction & Configuration

- **Constructor**
  ```ts
  constructor(chain: Chain, network: Network, gasPredictable: boolean) { … }
  ```
  - Initializes `chain`, `network`, `gasPredictable`.
  - Sets default `axiosInstance`, `modalInterface`, and `address = ZERO_ADDRESS`.

- **Chaining Setters**: `setAxiosInstance()`, `setWalletModal()`, `setNFTContractAddress()`, `setShopContractAddress()`, `setWallet()`, `setModal()`, `setAddress()`.

### 4.2 Connection Management

- **`getEthersProvider()`**:
  1. Checks `modal.getProvider('eip155')`.
  2. Uses `modal.connect('eip155')` if needed.
  3. Returns `ethers.BrowserProvider`.

- **`disconnect()`**: Calls `modal.disconnect('eip155')` until none remain.

### 4.3 Core Feature Methods

#### 4.3.1 Wallet Login
1. `getEthersProvider()`
2. Request accounts.
3. Switch or add chain as needed.
4. Request SKALE fuel if applicable.
5. Fetch nonce, sign message.
6. Return `{ address, signature, nonce, timestamp }`.

#### 4.3.2 Shop Deployment
Delegates to `deployEVMShop()`:
1. Build constructor args.
2. Fetch bytecode via `getShopByteCode()`.
3. Estimate gas and deploy via Ethers.js.
4. Wait for `ShopDeployed` event.
5. Return `{ shopAddress, metadataURI }`.

#### 4.3.3 Product Recording (NFT Minting)
Calls `recordProduct()`:
1. Upload metadata for each SKU.
2. Prepare data: `{ tokenURI, quantity, price }`.
3. Batch mint NFTs.
4. Return `{ transactionHash, mintedIds }`.

#### 4.3.4 Affiliate Publishing Workflows
- **publishRequest()**: Sends `requestAffiliate()` transaction; waits for `AffiliateRequested` event.
- **approveRequest()/disapproveRequest()**: Executes `approve(requestId)` or `disapprove(requestId)` and handles common errors.

#### 4.3.5 Payments Processing
- **`payment()`**: Validates inputs, builds `DroplinkedChainConfig` and context, calls `droplinked_payment()`, simulates via static call, estimates gas (+5%), sends transaction.
- **`customPayment()`**: Direct proxy contract call.
- **`paymentWithToken()`**: Direct ERC20 transfer.

#### 4.3.6 NFT Claiming
`claimNFTs()` calls bulk `claimPurchase()` on shop contract; returns transaction hash.

#### 4.3.7 Airdrops
`executeAirdrop()`:
1. Fetch recipients and token lists.
2. Batch-call `airdropTokens()`.
3. Return list of transaction hashes.

---

## 5. Supporting Modules & Utilities

### 5.1 Constants & Structs
- **`chain-constants.ts`**: ZERO_ADDRESS, network IDs.
- **`chain-structs.ts`**: Types (`EthAddress`, `Uint256`, etc.)

### 5.2 ABI Definitions
- Stored in `chain-abis/`.
- Helper getters like `getERC20TokenTransferABI()`.

### 5.3 Chain Config Fetchers
In `chain.config.ts`:
- `getDeployerAddress()`, `getProxyAddress()`, `getFundsProxy()`, `getAirdropAddress()`.

### 5.4 Error Classes
From `chain-errors.ts`:
- Wallet errors: `MetaMaskNotFoundException`, etc.
- Chain errors: `ChainNotImplementedException`, etc.
- Payment errors: `InsufficientBalanceException`, etc.

---

## 6. Error Handling Patterns

1. Wrap external calls in `try/catch`.
2. Map errors to domain-specific exceptions.
3. Use `modalInterface.showError()` for UI feedback.
4. Retry transient failures (up to 2 attempts, exponential backoff).
5. Validate event logs; throw `UnexpectedContractResponse` if missing.

---

## 7. Setup, Configuration & Usage Examples

**Initialize factory**:
```ts
import { DropWeb3 } from './lib/chains/chain-provider';
import { Network, Web3Actions, Chain, ChainWallet } from './lib/chains/dto/configs/web3-config';

const web3Factory = new DropWeb3(Network.TESTNET);
```

**Login**:
```ts
const loginProvider = web3Factory.web3Instance({
  method: Web3Actions.LOGIN,
  preferredWallet: ChainWallet.Metamask
});
const { address, signature } = await loginProvider.walletLogin();
```

**Deploy Shop**:
```ts
const web3 = new DropWeb3(appDevelopment ? Network.TESTNET : Network.MAINNET);
const chainInstance = web3.web3Instance({
  method: Web3Actions.DEPLOY,
  preferredWallet: preferredWallets,
  chain: Chain.BASE,
  userAddress: "0x...",
});
const shop = chainInstance.deployShop({
  shopAddress: "...",
  shopDescription: "...",
  shopLogo: "...",
  shopName: "..."
})
console.log(shop.deployedNFTAddress, shop.deployedShopAddress, shop.transactionHash);
```


---

## 8. Extending to New Chains

1. Create `NewChainProvider implements IChainProvider` under `lib/chains/providers/newchain/`.
2. Implement all interface methods using the chain's SDK.
3. Add to `chainMapping` in `chain-provider.ts`.
4. Include any new ABI or config files.
5. Write integration tests covering all methods.

---

## 9. Best Practices & Recommendations

- **Fluent Configuration**: Always chain `.setWallet()`, `.setModal()`, `.setAxiosInstance()` before actions.
- **Await Confirmations**: Use `tx.wait()` to ensure on-chain finality.
- **Error Granularity**: Handle domain-specific exceptions for better UX.
- **Avoid Hardcoding**: Use config fetchers; do not embed addresses in code.
- **Testing**: Cover actions on both Testnet and Mainnet.
- **Security**: Always verify signatures server-side.

---

*Welcome aboard! Use this guide as your roadmap to explore, debug, and extend the DropLinked integration library.*


## 10. Project Entry Points

### 10.1 `index.ts`

The entry point of the library re-exports core modules to simplify imports:

```ts
// index.ts
export * from './lib/web3';
```

This allows consumers to import everything via:

```ts
import { DropWeb3, Web3Actions, Chain, Network } from 'droplinked-sdk';
```

### 10.2 `web3.ts`

The `web3.ts` file consolidates and re-exports all sub-modules:

```ts
import { ZERO_ADDRESS } from './chains/dto/constants/chain-constants';

export * from './chains/chain-provider';
export * from './chains/providers/evm/evm-login';
export * from './chains/dto/errors/chain-errors';
export * from './chains/dto/constants/chain-structs';
export * from './chains/dto/chains';
export * from './chains/dto/interfaces/modal-interface.interface';
export * from './chains/dto/configs/chain.config';
export * from './chains/dto/configs/web3-config';
export * from './chains/dto/interfaces/chain-provider.interface';
export * from './chains/dto/interfaces/airdrop-token.interface';
export * from './chains/dto/interfaces/claim-nft-inputs';
export * from './chains/dto/interfaces/deploy-shop.interface';
export * from './chains/dto/interfaces/record-web3-product.interface';
export * from './chains/dto/interfaces/web3-context.interface';
export { ZERO_ADDRESS };
```

This centralized export ensures that all types, interfaces, and implementations are available through a single import path.

## 11. DTO Layer & File Structure

Under `lib/chains/dto`, the Data Transfer Objects (DTOs) and configuration files define the structural contracts:

```
lib/chains/dto
├── chains.ts
├── configs
│   ├── chain.config.ts
│   └── web3-config.ts
├── constants
│   ├── chain-constants.ts
│   └── chain-structs.ts
├── errors
│   └── chain-errors.ts
└── interfaces
    ├── airdrop-token.interface.ts
    ├── chain-provider.interface.ts
    ├── chain-payment.interface.ts
    ├── claim-nft-inputs.ts
    ├── deploy-shop.interface.ts
    ├── modal-interface.interface.ts
    ├── record-web3-product.interface.ts
    └── web3-context.interface.ts
```

- **`chains.ts`**: Defines the `Chain` enum (e.g., ETH, POLYGON) and related types.
- **`chain.config.ts`**: Provides `getDeployerAddress`, `getProxyAddress`, and other address-fetching utilities.
- **`web3-config.ts`**: Exports `Web3Actions` enum and `Web3ChainConfig` interface used by the `DropWeb3` factory.
- **`chain-constants.ts`**: Common constants like `ZERO_ADDRESS` and retry settings.
- **`chain-structs.ts`**: Strong-type wrappers for on-chain data (e.g., `EthAddress`, `Uint256`).
- **`chain-errors.ts`**: Domain-specific error classes covering wallet, RPC, and contract errors.
- **Interfaces**: Define method signatures and data shapes for all features (login, deployment, recording, payments, airdrops, modal interactions).

By understanding this DTO layer, developers can see how configuration and data shapes flow through the factory into each provider.

