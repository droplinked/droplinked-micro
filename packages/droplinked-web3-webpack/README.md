# Web3 Package use cases via examples

## How to use Login Via Wallet

### Normal Login

```js
// Create web3 object
const web3 = new DropWeb3(Network.TESTNET, accessToken);

// create the chain provider
const chainProvider = await web3.web3Instance({
    method: Web3Actions.LOGIN,
    preferredWallet: ChainWallet.Metamask,
});

// Login via wallet
const loginData = await chainProvider.walletLogin();

// Log the results
console.log({
    address: loginData.address,
    date: loginData.date,
    none: loginData.nonce,
    signature: loginData.signature,
});
```

### Unstoppable Login

```js
const web3 = new DropWeb3(Network.TESTNET, accessToken);

const chainProvider = await web3.web3Instance({
    method: Web3Actions.LOGIN,
    preferredWallet: ChainWallet.UnstoppableDomains,
});

const loginData = await chainProvider.unstoppableLogin(
    'de81c772-62be-45ed-8d0b-103abfec2ab8', // <-- UDKey
    window.location.origin
);

console.log({ loginData });
```

## Record Procedure

```typescript
const blockchain = "POLYGON"; // The blockchain where the product will be recorded
const productId = "your-product-id"; // The ID of the product to be recorded
const accountAddress = "user-wallet-address"; // The user's wallet address, can be empty string to prompt connection
const shopId = "your-shop-id"; // The ID of the shop where the product will be recorded

const  web3 = new  DropWeb3(
 appDevelopment ? Network.TESTNET : Network.MAINNET,
 shopId
);

const  provider = await web3.web3Instance({
 method: Web3Actions.RECORD,
 chain: Chain[blockchain],
 preferredWallet: ChainWallet.Metamask,
 userAddress: accountAddress, // If the userAddress field is empty, it will prompt the user to connect their wallet first
});

let  record: RecordResponse;
record = await  provider.recordProduct(productId);

return  record;
```

### Custom errors

- `ChainNotImplementedException`: when trying to record on a chain which is not implemented yet.
- `Unauthorized`: The user is not the owner of the shop contract to record products on it.
- `FieldNotFound`: the `nftContractAddress` or `shopContractAddress` fields are not set for the recording shop.
- `Web3CallbackFailed`: The callback to web3 services after recording failed.
- `MetadataUploadFailedException`: The upload of metadata of SKUs failed.
- `WalletNotFoundException`: The preferred wallet does not exist (must redirect user to wallet installation page).
- `AccountAccessDeniedException`: The user did not grant access to their wallet when connecting.
- `NoAccountsFoundException`: The user did not grant access to any of their accounts when connecting.
- `SignatureRequestDeniedException`: The user denied a signature request.
- `ChainSwitchException`: Can not switch to the correct chain in the user's wallet.
- `UserDeniedException`: User denied a sign transaction request.

You can import these errors and check if any of them happens during a record process.

## Payment Procedure

```js
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

// Create Web3 Object
const web3 = new DropWeb3(Network.TESTNET, shopId);

// Get a provider instance
const instance = await web3.web3Instance({
    method: Web3Actions.PAYMENT,
    chain: Chain[paymentType],
    preferredWallet: ChainWallet.Metamask,
    userAddress: '0xYourWalletAddressHere', // <-- This can be fetched by using the login method, also you can pass empty string and the package will ask the user to connect their wallet
});

// Call the payment method
const result = await instance.payment({
    orderID: orderId,
    paymentToken: PaymentTokens[paymentMethod],
    paymentType: Chain[paymentType],
});

// Log the results
console.log({
    orderID: result.orderID,
    cryptoAmount: result.cryptoAmount,
    transactionHash: result.transactionHash,
    transactionId: result.transactionId,
});
```

List of Chains and Payment Tokens supported can be found here:

Payment Tokens:

```js
export declare enum PaymentTokens {
    ETH = "ETH",
    RBNT = "RBNT",
    SOL = "SOL",
    USDC = "USDC",
    USDT = "USDT",
    MEW = "MEW",
    BNB = "BNB",
    MATIC = "MATIC",
    CSPR = "CSPR",
    PARAM = "PARAM",
    BDC = "BDC",
    BTC = "BTC"
}
```

Chains:

```js
export declare enum Chain {
    CASPER = "CASPER",
    POLYGON = "POLYGON",
    BINANCE = "BINANCE",
    STACKS = "STACKS",
    XRPLSIDECHAIN = "XRPLSIDECHAIN",
    NEAR = "NEAR",
    SKALE = "SKALE",
    BASE = "BASE",
    LINEA = "LINEA",
    ETH = "ETH",
    SOLANA = "SOLANA",
    REDBELLY = "REDBELLY",
    UNSTOPPABLE = "UNSTOPPABLE",
    BITLAYER = "BITLAYER"
}
```
