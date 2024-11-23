# Table of Contents

- [Technical Documentation for `evm-affiliate.ts`](#technical-documentation-for-evm-affiliatets)
  - [Overview](#overview)
  - [Dependencies](#dependencies)
  - [Functions](#functions)
  - [Error Handling](#error-handling)
  - [Utility Components](#utility-components)
  - [Notes and Recommendations](#notes-and-recommendations)
- [Technical Documentation for `evm-claim-nfts.ts`](#technical-documentation-for-evm-claim-nftsts)
  - [Overview](#overview-1)
  - [Dependencies](#dependencies-1)
  - [Functions](#functions-1)
  - [Error Handling](#error-handling-1)
  - [Utility Components](#utility-components-1)
  - [Notes and Recommendations](#notes-and-recommendations-1)
- [Technical Documentation for `evm-deploy-shop.ts`](#technical-documentation-for-evm-deploy-shopts)
  - [Overview](#overview-2)
  - [Dependencies](#dependencies-2)
  - [Functions](#functions-2)
  - [Error Handling](#error-handling-2)
  - [Utility Components](#utility-components-2)
  - [Notes and Recommendations](#notes-and-recommendations-2)
- [Technical Documentation for `evm-login.ts`](#technical-documentation-for-evm-logints)
  - [Overview](#overview-3)
  - [Dependencies](#dependencies-3)
  - [Functions](#functions-3)
  - [Error Handling](#error-handling-3)
  - [Utility Components](#utility-components-3)
  - [Notes and Recommendations](#notes-and-recommendations-3)
- [Technical Documentation for `evm-payments.ts`](#technical-documentation-for-evm-paymentsts)
  - [Overview](#overview-4)
  - [Dependencies](#dependencies-4)
  - [Functions](#functions-4)
  - [Error Handling](#error-handling-4)
  - [Utility Components](#utility-components-4)
  - [Notes and Recommendations](#notes-and-recommendations-4)
- [Technical Documentation for `evm-publish.ts`](#technical-documentation-for-evm-publishts)
  - [Overview](#overview-5)
  - [Dependencies](#dependencies-5)
  - [Function](#function)
  - [Error Handling](#error-handling-5)
  - [Utility Components](#utility-components-5)
  - [Notes and Recommendations](#notes-and-recommendations-5)
- [Technical Documentation for `evm-record.ts`](#technical-documentation-for-evm-recordts)
  - [Overview](#overview-6)
  - [Dependencies](#dependencies-6)
  - [Functions](#functions-5)
  - [Error Handling](#error-handling-6)
  - [Utility Components](#utility-components-6)
  - [Notes and Recommendations](#notes-and-recommendations-6)
- [Technical Documentation for `evm-provider.ts`](#technical-documentation-for-evm-providerts)
  - [Overview](#overview-7)
  - [Dependencies](#dependencies-7)
  - [Class: `EVMProvider`](#class-evmprovider)
  - [Error Handling](#error-handling-7)
  - [Notes and Recommendations](#notes-and-recommendations-7)
- [Technical Documentation for `evm-constants.ts`](#technical-documentation-for-evm-constantsts)
  - [Overview](#overview-8)
  - [Functions](#functions-6)
  - [Constants](#constants)
  - [Usage](#usage)
  - [Notes and Recommendations](#notes-and-recommendations-8)

# Technical Documentation for `evm-affiliate.ts`

## Overview

The `evm-affiliate.ts` script contains TypeScript functions for interacting with Ethereum smart contracts. The file provides utilities for approving and disapproving requests in a smart contract that conforms to specific ABI standards. It integrates with the `ethers.js` library and defines error handling for common blockchain-related exceptions.

---

## Dependencies

### External Libraries

- **ethers**: For blockchain interaction and smart contract calls.
- **TypeScript**: Provides type definitions for stricter code validation.

### Internal Modules

- **chain-structs**: Defines Ethereum address and `Uint256` type structures.
- **chain-abis**: Provides the function to retrieve ABIs for the smart contract.
- **chain-constants**: Includes utility to fetch gas prices.
- **chain-errors**: Custom error classes for smart contract-specific errors.
- **modal-interface.interface**: Interface for modal UI interactions.
- **chains**: Represents the blockchain chain abstraction.

---

## Functions

### 1. `EVMApproveRequest`

This function handles the approval of a request on an Ethereum smart contract.

#### Parameters:

- **`provider`**: Instance of an Ethereum provider (e.g., MetaMask or ethers.js provider).
- **`chain`**: Blockchain chain object.
- **`address`**: Ethereum address of the signer.
- **`requestId`**: Unique identifier for the request to approve.
- **`shopAddress`**: Address of the target smart contract.
- **`modalInterface`**: Interface for displaying modal messages.

#### Workflow:

1. **Signer Validation**: Confirms that the address of the signer matches the provided Ethereum address.
2. **Smart Contract Interaction**:
   - Calls `approveRequest` method on the smart contract.
   - Estimates gas usage and initiates the transaction with a 5% buffer.
3. **Error Handling**:
   - Handles standard errors such as `ACTION_REJECTED`.
   - Parses contract-specific errors like `RequestAlreadyConfirmed`, `RequestDoesntExist`, and unauthorized access.

#### Return:

- The transaction hash as a string upon successful approval.

#### Example Usage:

```typescript
const txHash = await EVMApproveRequest(
  provider,
  chain,
  userAddress,
  requestId,
  shopContractAddress,
  modalInterface
);
console.log(`Transaction Hash: ${txHash}`);
```

---

### 2. `EVMDisapproveRequest`

This function is responsible for disapproving a request on the Ethereum smart contract.

#### Parameters:

- **`provider`**: Ethereum provider instance.
- **`chain`**: Blockchain chain object.
- **`address`**: Ethereum address of the signer.
- **`requestId`**: Unique identifier for the request to disapprove.
- **`shopAddress`**: Target smart contract address.
- **`modalInterface`**: Interface for modal interactions.

#### Workflow:

1. **Signer Validation**: Ensures that the signer's address matches the provided address.
2. **Smart Contract Interaction**:
   - Calls the `disapprove` method on the contract.
   - Estimates gas usage and executes the transaction.
3. **Error Handling**:
   - Catches generic rejection errors (`ACTION_REJECTED`).
   - Handles contract-specific exceptions like `RequestNotConfirmed`, `RequestDoesntExist`, and unauthorized actions.

#### Return:

- The transaction hash as a string upon successful disapproval.

#### Example Usage:

```typescript
const txHash = await EVMDisapproveRequest(
  provider,
  chain,
  userAddress,
  requestId,
  shopContractAddress,
  modalInterface
);
console.log(`Transaction Hash: ${txHash}`);
```

---

## Error Handling

### Custom Errors:

- **`RequestAlreadyConfirmed`**: Thrown if the request is already approved.
- **`RequestDoesntExist`**: Thrown if the request does not exist.
- **`RequestNotConfirmed`**: Raised when attempting to disapprove a non-confirmed request.
- **`Unauthorized`**: Thrown for unauthorized access or operation.

### Common Error Codes:

- **`ACTION_REJECTED`**: Indicates that the user rejected the transaction.

---

## Utility Components

### `getShopABI()`

Fetches the Application Binary Interface (ABI) for the smart contract. Essential for defining the methods available in the contract.

### `getGasPrice(provider)`

Retrieves the current gas price for transactions, allowing for dynamic adjustment based on network congestion.

### `modalInterface`

Used for UI interactions to show status updates like "Waiting", "Success", or error notifications.

---

## Notes and Recommendations

1. **Gas Estimation Buffer**: The gas limit is estimated with a 5% increase to ensure successful transaction execution.
2. **Signer Validation**: Ensures a match between the Ethereum address and the signer for secure operations.
3. **Error Handling**: Comprehensive parsing of errors ensures proper messaging and exception management for blockchain transactions.
4. **Abstraction Layers**: By separating ABI and constants into distinct modules, the code promotes modularity and reusability.

---

---

# Technical Documentation for `evm-claim-nfts.ts`

## Overview

The `evm-claim-nfts.ts` script defines a function for claiming NFTs through an Ethereum smart contract. This file interacts with the blockchain using the `ethers.js` library and manages the user interface through a modal system to provide status updates.

---

## Dependencies

### External Libraries

- **ethers**: For blockchain interaction and smart contract calls.
- **TypeScript**: Provides type definitions and error-checking.

### Internal Modules

- **chain-abis**: Provides ABI details for interacting with the smart contract.
- **web3**: Includes configurations for blockchain interaction and context management.
- **claim-nft-inputs**: Defines input structures for the claimNFT function.
- **chain-constants**: Provides constants like `DROPLINKED_MANAGER`.

---

## Functions

### `claimNFT`

This function processes a claim request for NFTs based on user data and blockchain context.

#### Parameters:

- **`data`**: Input data of type `ClaimNFTInputs` containing the user's claim signature and purchase data.
- **`chainConfig`**: Configuration object for blockchain settings, including the provider and chain details.
- **`context`**: Web3 context (`IWeb3Context`) containing user session details and modal interface.

#### Workflow:

1. **Initialization**:

   - Logs the input data, chain configuration, and context.
   - Retrieves a signer instance from the blockchain provider.
   - Fetches the smart contract ABI using `getShopABI()`.
   - Initializes the smart contract object using `ethers.Contract`.

2. **Smart Contract Interaction**:

   - Constructs the cart array with purchase details (amount, productId, and nullifier).
   - Calls the `claimPurchase` method on the smart contract with required arguments:
     - `DROPLINKED_MANAGER`
     - User's signature
     - Purchase details and shop contract address.

3. **Transaction Confirmation**:

   - Waits for the transaction to be mined.
   - Displays a success modal upon transaction confirmation.

4. **Error Handling**:
   - Handles common blockchain errors like `ACTION_REJECTED`.
   - Attempts to parse contract-specific errors and logs unexpected issues.

#### Return:

- Returns an object containing the transaction hash upon successful NFT claim.

#### Example Usage:

```typescript
const result = await claimNFT(data, chainConfig, context);
console.log(`Transaction Hash: ${result.transactionHash}`);
```

---

## Error Handling

### Common Error Codes:

- **`ACTION_REJECTED`**: Indicates that the user rejected the transaction.

### Contract-Specific Errors:

- **`OwnableUnauthorizedAccount`**: Indicates unauthorized access to the smart contract.

### General Error Handling:

- Logs unexpected errors and displays them in the modal interface.

---

## Utility Components

### `getShopABI()`

Fetches the ABI for the shop contract, allowing interaction with its methods.

### `DROPLINKED_MANAGER`

A constant representing the manager address or configuration required for the claim process.

### Modal Interface (`modalInterface`)

Used to update the user interface during various stages of the transaction (e.g., "Claiming NFTs", "Success", or "Error").

---

## Notes and Recommendations

1. **Input Validation**: Ensure the `ClaimNFTInputs` data structure is correctly formatted to avoid runtime errors.
2. **Error Logging**: Comprehensive error logs help in debugging unexpected issues.
3. **Transaction Confirmation**: Always await transaction confirmations to ensure reliability.
4. **Gas Fees**: Users should be informed about potential gas fees before initiating the transaction.

---

---

# Technical Documentation for `evm-deploy-shop.ts`

## Overview

The `evm-deploy-shop.ts` script provides functionality to deploy a shop on an Ethereum-based platform. It constructs and deploys a smart contract with custom configurations, leveraging the `ethers.js` library for blockchain interactions and ensuring proper error handling and user feedback.

---

## Dependencies

### External Libraries

- **ethers**: For creating and interacting with Ethereum smart contracts.
- **TypeScript**: Provides type definitions and strict type checking.

### Internal Modules

- **chain-constants**: Provides deployer address and shop bytecode.
- **chain-abis**: Supplies the ABI for the deployer contract.
- **chain.config**: Includes configurations for blockchain interaction.
- **web3-context.interface**: Manages blockchain session details and modal UI interactions.
- **deploy-shop.interface**: Defines the structure for shop deployment details.
- **evm.helpers**: Contains utilities for Ethereum wallet verification.

---

## Functions

### 1. `deployEVMShop`

This function deploys a shop on Ethereum by constructing the necessary contract bytecode and submitting it to the deployer contract.

#### Parameters:

- **`chainConfig`**: A configuration object of type `DroplinkedChainConfig` for blockchain interaction.
- **`web3Context`**: Context containing session details and modal interface for user feedback.
- **`shopDetails`**: An object of type `IDeployShop` with the details required for shop deployment.

#### Workflow:

1. **Initialization**:

   - Logs chain configuration, web3 context, and shop details.
   - Retrieves the Ethereum signer and validates the wallet using `checkWallet`.
   - Fetches the deployer contract address and shop bytecode.

2. **Salt Generation**:

   - Creates a unique `salt` for contract deployment using the Ethereum address and a random number.

3. **Constructor Arguments**:

   - Prepares constructor arguments (`shopName`, `shopAddress`, etc.) and encodes them into the bytecode.

4. **Deployment Process**:

   - Combines the bytecode and constructor arguments into a deployable contract bytecode.
   - Sends the transaction using the deployer contract's `deployShop` method.
   - Awaits transaction confirmation and extracts deployment logs for the shop and NFT contract addresses.

5. **Error Handling**:
   - Handles common errors like `ACTION_REJECTED` for user transaction denial.
   - Parses contract-specific errors and logs unexpected deployment issues.

#### Return:

- Returns an object containing:
  - `transactionHash`: The hash of the deployment transaction.
  - `deployedShopAddress`: The address of the deployed shop contract.
  - `deployedNFTAddress`: The address of the associated NFT contract.

#### Example Usage:

```typescript
const result = await deployEVMShop(chainConfig, web3Context, shopDetails);
console.log(`Shop Address: ${result.deployedShopAddress}`);
console.log(`NFT Address: ${result.deployedNFTAddress}`);
```

---

### 2. `getConstructorArgs`

Generates the arguments required for the shop contract constructor.

#### Parameters:

- **`shopDetails`**: Details of the shop (e.g., name, address, logo).
- **`deployerAddress`**: Address of the deployer contract.
- **`address`**: User's Ethereum address.

#### Return:

- Returns an array of constructor arguments.

---

## Error Handling

### Common Errors:

- **`ACTION_REJECTED`**: Indicates that the user rejected the transaction.

### Contract-Specific Errors:

- **Unhandled Contract Errors**: Errors not explicitly handled will throw a generic exception.

### General Error Logging:

- Logs unexpected issues to aid debugging.

---

## Utility Components

### `getDeployerAddress`

Fetches the address of the deployer contract based on the chain and network.

### `getShopByteCode`

Retrieves the bytecode for the shop contract to be deployed.

### `checkWallet`

Validates the user's Ethereum wallet against expected configurations.

### Modal Interface (`modalInterface`)

Displays status updates during the deployment process, such as "Waiting for transaction" or "Deployment successful".

---

## Notes and Recommendations

1. **Gas Prediction**: For predictable gas scenarios, `callStatic` is used to estimate gas before deployment.
2. **Error Messages**: Ensure detailed modal messages for better user experience.
3. **Salt Uniqueness**: Use a sufficiently unique salt to prevent deployment collisions.
4. **Transaction Confirmation**: Always wait for transaction confirmation to verify deployment success.

---

---

# Technical Documentation for `evm-login.ts`

## Overview

The `evm-login.ts` script facilitates Ethereum wallet login and chain management for decentralized applications. It includes utilities for wallet connection, chain switching, balance retrieval, and user authentication through signature-based verification.

---

## Dependencies

### External Libraries

- **ky**: Lightweight HTTP client for API requests.
- **TypeScript**: Provides type safety and structured development.

### Internal Modules

- **chains**: Contains definitions for blockchain chains and networks.
- **modal-interface.interface**: Manages modal UI interactions.
- **chain-errors**: Custom error classes for blockchain operations.
- **evm.helpers**: Provides utility functions such as `getNonce`.
- **login-result.interface**: Defines the structure for login results.

---

## Functions

### 1. `evmLogin`

Handles the entire login process, including wallet connection, chain switching, and user authentication.

#### Parameters:

- **`provider`**: Ethereum provider instance (e.g., MetaMask).
- **`chain`**: Blockchain chain (e.g., Ethereum, Polygon).
- **`network`**: Blockchain network (e.g., Mainnet, Testnet).
- **`modalInterface`**: Interface for modal UI feedback.
- **`axiosInstance`**: HTTP client instance for backend interactions.

#### Workflow:

1. **Wallet Connection**:

   - Checks if the wallet is connected using `isWalletConnected`.
   - Requests account access if not connected.

2. **Chain Management**:

   - Switches to the correct chain using `changeChain`.
   - Adds the chain if necessary via `wallet_addEthereumChain`.

3. **SKALE-Specific Fuel Distribution**:

   - Requests SKALE fuel distribution for supported chains.

4. **User Authentication**:

   - Generates a nonce using `getNonce` for secure message signing.
   - Creates a message with the nonce and timestamp.
   - Signs the message using the wallet's private key.

5. **Return**:
   - Returns an object containing:
     - User's wallet address.
     - Signed message.
     - Nonce and timestamp for verification.

#### Example Usage:

```typescript
const loginResult = await evmLogin(
  provider,
  Chain.ETH,
  Network.MAINNET,
  modalInterface,
  axiosInstance
);
console.log(`Logged in as: ${loginResult.address}`);
```

---

### 2. `isMetamaskInstalled`

Checks if MetaMask is installed in the user's browser.

#### Return:

- **`true`** if MetaMask is installed, otherwise **`false`**.

---

### 3. `isCoinBaseInstalled`

Checks if Coinbase Wallet is installed in the user's browser.

#### Return:

- **`true`** if Coinbase Wallet is installed, otherwise **`false`**.

---

### 4. `getAccounts`

Fetches the connected Ethereum accounts.

#### Parameters:

- **`ethereum`**: Ethereum provider instance.

#### Return:

- Array of account addresses.

#### Example:

```typescript
const accounts = await getAccounts(ethereum);
console.log(accounts);
```

---

### 5. `isWalletInstalled`

Determines if a wallet is installed for the specified blockchain chain.

#### Parameters:

- **`chain`**: Blockchain chain name.

#### Return:

- Object with `installed` (boolean) and `walletName` (string).

---

### 6. `isWalletConnected`

Checks if the wallet is currently connected.

#### Parameters:

- **`ethereum`**: Ethereum provider instance.

#### Return:

- **`true`** if a wallet is connected, otherwise **`false`**.

---

### 7. `isChainCorrect`

Verifies if the wallet is connected to the correct chain.

#### Parameters:

- **`ethereum`**: Ethereum provider instance.
- **`chain`**: Blockchain chain.
- **`network`**: Blockchain network.

#### Return:

- **`true`** if the chain is correct, otherwise throws an exception.

---

### 8. `changeChain`

Switches the wallet to the specified chain.

#### Parameters:

- **`ethereum`**: Ethereum provider instance.
- **`chain`**: Blockchain chain.
- **`network`**: Blockchain network.

---

### 9. `getBalance`

Fetches the balance of a given Ethereum address.

#### Parameters:

- **`provider`**: Ethereum provider instance.
- **`address`**: Wallet address.

#### Return:

- Numeric balance.

#### Example:

```typescript
const balance = await getBalance(provider, '0x123...');
console.log(`Balance: ${balance}`);
```

---

### 10. `requestAccounts`

Requests the user's wallet to connect accounts.

#### Parameters:

- **`ethereum`**: Ethereum provider instance.

#### Return:

- Array of connected accounts.

---

## Error Handling

### Custom Errors:

- **`ChainSwitchException`**: Raised when switching chains fails.
- **`UserDeniedException`**: Thrown if the user denies a wallet request.
- **`WalletError`**: Generic wallet-related error.
- **`WalletNotFoundException`**: Indicates a missing wallet for a specific chain.

### Logging and Modal Feedback:

- Errors are logged to the console.
- User feedback is displayed through the `modalInterface`.

---

## Utility Components

### `chainNames`

A mapping of supported chains and their respective configurations, including RPC URLs and chain IDs.

---

## Notes and Recommendations

1. **Secure Login**: Use nonces and signed messages to authenticate users securely.
2. **Chain Support**: Ensure the application supports all chains defined in `chainNames`.
3. **Error Feedback**: Provide clear feedback to users in case of errors or failures.
4. **Testing**: Test wallet interactions extensively across different chains and networks.

---

---

# Technical Documentation for `evm-payments.ts`

## Overview

The `evm-payments.ts` script manages payment processing on Ethereum and compatible blockchains. It supports token approvals, custom token payments, and chain-specific implementations (e.g., SKALE, REDBELLY). This file integrates with `ethers.js` for smart contract interactions and includes comprehensive error handling.

---

## Dependencies

### External Libraries

- **ethers**: For blockchain interaction and smart contract calls.
- **TypeScript**: Ensures type safety and better error handling.

### Internal Modules

- **chains**: Defines blockchain-specific configurations and utility functions (e.g., `getGasPrice`).
- **chain-payment.interface**: Specifies the structure for payment data.
- **chain-abis**: Provides ABI definitions for contracts.
- **chain-constants**: Includes constants like proxy addresses and zero address.
- **chain.config**: Supplies blockchain configurations.
- **web3**: Provides utility types and exceptions.

---

## Functions

### 1. `droplinked_payment`

Main function to handle payment processing.

#### Parameters:

- **`chainConfig`**: Blockchain configuration (`DroplinkedChainConfig`).
- **`web3Context`**: Context for web3-related interactions.
- **`data`**: Payment data of type `IChainPayment`.

#### Workflow:

1. **Validation**:

   - Verifies receiver addresses and payment values.
   - Checks for memo and consistent data lengths.

2. **Setup**:

   - Initializes signer and validates user identity.
   - Retrieves the payment proxy contract address.

3. **Custom Token Handling**:

   - Handles token approval if custom tokens are used.

4. **Static Call**:

   - Verifies that the transaction will not fail.

5. **Gas Estimation and Balance Check**:

   - Estimates gas and verifies user balance.

6. **Transaction Execution**:

   - Executes the transaction and waits for confirmation.

7. **Return**:
   - Returns an object containing:
     - `transactionHash`: The transaction hash.
     - `cryptoAmount`: The total payment amount.

#### Example Usage:

```typescript
const result = await droplinked_payment(chainConfig, web3Context, paymentData);
console.log(`Transaction Hash: ${result.transactionHash}`);
```

---

### 2. `handleCustomTokenApproval`

Approves a custom token for payments.

#### Parameters:

- **`data`**: Payment data (`IChainPayment`).
- **`contractAddress`**: Address of the proxy contract.
- **`signer`**: Ethereum signer instance.
- **`signerAddress`**: Address of the wallet signer.
- **`modalInterface`**: Interface for displaying status updates.

#### Workflow:

1. Checks token allowance and user balance.
2. Sends an approval transaction if needed.
3. Waits for transaction confirmation.

#### Return:

- None (throws exceptions on failure).

#### Example Usage:

```typescript
await handleCustomTokenApproval(
  paymentData,
  contractAddress,
  signer,
  signerAddress,
  modalInterface
);
```

---

### 3. `redbellyPayment`

Processes payments for the REDBELLY chain.

#### Parameters:

- **`data`**: Payment data.
- **`contract`**: REDBELLY contract instance.

#### Return:

- Transaction details (hash and amount).

---

### 4. `skalePayment`

Handles SKALE chain payments with USDC token approvals.

#### Parameters:

- **`data`**: Payment data.
- **`network`**: Blockchain network (testnet or mainnet).
- **`signer`**: Ethereum signer instance.
- **`contract`**: SKALE contract instance.
- **`address`**: User's Ethereum address.

#### Return:

- Transaction details (hash and amount).

---

### Utility Functions

#### `handleError`

Handles and categorizes errors.

#### `getGasPrice`

Retrieves the current gas price from the provider.

---

## Error Handling

### Custom Exceptions:

- **`InsufficientBalanceException`**: Thrown if the userâ€™s balance is insufficient.
- **`InsufficientTokenBalanceException`**: Raised when token balance is insufficient for payment.
- **`InvalidParametersException`**: Indicates invalid input parameters.
- **`Unauthorized`**: Thrown if the signer is unauthorized.
- **`UserDeniedException`**: Raised when the user denies a wallet action.

### Logging and Feedback:

- Errors are logged to the console and displayed through `modalInterface`.

---

## Notes and Recommendations

1. **Gas Optimization**:

   - Use gas estimation before transactions to avoid failures.

2. **Error Handling**:

   - Provide detailed feedback for invalid parameters or failed transactions.

3. **Chain-Specific Logic**:

   - Implement specialized payment workflows for chains like REDBELLY and SKALE.

4. **Testing**:
   - Thoroughly test token approvals and transaction flows.

---

# Technical Documentation for `evm-publish.ts`

## Overview

The `evm-publish.ts` script handles the process of sending affiliate requests for a product in an Ethereum-based application. It interacts with a smart contract to initiate the request, estimate gas, and confirm the transaction.

---

## Dependencies

### External Libraries

- **ethers**: For blockchain interaction and smart contract calls.
- **TypeScript**: Provides type safety and structured development.

### Internal Modules

- **chain-structs**: Defines Ethereum address (`EthAddress`) and `Uint256` types.
- **chain-abis**: Supplies ABI for the shop contract.
- **chain-errors**: Custom error classes for affiliate requests (e.g., `AlreadyRequested`).
- **chain-constants**: Includes utility functions like `getGasPrice`.
- **chains**: Represents blockchain configurations and networks.
- **modal-interface.interface**: Manages modal UI interactions.

---

## Function

### `EVMPublishRequest`

Sends an affiliate request for a product to the shop smart contract.

#### Parameters:

- **`provider`**: Ethereum provider instance (e.g., MetaMask).
- **`chain`**: Blockchain chain object (e.g., Ethereum, Binance Smart Chain).
- **`address`**: Ethereum address of the signer.
- **`productId`**: ID of the product to be affiliated.
- **`shopAddress`**: Address of the shop contract.
- **`modalInterface`**: Interface for displaying modal UI feedback.

#### Workflow:

1. **Signer Validation**:

   - Verifies that the signer address matches the provided Ethereum address.

2. **Gas Estimation**:

   - Estimates gas required for the `requestAffiliate` method.

3. **Transaction Execution**:

   - Initiates the affiliate request transaction.
   - Waits for the transaction to be mined and retrieves the receipt.

4. **Event Parsing**:

   - Parses the transaction logs for the `AffiliateRequested` event.
   - Extracts the `requestId` and `publisher` from the event.

5. **Error Handling**:
   - Handles common errors like transaction rejection (`ACTION_REJECTED`).
   - Catches contract-specific errors like `AlreadyRequested`.

#### Return:

- An object containing:
  - `transactionHash`: The hash of the transaction.
  - `requestId`: The ID of the affiliate request.
  - `publisher`: The Ethereum address of the requester.

#### Example Usage:

```typescript
const result = await EVMPublishRequest({
  provider,
  chain,
  address: userAddress,
  productId,
  shopAddress,
  modalInterface,
});
console.log(`Request ID: ${result.requestId}`);
console.log(`Publisher: ${result.publisher}`);
```

---

## Error Handling

### Common Errors:

- **`ACTION_REJECTED`**: Thrown when the user rejects the transaction.

### Contract-Specific Errors:

- **`AlreadyRequested`**: Raised if an affiliate request for the product is already submitted.

### Logging and Feedback:

- Errors are displayed to the user via `modalInterface` and logged to the console.

---

## Utility Components

### `getShopABI`

Fetches the ABI for the shop contract, enabling interaction with its methods.

### `getGasPrice`

Retrieves the current gas price for transaction execution.

### `modalInterface`

Manages UI updates during the affiliate request process, including messages for waiting, success, and errors.

---

## Notes and Recommendations

1. **Gas Buffer**:

   - The function includes a 5% buffer in gas estimation to ensure successful execution.

2. **Signer Validation**:

   - Ensure the signer address matches the expected address for secure operations.

3. **Error Handling**:

   - Provide clear feedback for common errors like duplicate requests or user denial.

4. **Testing**:
   - Test the function on various blockchain networks to ensure compatibility.

---

---

# Technical Documentation for `evm-record.ts`

## Overview

The `evm-record.ts` script facilitates the recording and registration of products as NFTs on Ethereum-compatible blockchains. It supports metadata uploading, NFT minting, and batch registration with a smart contract. This file leverages `ethers.js` for blockchain interactions and provides a modular approach for product and SKU management.

---

## Dependencies

### External Libraries

- **ethers**: For blockchain interaction and smart contract calls.
- **TypeScript**: Ensures type safety and structured development.

### Internal Modules

- **chain-structs**: Defines constants like `NFTType` and `RecordResponse`.
- **chain-errors**: Provides error handling for unauthorized access.
- **chain-constants**: Includes utilities such as `getGasPrice`.
- **chain-abis**: Supplies ABI for the shop contract.
- **evm.helpers**: Provides helper functions (`checkWallet`, `uploadMetadata`).
- **record-web3-product.interface**: Defines interfaces for product and SKU details.
- **chain.config**: Supplies blockchain configurations.
- **web3-context.interface**: Manages context for blockchain operations.

---

## Functions

### 1. `recordProduct`

Registers and mints products as NFTs.

#### Parameters:

- **`chainConfig`**: Blockchain configuration (`DroplinkedChainConfig`).
- **`context`**: Web3 context containing NFT and shop contract details.
- **`product`**: Product details (`IProductDetails`).
- **`skus`**: Array of SKU details (`ISKUDetails[]`).

#### Workflow:

1. **Validation**:

   - Checks for required fields like `nftContract` and `shopContractAddress`.

2. **Preparation**:

   - Connects to the user's wallet and verifies the wallet address.
   - Prepares product metadata and record data.

3. **Batch Registration**:

   - Calls `mintAndRegisterBatch` to mint and register products.

4. **Transaction Execution**:

   - Estimates gas if the chain supports predictable gas.
   - Sends the transaction and waits for confirmation.

5. **Error Handling**:
   - Handles transaction rejection and unauthorized access errors.

#### Return:

- An object containing:
  - `transactionHash`: The hash of the transaction.

#### Example Usage:

```typescript
const result = await recordProduct(
  chainConfig,
  context,
  productDetails,
  skuDetails
);
console.log(`Transaction Hash: ${result.transactionHash}`);
```

---

### 2. `prepareRecordData`

Prepares record data for a product SKU.

#### Parameters:

- **`chainConfig`**: Blockchain configuration.
- **`skuData`**: SKU details (`ISKUDetails`).
- **`productData`**: Product details (`IProductDetails`).
- **`context`**: Web3 context.

#### Workflow:

1. Uploads product metadata.
2. Constructs record data with metadata URL and NFT contract details.

#### Return:

- A product record object.

#### Example Usage:

```typescript
const recordData = await prepareRecordData(
  chainConfig,
  skuDetails,
  productDetails,
  context
);
console.log(recordData);
```

---

### 3. `getRecordData`

Constructs record data for a product SKU.

#### Parameters:

- **`product`**: Combined product and SKU details.
- **`metadataURL`**: URL of the uploaded metadata.
- **`nftContract`**: Address of the NFT contract.

#### Return:

- An object with record details.

---

## Error Handling

### Custom Exceptions:

- **`Unauthorized`**: Raised for missing or invalid contract addresses.
- **`ACTION_REJECTED`**: Thrown if the user rejects a transaction.
- **`OwnableUnauthorizedAccount`**: Raised for unauthorized shop actions.

### Logging and Feedback:

- Errors are displayed to the user via `modalInterface` and logged to the console.

---

## Utility Components

### `getShopABI`

Fetches the ABI for the shop contract, enabling interaction with its methods.

### `getGasPrice`

Retrieves the current gas price for transaction execution.

### `uploadMetadata`

Uploads product metadata and returns the metadata URL.

### `modalInterface`

Displays status updates during the recording process (e.g., waiting, success, errors).

---

## Notes and Recommendations

1. **Metadata Management**:

   - Ensure metadata fields (`name`, `description`, `properties`) are accurately populated.

2. **Gas Optimization**:

   - Use gas estimation to avoid transaction failures.

3. **Error Handling**:

   - Provide detailed feedback for unauthorized actions and missing fields.

4. **Testing**:
   - Test the function with various product and SKU combinations.

---

---

# Technical Documentation for `evm-provider.ts`

## Overview

The `evm-provider.ts` script defines the `EVMProvider` class, a comprehensive solution for interacting with Ethereum-compatible blockchains. It handles wallet management, smart contract interaction, NFT minting, product recording, affiliate requests, payments, and more.

---

## Dependencies

### External Libraries

- **ethers**: For blockchain interaction and smart contract calls.
- **ky**: For HTTP requests and API integration.
- **TypeScript**: Provides type safety and structured development.

### Internal Modules

- **chain-structs**: Defines types like `EthAddress`, `Uint256`, and more.
- **chains**: Provides blockchain configurations and utilities like `getGasPrice`.
- **chain-constants**: Includes constants like `ZERO_ADDRESS`.
- **chain-abis**: Supplies ABI definitions for various contracts.
- **chain-errors**: Contains error classes for wallet and chain-related issues.
- **evm.helpers**: Provides utility functions like `getCartData`.
- **evm-affiliate**: Includes affiliate request handling.
- **evm-deploy-shop**: Handles shop deployment.
- **evm-login**: Provides wallet login and chain management functionality.
- **evm-publish**: Facilitates publishing requests.
- **evm-record**: Handles NFT recording and registration.
- **evm-payments**: Manages payment processing.
- **evm-claim-nfts**: Facilitates NFT claiming.

---

## Class: `EVMProvider`

### Properties:

- **`chain`**: Current blockchain chain (e.g., Ethereum, Binance Smart Chain).
- **`network`**: Current blockchain network (e.g., Mainnet, Testnet).
- **`address`**: Connected wallet address.
- **`modalInterface`**: Manages UI feedback.
- **`wallet`**: Selected wallet type (e.g., MetaMask, Coinbase).
- **`axiosInstance`**: HTTP client instance for API calls.
- **`nftContractAddress`**: Address of the NFT contract.
- **`shopContractAddress`**: Address of the shop contract.
- **`gasPredictable`**: Boolean indicating if gas can be predicted.

---

### Methods

#### Constructor: `EVMProvider(_chain, _network, gasPredictable)`

Initializes the provider with chain, network, and gas configuration.

#### `setAxiosInstance(axiosInstance)`

Sets the Axios instance for API calls.

#### `setNFTContractAddress(address)`

Sets the NFT contract address.

#### `setShopContractAddress(address)`

Sets the shop contract address.

#### `setWallet(wallet)`

Sets the wallet type.

#### `setModal(modal)`

Configures the modal interface for UI feedback.

#### `claimNFTs(data)`

Claims NFTs using the provided data.

#### `getWalletProvider()`

Returns the Ethereum provider based on the selected wallet.

#### `deployShop(shopDetails)`

Deploys a shop contract with the provided details.

#### `setAddress(address)`

Sets the connected wallet address.

#### `handleWallet(_address)`

Manages wallet connections, chain switching, and account validation.

#### `getChainConfig()`

Returns the current chain configuration.

#### `getContext()`

Returns the web3 context, including modal interface and contract details.

#### `walletLogin()`

Handles wallet login and user authentication.

#### `checkDeployment()`

Verifies if required contract addresses are set.

#### `recordProduct(productData, skuData)`

Records and mints products as NFTs.

#### `publishRequest(productId, shopAddress)`

Sends a publishing request for a product.

#### `approveRequest(requestId, shopAddress)`

Approves an affiliate request.

#### `disapproveRequest(requestId, shopAddress)`

Disapproves an affiliate request.

#### `payment(data)`

Processes a payment transaction.

#### `getPaymentData(cartID, paymentType, token)`

Fetches payment data for the specified cart and token.

#### `paymentWithToken(receiver, amount, tokenAddress)`

Processes payments using a specific token.

---

## Error Handling

### Custom Exceptions:

- **`WalletNotFoundException`**: Thrown if the wallet is not installed.
- **`Unauthorized`**: Raised for unauthorized actions.
- **`ACTION_REJECTED`**: Indicates user transaction rejection.

### Logging and Feedback:

- Errors are logged and displayed using the `modalInterface`.

---

## Notes and Recommendations

1. **Gas Optimization**:

   - Use predictable gas configurations where possible.

2. **Wallet Support**:

   - Ensure compatibility with multiple wallet types (e.g., MetaMask, Coinbase).

3. **Error Handling**:

   - Provide clear feedback for unauthorized actions and missing configurations.

4. **Testing**:
   - Test methods across various blockchain networks and wallet providers.

---

---

# Technical Documentation for `evm-constants.ts`

## Overview

The `evm-constants.ts` file provides utility functions and constants for Ethereum-compatible blockchain interactions. This file defines ABI structures for ERC20 token transfers and addresses for SKALE network's USDC contracts.

---

## Functions

### `getERC20TokenTransferABI`

Returns the ABI (Application Binary Interface) for the `transfer` function of an ERC20 token contract.

#### ABI Structure:

- **Inputs**:
  - `_to` (address): The recipient address.
  - `_value` (uint256): The amount of tokens to transfer.
- **Outputs**:
  - Returns a boolean indicating the success of the transfer.
- **Type**: `function`

#### Example Usage:

```typescript
const abi = getERC20TokenTransferABI();
console.log(abi);
```

#### Return:

- An array representing the ABI of the `transfer` function.

---

## Constants

### `SkaleUsdcAddressForTestnet`

- **Type**: String
- **Value**: `0x2aebcdc4f9f9149a50422fff86198cb0939ea165`
- **Description**: The address of the USDC contract on the SKALE testnet.

### `SkaleUsdcAddressForMainnet`

- **Type**: String
- **Value**: `0x7Cf76E740Cb23b99337b21F392F22c47Ad910c67`
- **Description**: The address of the USDC contract on the SKALE mainnet.

---

## Usage

### ABI for Token Transfers

The `getERC20TokenTransferABI` function can be used when interacting with ERC20 tokens programmatically. It provides the necessary structure to call the `transfer` method of an ERC20 token.

#### Example:

```typescript
const abi = getERC20TokenTransferABI();
const contract = new ethers.Contract(tokenAddress, abi, signer);
const tx = await contract.transfer(receiverAddress, transferAmount);
```

### SKALE USDC Addresses

The `SkaleUsdcAddressForTestnet` and `SkaleUsdcAddressForMainnet` constants can be used to specify the appropriate USDC contract address depending on the SKALE network.

#### Example:

```typescript
const usdcAddress = isTestnet
  ? SkaleUsdcAddressForTestnet
  : SkaleUsdcAddressForMainnet;
console.log(`Using USDC address: ${usdcAddress}`);
```

---

## Notes and Recommendations

1. **Network Awareness**:

   - Ensure the correct address is used depending on the network (testnet or mainnet).

2. **ERC20 Compatibility**:

   - The `transfer` ABI is compatible with any ERC20-compliant token.

3. **Testing**:
   - Verify the contract interactions on both testnet and mainnet to ensure the addresses and ABI function correctly.

---

---
