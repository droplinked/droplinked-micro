# Technical Documentation for `chain.config.ts`

## Overview

The `chain.config.ts` file defines the `DroplinkedChainConfig` type, a configuration structure for blockchain interaction using the `ethers.js` library. It is used across the system for managing chain, network, and wallet configurations.

---

## Type Definitions

### `DroplinkedChainConfig`

A type for specifying the blockchain configuration.

#### Properties:

- **`provider`**: The web3 provider instance (e.g., ethers.js or any other library's provider).
- **`chain`**: The blockchain chain (e.g., Ethereum, Binance Smart Chain).
- **`network`**: The blockchain network (e.g., Mainnet, Testnet).
- **`address`**: The Ethereum address of the wallet (`EthAddress`).
- **`gasPredictable`**: A boolean indicating whether gas estimation is supported.

#### Example Usage:

```typescript
const config: DroplinkedChainConfig = {
  provider: new ethers.providers.Web3Provider(window.ethereum),
  chain: Chain.ETH,
  network: Network.MAINNET,
  address: '0x123...abc' as EthAddress,
  gasPredictable: true,
};
```

---

## Dependencies

- **ethers**: For blockchain interactions.
- **chains**: Enum definitions for chains and networks.
- **chain-structs**: Provides type definitions for Ethereum addresses.

---

## Notes and Recommendations

1. **Gas Prediction**:

   - Use the `gasPredictable` property to differentiate between chains where gas price estimation is reliable.

2. **Error Handling**:
   - Ensure the `provider` and `address` are correctly initialized to avoid runtime issues.

---

---

# Technical Documentation for `chainlink-addresses.ts`

## Overview

The `chainlink-addresses.ts` file provides a mapping of Chainlink price feed contract addresses for various blockchains and networks. These addresses are used to fetch price data from the Chainlink oracle network.

---

## Structure

### `chainLink`

An object containing Chainlink contract addresses categorized by blockchain chains and networks.

#### Supported Chains and Networks:

- **Binance Smart Chain**:
  - **Testnet**: `0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526`
  - **Mainnet**: `0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE`
- **Polygon**:
  - **Testnet**: `0x001382149eBa3441043c1c66972b4772963f5D43`
  - **Mainnet**: `0xAB594600376Ec9fD91F8e885dADF0CE036862dE0`
- **Base**:
  - **Testnet**: `0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1`
  - **Mainnet**: `0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70`
- **Linea**:
  - **Mainnet**: `0x3c6Cd9Cc7c7a4c2Cf5a82734CD249D7D593354dA`
- **Ethereum**:
  - **Testnet**: `0x694AA1769357215DE4FAC081bf1f309aDC325306`
  - **Mainnet**: `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419`

---

## Example Usage

### Fetching a Chainlink Address

```typescript
import { chainLink } from './chainlink-addresses';
const ethMainnetAddress = chainLink[Chain.ETH][Network.MAINNET];
console.log(`Chainlink Address for ETH Mainnet: ${ethMainnetAddress}`);
```

---

## Notes and Recommendations

1. **Address Updates**:

   - Ensure the addresses are updated periodically based on Chainlink's official documentation.

2. **Integration**:
   - Use these addresses to initialize price feed contracts in your application.

---

---

# Technical Documentation for `web3-config.ts`

## Overview

The `web3-config.ts` file defines the `Web3ChainConfig` type and `Web3Actions` enumeration. It provides configurations and actions for interacting with blockchain networks using web3 libraries.

---

## Type Definitions

### `Web3Actions`

An enumeration of supported web3 actions.

#### Values:

- `LOGIN`: For user login and authentication.
- `DEPLOY`: For deploying contracts.
- `RECORD_AFFILIATE`: For recording affiliate data.
- `PAYMENT`: For processing payments.
- `CLAIM`: For claiming NFTs or tokens.

---

### `Web3ChainConfig`

A union type for specifying web3 configurations based on the action.

#### Properties:

- **Common Properties**:
  - `chain`: Blockchain chain (e.g., Ethereum, Binance Smart Chain).
  - `preferredWallet`: Preferred wallet type (e.g., MetaMask, Coinbase).
  - `modalInterface`: Optional interface for UI feedback.
- **Action-Specific Properties**:
  - `userAddress`: The user's blockchain address.
  - `nftContractAddress`: Address of the NFT contract (for affiliate recording).
  - `shopContractAddress`: Address of the shop contract (for affiliate recording and claiming).

---

## Example Usage

### Login Configuration

```typescript
const loginConfig: Web3ChainConfig = {
  method: Web3Actions.LOGIN,
  chain: Chain.ETH,
  preferredWallet: ChainWallet.Metamask,
};
```

### Deployment Configuration

```typescript
const deployConfig: Web3ChainConfig = {
  method: Web3Actions.DEPLOY,
  chain: Chain.POLYGON,
  preferredWallet: ChainWallet.CoinBase,
  userAddress: '0x123...abc',
};
```

---

## Notes and Recommendations

1. **Extensibility**:

   - Add more actions to `Web3Actions` and extend the configuration type as needed.

2. **Validation**:
   - Ensure all required fields are provided for the selected action.

---

---
