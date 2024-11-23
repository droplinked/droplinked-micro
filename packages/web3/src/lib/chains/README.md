# Technical Documentation for `chain-provider.ts`

## Overview

The `chain-provider.ts` file implements the `DropWeb3` class, which serves as an abstraction layer for interacting with multiple blockchain networks. It supports operations like wallet management, chain configuration, and interaction with EVM and Solana providers.

---

## Dependencies

### External Libraries

- **ethers**: For Ethereum blockchain interaction.
- **ky**: For HTTP requests and API integration.

### Internal Modules

- **chains**: Provides blockchain and network configurations.
- **web3**: Contains utility functions, exceptions, and data structures.
- **evm-provider**: Handles EVM-compatible blockchain operations.
- **solana-provider**: Manages Solana blockchain operations.

---

## Class: `DropWeb3`

### Properties:

- **`axiosInstance`**: HTTP client instance for API integration.
- **`network`**: Specifies the blockchain network (e.g., Mainnet or Testnet).
- **`chainMapping`**: A mapping of supported chains and networks to their respective providers.

### Constructor: `DropWeb3(workingNetwork)`

Initializes the instance with a specified network and creates an Axios instance for API communication.

---

### Methods

#### `web3Instance(config: Web3ChainConfig): IChainProvider`

Creates a chain provider instance based on the provided configuration.

- **Parameters**:

  - `config`: A configuration object that includes chain, network, and method-specific settings.

- **Workflow**:

  1. Determines the appropriate chain provider (EVM or Solana) based on the chain and network.
  2. Sets user address, modal interface, wallet preference, and contract addresses.

- **Return**: An instance of `IChainProvider`.

#### `getWalletInfo()`

Fetches wallet information and handles user authentication.

- **Workflow**:

  1. Checks for Ethereum provider and MetaMask installation.
  2. Requests account access and retrieves the account address.
  3. Generates a nonce and a message for user authentication.
  4. Requests the user to sign the message.

- **Return**: An object containing wallet address, signature, nonce, and date.

---

## Chain and Network Mapping

The `chainMapping` property defines supported chains and networks, associating them with their respective providers.

### Supported Chains:

- **EVM Chains**:

  - Binance Smart Chain (Mainnet, Testnet)
  - Polygon (Mainnet, Testnet)
  - Ethereum (Mainnet, Testnet)
  - Base (Mainnet, Testnet)
  - SKALE (Mainnet, Testnet)
  - Linea (Mainnet, Testnet)
  - Redbelly (Mainnet, Testnet)

- **Solana**:

  - Mainnet
  - Testnet

- **Planned Chains**:
  - NEAR
  - Casper
  - XRPLSidechain
  - Stacks

---

## Error Handling

### Custom Exceptions:

- **`WalletNotFoundException`**: Thrown if no wallet provider is found.
- **`MetaMaskNotFoundException`**: Raised if MetaMask is not installed.
- **`AccountAccessDeniedException`**: Indicates the user denied account access.
- **`NoAccountsFoundException`**: Thrown when no accounts are found in the wallet.
- **`SignatureRequestDeniedException`**: Raised when the user denies a signature request.
- **`ChainNotImplementedException`**: Indicates the specified chain and network are not implemented.
- **`WalletError`**: Generic error for wallet-related issues.

### Logging and Feedback:

- Errors are logged to the console and displayed via modal feedback.

---

## Notes and Recommendations

1. **Multi-Chain Support**:

   - Extend the `chainMapping` to support additional chains and networks.

2. **Wallet Compatibility**:

   - Ensure compatibility with multiple wallet providers like MetaMask and Phantom.

3. **Error Feedback**:

   - Provide detailed error messages for unsupported chains and denied wallet actions.

4. **Testing**:
   - Test across different chains and networks to ensure comprehensive functionality.

---
