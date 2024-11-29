# Technical Documentation for `solana-provider.ts`

## Overview

The `solana-provider.ts` script defines the `SolanaProvider` class, a robust implementation for interacting with the Solana blockchain. It includes wallet management, payment processing, and transaction functionalities, leveraging the Solana Web3 and SPL Token libraries.

---

## Dependencies

### External Libraries

- **ky**: For HTTP requests and API integration.
- **@solana/web3.js**: For interacting with the Solana blockchain.
- **@solana/spl-token**: For handling SPL token transactions.
- **ethers**: For utilities like `BigNumber` and `base58` encoding.

### Internal Modules

- **chain-provider.interface**: Defines the provider interface for Solana.
- **login-result.interface**: Specifies the structure for login results.
- **payment-interface**: Details the payment input data structure.
- **evm.helpers**: Provides utility functions like `getCartData` and `getNonce`.

---

## Class: `SolanaProvider`

### Properties:

- **`axiosInstance`**: HTTP client instance for API integration.
- **`network`**: Specifies the blockchain network (Mainnet or Devnet).
- **`address`**: Wallet address of the connected user.
- **`modalInterface`**: Manages UI feedback.
- **`wallet`**: Selected wallet type (default: Phantom).
- **`nftContractAddress`**: Address of the NFT contract (optional).
- **`shopContractAddress`**: Address of the shop contract (optional).

---

### Methods

#### Constructor: `SolanaProvider(network)`

Initializes the provider with the specified network.

#### `setAxiosInstance(axiosInstance)`

Configures the Axios instance for API integration.

#### `walletLogin()`

Handles user login using the Phantom wallet.

- **Workflow**:

  1. Checks if Phantom is installed.
  2. Connects to the wallet.
  3. Generates and signs a login message.
  4. Returns login details, including address, signature, nonce, and date.

- **Return**: `ILoginResult` object.

#### `payment(data)`

Processes a payment transaction.

- **Workflow**:

  1. Fetches payment details using `getCartData`.
  2. Verifies the availability of Phantom wallet.
  3. Creates and executes a token transfer transaction.
  4. Confirms the transaction on-chain.

- **Return**: An object containing the transaction hash, crypto amount, and order ID.

#### `paymentWithToken(receiver, amount, tokenAddress)`

Transfers tokens to a specified receiver.

- **Workflow**:

  1. Verifies Phantom wallet availability.
  2. Creates a token transfer transaction.
  3. Confirms the transaction on-chain.

- **Return**: The transaction hash.

#### `setAddress(address)`

Sets the wallet address for the provider.

#### `setWallet(wallet)`

Configures the wallet type (default: Phantom).

#### `setModal(modal)`

Configures the modal interface for UI feedback.

#### `setNFTContractAddress(address)`

Sets the NFT contract address.

#### `setShopContractAddress(address)`

Sets the shop contract address.

#### `getPaymentData(cartID, paymentType, token)`

Retrieves payment data for the specified cart (not implemented).

---

## Error Handling

### Custom Exceptions:

- **`WalletNotFoundException`**: Thrown if the Phantom wallet is not installed.

### Logging and Feedback:

- Errors are logged to the console and displayed using the `modalInterface`.

---

## Notes and Recommendations

1. **Wallet Compatibility**:

   - Ensure Phantom wallet is installed and available.

2. **Network Configuration**:

   - Use the correct RPC URLs for Mainnet and Devnet.

3. **Error Feedback**:

   - Provide detailed feedback for missing wallets or failed transactions.

4. **Testing**:
   - Test token transfers and payment flows across Mainnet and Devnet.

---
