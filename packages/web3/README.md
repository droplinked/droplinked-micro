# JavaScript Library Documentation

## Overview

This library is a TypeScript-based abstraction layer designed for interacting with multiple blockchain ecosystems, including Ethereum, Solana, and more. It provides tools for wallet integrations, Login processes, Deploying shops on droplinked, Recording products, Doing affiliate related tasks and Payment methods. Its modular architecture ensures scalability, reliability, and ease of use for complex blockchain interactions.

---

## Table of Contents

1. [Installation](#installation)
2. [Architecture Overview](#architecture-overview)
3. [Modules and Functionalities](#modules-and-functionalities)
   - [DropWeb3 Class](#dropweb3-class)
   - [Chain Configurations](#chain-configurations)
   - [Web3 Actions and Configurations](#web3-actions-and-configurations)
4. [Supported Enumerations](#supported-enumerations)
5. [Error Handling](#error-handling)
6. [Practical Usage](#practical-usage)
   - [Connecting a Wallet](#connecting-a-wallet)
   - [Smart Contract Deployment](#smart-contract-deployment)
   - [Transaction Handling](#transaction-handling)
7. [Extending the Library](#extending-the-library)

---

## Installation

To integrate the library into your project, install it via npm or yarn:

```bash
npm install droplinked-web3
# or
yarn add droplinked-web3
```

---

## Architecture Overview

The library is modular, focusing on separating concerns for better scalability and maintainability:

- **Chains Module**: Handles blockchain interaction, configurations, and utilities.
- **Providers**: Abstracts blockchain interaction for Ethereum-compatible and Solana blockchains.
- **Web3 Core Logic**: Implements key actions like wallet connection, payments, and shop deployments.

### Core Dependencies

- `ethers`: Ethereum provider and smart contract utilities.
- `ky`: HTTP client for lightweight, efficient network calls.
- `typescript`: Enforces type safety and modular design.

---

## Modules and Functionalities

### DropWeb3 Class

The `DropWeb3` class is the central interface for interacting with blockchains.

#### Constructor

```typescript
constructor(workingNetwork: Network)
```

- **Parameters**:
  - `workingNetwork`: Specifies the blockchain network mode (e.g., `Network.MAINNET` or `Network.TESTNET`).
- **Usage**:
  ```typescript
  const web3 = new DropWeb3(Network.MAINNET);
  ```

#### Responsibilities

1. Manages blockchain providers:
   - `EVMProvider` for Ethereum-compatible chains.
   - `SolanaProvider` for Solana networks.
2. Handles the easy login method (getting user's wallet address without the need to log in or change chains in the wallet).

---

### Chain Configurations

The `chains.ts` module defines the supported blockchains, tokens, and wallet types.

#### Supported Chains

Enumerated in the `Chain` enum:

```typescript
enum Chain {
  CASPER = 'CASPER',
  POLYGON = 'POLYGON',
  BINANCE = 'BINANCE',
  STACKS = 'STACKS',
  XRPLSIDECHAIN = 'XRPLSIDECHAIN',
  NEAR = 'NEAR',
  SKALE = 'SKALE',
  BASE = 'BASE',
  LINEA = 'LINEA',
  ETH = 'ETH',
  SOLANA = 'SOLANA',
  REDBELLY = 'REDBELLY,
}
```

#### Payment Tokens

Defines supported tokens to pay with in the droplinked ecosystem:

```typescript
enum PaymentTokens {
  ETH = 'ETH',
  RBNT = 'RBNT',
  SOL = 'SOL',
  USDC = 'USDC',
  USDT = 'USDT',
  MEW = 'MEW',
  BNB = 'BNB',
  MATIC = 'MATIC',
  CSPR = 'CSPR',
  PARAM = 'PARAM',
  BDC = 'BDC',
}
```

#### Wallets

Enumerates wallet types that can be used to interact with droplinked contracts on the user side (front-end):

```typescript
enum ChainWallet {
  Metamask = 'Metamask',
  CoinBase = 'CoinBase',
  CasperWallet = 'CasperWallet',
  Phantom = 'Phantom',
  BaseSmartWallet = 'BaseSmartWallet',
}
```

---

### Web3 Actions and Configurations

The `web3-config.ts` module defines configurations for Web3 interactions.

#### Web3Actions Enum

```typescript
enum Web3Actions {
  LOGIN = 'LOGIN',
  DEPLOY = 'DEPLOY',
  RECORD_AFFILIATE = 'RECORD_AFFILIATE',
  PAYMENT = 'PAYMENT',
  CLAIM = 'CLAIM',
}
```

#### Web3ChainConfig Type

Represents action-specific configurations:

```typescript
type Web3ChainConfig = {
  method: Web3Actions;
  chain: Chain;
  preferredWallet: ChainWallet;
  userAddress?: string;
  nftContractAddress?: string;
  shopContractAddress?: string;
};
```

---

## Supported Enumerations

### Network

```typescript
enum Network {
  MAINNET,
  TESTNET,
}
```

### ChainWallet

```typescript
enum ChainWallet {
  Metamask,
  CoinBase,
  ...
}
```

---

## Error Handling

The library provides structured error handling to ensure robustness:

- `AccountAccessDeniedException`: Raised when wallet access is denied.
- `MetaMaskNotFoundException`: Indicates that MetaMask is not installed.
- `SignatureRequestDeniedException`: Triggered when a user denies a signature request.
- `ChainNotImplementedException`: Raised for unsupported blockchain chains.

---

## Practical Usage

### Connecting a Wallet

```typescript
import { DropWeb3, Web3Actions, Chain, ChainWallet } from 'your-library-name';

const web3 = new DropWeb3(Network.MAINNET);
const loginConfig = {
  method: Web3Actions.LOGIN,
  chain: Chain.POLYGON,
  preferredWallet: ChainWallet.Metamask,
};

web3.performAction(loginConfig).then(() => {
  console.log('Wallet connected!');
});
```

### Smart Contract Deployment

```typescript
const deployConfig = {
  method: Web3Actions.DEPLOY,
  chain: Chain.ETH,
  userAddress: '0xYourAddress',
  preferredWallet: ChainWallet.Metamask,
};

web3.performAction(deployConfig).then(() => {
  console.log('Contract deployed successfully!');
});
```

### Transaction Handling

```typescript
const paymentConfig = {
  method: Web3Actions.PAYMENT,
  chain: Chain.SOLANA,
  userAddress: '0xYourAddress',
  preferredWallet: ChainWallet.Phantom,
};

web3.performAction(paymentConfig).then(() => {
  console.log('Payment successful!');
});
```

---

## Extending the Library

To add support for a new blockchain:

1. Define the chain in `chains.ts`.
2. Implement a provider class in `providers`.
3. Extend configurations in `web3-config.ts`.

---
