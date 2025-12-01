# Droplinked Web3 Kit — Developer Guide 🚀

---

## Table of Contents

1. Overview  
2. Core Concepts  
3. Authentication (Login via Wallet)  
   - Metamask | Phantom Wallet (Standard Login)  
   - Unstoppable Domains Login  
4. Recording Products on-chain  
   - Record Procedure  
   - Custom Errors  
5. Payments  
   - Payment Procedure  
   - Supported Chains & Tokens  
6. Example Flows (End-to-End)  
7. Notes & Assumptions  
8. Open Questions (please confirm)

---

## 1) Overview

**Droplinked Web3 Kit** exposes a single entry class `DropWeb3` configured with an environment `Network` (e.g., `TESTNET`, `MAINNET`) and a `shopId` (as shown in the examples). From that instance, you create a **provider** through `web3Instance(...)` that is specialized by `Web3Actions` such as `LOGIN`, `RECORD`, or `PAYMENT`. Subsequent methods (e.g., `walletLogin`, `unstoppableLogin`, `recordProduct`, `payment`) execute the corresponding flow.

---

## 2) Core Concepts

- **DropWeb3:** Root object created per environment + shopId.  
- **Web3Actions:** Selects the high-level intent: `LOGIN`, `RECORD`, `PAYMENT`.  
- **Chain & ChainWallet:** Choose the blockchain (e.g., `POLYGON`, `BINANCE`) and wallet (e.g., `Metamask`, `UnstoppableDomains`, `Phantom`) for the action.  
- **Provider:** Returned by `web3Instance(...)`, it exposes the concrete method(s) for the chosen action (e.g., `walletLogin`, `unstoppableLogin`, `recordProduct`, `payment`).

---

## 3) Authentication (Login via Wallet) 🔐

### 3.1 Metamask (Standard Login)

**Purpose:** Obtain user address and signature by prompting the user’s wallet.  
**Flow:**  

1) Instantiate `DropWeb3` with `Network` and token.  
2) Create a `LOGIN` provider with your preferred wallet (`Metamask` | `Phantom`).  
3) Call `walletLogin()`.

**ChainWallets**

```
Metamask | CoinBase | CasperWallet (Deprecated) | Phantom | BaseSmartWallet | UnstoppableDomains
```

**Chains**

```js
export enum Chain {
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
  REDBELLY = 'REDBELLY',
  UNSTOPPABLE = 'UNSTOPPABLE',
  BITLAYER = 'BITLAYER',
}
```

**Example:**

```ts
// Create web3 object
const web3 = new DropWeb3(Network.TESTNET, shopId);

// Create the chain provider for login
const chainProvider = await web3.web3Instance({
  method: Web3Actions.LOGIN,
  preferredWallet: ChainWallet.Metamask,
});

// Prompt wallet & get login result
const loginData = await chainProvider.walletLogin();

console.log({
  address: loginData.address,
  date: loginData.date,
  nonce: loginData.nonce,
  signature: loginData.signature,
});
```

**Expected fields:** `address`, `date`, `nonce`, `signature`.

### 3.2 Unstoppable Domains Login

**Purpose:** Authenticate with Unstoppable Domains using a UD key and redirect origin.  
**Flow:**  

1) Instantiate `DropWeb3`.  
2) Create a `LOGIN` provider with `ChainWallet.UnstoppableDomains`.  
3) Call `unstoppableLogin(udKey, origin)`.

**Example:**

```ts
const web3 = new DropWeb3(Network.TESTNET, shopId);

const chainProvider = await web3.web3Instance({
  method: Web3Actions.LOGIN,
  preferredWallet: ChainWallet.UnstoppableDomains,
});

const loginData = await chainProvider.unstoppableLogin(
  'de81c772-62be-45ed-8d0b-103abfec2ab8', // UD Key
  window.location.origin
);

console.log({ loginData });
```

---

## 4) Recording Products on-chain 🧾

### 4.1 Record Procedure

**Purpose:** Record a product to a specific blockchain for a given shop.  
**Inputs (from your example):**

- `blockchain` (string name matching `Chain[...]`)
- `productId`
- `accountAddress` (can be `''` to trigger wallet connect)
- `shopId`
- `Network` selection (TESTNET/MAINNET)
- `preferredWallet` (e.g., `Metamask`)

**Flow:**  

1) Instantiate `DropWeb3` with environment and `shopId`.  
2) Create a `RECORD` provider for the desired chain.  
3) Call `recordProduct(productId)` and handle the response.

**Example:**

```ts
const blockchain = "POLYGON";
const productId = "your-product-id";
const accountAddress = "user-wallet-address"; // empty string -> prompts wallet connect
const shopId = "your-shop-id";

const web3 = new DropWeb3(
  appDevelopment ? Network.TESTNET : Network.MAINNET,
  shopId
);

const provider = await web3.web3Instance({
  method: Web3Actions.RECORD,
  chain: Chain[blockchain],
  preferredWallet: ChainWallet.Metamask,
  userAddress: accountAddress, // if '', user is prompted to connect
});

let record: RecordResponse = await provider.recordProduct(productId);
return record;
```

### 4.2 Custom Errors (import & check as needed)

- `ChainNotImplementedException`  
- `Unauthorized`  
- `FieldNotFound` (missing `nftContractAddress`/`shopContractAddress`)  
- `Web3CallbackFailed`  
- `MetadataUploadFailedException`  
- `WalletNotFoundException`  
- `AccountAccessDeniedException`  
- `NoAccountsFoundException`  
- `SignatureRequestDeniedException`  
- `ChainSwitchException`  
- `UserDeniedException`  

> Use these to provide user-friendly messages and remediation (e.g., ask to install wallet, approve access, switch network).

---

## 5) Payments 💳

### 5.1 Payment Procedure

**Purpose:** Execute a crypto payment for an order using a specified token and chain.  
**Inputs (from your example):**

- `shopId`
- `orderId`
- `paymentToken` (enum)
- `paymentType` (enum `Chain`)
- `userAddress` (optional: empty string will prompt wallet connect)

**Flow:**  

1) Instantiate `DropWeb3` with environment and `shopId`.  
2) Create a `PAYMENT` provider for the target chain.  
3) Call `payment({ orderID, paymentToken, paymentType })`.

**Example:**

```ts
import {
  Chain,
  ChainWallet,
  DropWeb3,
  Network,
  PaymentTokens,
  Web3Actions,
} from 'droplinked-web3-kit';

const shopId = '66d47d965744cb21dac659ab';
const orderId = '5a4fc3e56134cb23cba014dc';
const paymentMethod = 'USDC';
const paymentType = 'BINANCE';

const web3 = new DropWeb3(Network.TESTNET, shopId);

const instance = await web3.web3Instance({
  method: Web3Actions.PAYMENT,
  chain: Chain[paymentType],
  preferredWallet: ChainWallet.Metamask,
  userAddress: '0xYourWalletAddressHere', // or '' to prompt connect
});

const result = await instance.payment({
  orderID: orderId,
  paymentToken: PaymentTokens[paymentMethod],
  paymentType: Chain[paymentType],
});

console.log({
  orderID: result.orderID,
  cryptoAmount: result.cryptoAmount,
  transactionHash: result.transactionHash,
  transactionId: result.transactionId,
});
```

**Returned fields:** typical payment metadata like `cryptoAmount`, `transactionHash`, `transactionId` (names based on your example).

### 5.2 Supported Enums

**Payment Tokens**

```
ETH | RBNT | SOL | USDC | USDT | MEW | BNB | MATIC | CSPR | PARAM | BDC | BTC
```

**Chains**

```
CASPER | POLYGON | BINANCE | STACKS | XRPLSIDECHAIN | NEAR | SKALE | BASE | LINEA | ETH | SOLANA | REDBELLY | UNSTOPPABLE | BITLAYER
```

Use `PaymentTokens[<TOKEN>]` and `Chain[<CHAIN>]` for type-safe invocation.

---

## 6) Example Flows (End-to-End) 🧭

### 6.1 Login → Record

1) `LOGIN` via Metamask (`walletLogin`) to obtain `address`.  
2) `RECORD` with `userAddress` set to the login address.  
3) `recordProduct(productId)` and store the `RecordResponse` in your system.

### 6.2 Login → Pay

1) `LOGIN` to obtain `address`.  
2) `PAYMENT` with `userAddress` or let it prompt the wallet.  
3) `payment({ orderID, paymentToken, paymentType })`, then persist `transactionHash`/`transactionId`.
