# Technical Documentation for `chain-abis.ts`

## Overview

The `chain-abis.ts` file defines the `getShopABI` function, which retrieves the ABI (Application Binary Interface) for interacting with shop contracts on Ethereum-compatible blockchains.

---

## Function

### `getShopABI`

Retrieves the ABI for shop contracts.

#### Return:

- **Type**: Array of objects representing the ABI for a shop contract.

#### Example Usage:

```typescript
import { getShopABI } from './chain-abis';
const shopABI = getShopABI();
console.log(shopABI);
```

---

## ABI Structure

The ABI returned by `getShopABI` includes the following methods:

- `requestAffiliate`: Handles affiliate requests.
- `approveRequest`: Approves affiliate requests.
- `disapproveRequest`: Disapproves affiliate requests.
- `recordBatch`: Records a batch of transactions.
- `recordPurchase`: Records individual purchases.

---

## Notes and Recommendations

1. **ABI Updates**:

   - Ensure the ABI matches the deployed contract version.

2. **Validation**:
   - Test ABI interactions with the deployed smart contract.

---

---

# Technical Documentation for `chain-constants.ts`

## Overview

The `chain-constants.ts` file defines constants and utility functions for Ethereum-compatible blockchain interactions.

---

## Constants

### `ZERO_ADDRESS`

- **Type**: `string`
- **Value**: `0x0000000000000000000000000000000000000000`
- **Description**: Represents the null address in Ethereum.

### `DROPLINKED_MANAGER`

- **Type**: `string`
- **Value**: `0x2F86E1B1A69D259b9609b40E3cbEBEa29946f979`
- **Description**: Address of the Droplinked manager contract.

---

## Functions

### `getDeployerAddress`

Fetches the deployer contract address.

#### Parameters:

- `chain`: Blockchain chain.
- `network`: Blockchain network.

#### Return:

- The address of the deployer contract.

### `getProxyAddress`

Fetches the proxy contract address.

#### Parameters:

- `chain`: Blockchain chain.
- `network`: Blockchain network.

#### Return:

- The address of the proxy contract.

### `getFundsProxy`

Fetches the funds proxy contract address.

#### Parameters:

- `chain`: Blockchain chain.
- `network`: Blockchain network.

#### Return:

- The address of the funds proxy.

### `getShopByteCode`

Fetches the bytecode for shop contracts.

#### Return:

- A string containing the bytecode.

---

## Notes and Recommendations

1. **Dynamic Fetching**:

   - Addresses and bytecode are fetched dynamically using network-specific APIs.

2. **Error Handling**:
   - Ensure robust error handling for network failures.

---

---

# Technical Documentation for `chain-structs.ts`

## Overview

The `chain-structs.ts` file provides type definitions and utility functions for blockchain-related data structures.

---

## Types

### `Uint256`

Represents a 256-bit unsigned integer.

### `EthAddress`

A branded string type for Ethereum addresses.

---

## Enumerations

### `NFTType`

Defines the types of NFTs:

- `ERC1155`
- `ERC721`

### `ProductType`

Defines the types of products:

- `DIGITAL`
- `PHYSICAL`
- `POD`

---

## Utility Functions

### `toEthAddress`

Validates and brands a string as an Ethereum address.

#### Parameters:

- `address`: The address to validate.

#### Return:

- A branded Ethereum address.

#### Example:

```typescript
const ethAddress = toEthAddress('0x123...abc');
console.log(ethAddress);
```

---

## Notes and Recommendations

1. **Validation**:
   - Use `toEthAddress` to ensure valid Ethereum addresses.

---

---

