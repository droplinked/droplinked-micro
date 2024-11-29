import { EthAddress, Uint256 } from '../constants/chain-structs';

/**
 * Base class for all chain-related errors.
 */
export class ChainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name; // Sets the error name to the class name
  }
}

/**
 * Base class for all wallet-related errors.
 */
export class WalletError extends ChainError {}

/**
 * Error thrown when a request already exists.
 */
export class AlreadyRequested extends ChainError {
  public readonly requestId: Uint256;
  public readonly publisher: EthAddress;

  constructor(productId: Uint256, requester: EthAddress) {
    super(`Request for ${productId} from ${requester} already exists`);
    this.requestId = productId;
    this.publisher = requester;
  }
}

/**
 * Error thrown when unauthorized access is attempted.
 */
export class Unauthorized extends ChainError {
  public readonly method: string;
  public readonly from: EthAddress;
  public readonly to: EthAddress;

  constructor(method: string, from: EthAddress, to: EthAddress) {
    super(`Unauthorized access to ${method} from ${from} to ${to}`);
    this.method = method;
    this.from = from;
    this.to = to;
  }
}

/**
 * Error thrown when a request does not exist.
 */
export class RequestDoesntExist extends ChainError {
  public readonly requestId: Uint256;
  public readonly shopAddress: EthAddress;

  constructor(requestId: Uint256, shopAddress: EthAddress) {
    super(`Request ${requestId} does not exist for shop ${shopAddress}`);
    this.requestId = requestId;
    this.shopAddress = shopAddress;
  }
}

/**
 * Error thrown when a request is already confirmed.
 */
export class RequestAlreadyConfirmed extends ChainError {
  public readonly requestId: Uint256;
  public readonly shopAddress: EthAddress;

  constructor(requestId: Uint256, shopAddress: EthAddress) {
    super(`Request ${requestId} already confirmed for shop ${shopAddress}`);
    this.requestId = requestId;
    this.shopAddress = shopAddress;
  }
}

/**
 * Error thrown when a request does not exist.
 */
export class RequestDoesNotExist extends ChainError {
  public readonly requestId: Uint256;
  public readonly shopAddress: EthAddress;

  constructor(requestId: Uint256, shopAddress: EthAddress) {
    super(`Request ${requestId} does not exist for shop ${shopAddress}`);
    this.requestId = requestId;
    this.shopAddress = shopAddress;
  }
}

/**
 * Error thrown when a request is not confirmed.
 */
export class RequestNotConfirmed extends ChainError {
  public readonly requestId: Uint256;
  public readonly publisher: EthAddress;

  constructor(requestId: Uint256, publisher: EthAddress) {
    super(`Request ${requestId} not confirmed by publisher ${publisher}`);
    this.requestId = requestId;
    this.publisher = publisher;
  }
}

/**
 * Error thrown when the account has changed unexpectedly.
 */
export class AccountChangedException extends ChainError {
  constructor(field: string) {
    super(`Account changed: ${field}`);
  }
}

/**
 * Error thrown when a chain is not implemented.
 */
export class ChainNotImplementedException extends ChainError {
  constructor(chainName: string) {
    super(`Chain not implemented: ${chainName}`);
  }
}

/**
 * Error thrown when metadata upload fails.
 */
export class MetadataUploadFailedException extends ChainError {
  constructor(reason: string) {
    super(`Metadata upload failed: ${reason}`);
  }
}

/**
 * Error thrown when the EVM wallet is not found.
 */
export class WalletNotFoundException extends WalletError {
  constructor() {
    super('EVM Wallet not found');
  }
}

/**
 * Error thrown when MetaMask is not installed.
 */
export class MetaMaskNotFoundException extends WalletError {
  constructor() {
    super('MetaMask is not installed');
  }
}

/**
 * Error thrown when account access is denied by the user.
 */
export class AccountAccessDeniedException extends WalletError {
  constructor() {
    super('Account access request denied by the user');
  }
}

/**
 * Error thrown when no accounts are found in the wallet.
 */
export class NoAccountsFoundException extends WalletError {
  constructor() {
    super('No accounts were found in the wallet');
  }
}

/**
 * Error thrown when the user denies a signature request.
 */
export class SignatureRequestDeniedException extends WalletError {
  constructor() {
    super('Signature request was denied by the user');
  }
}

/**
 * Error thrown when switching chains fails.
 */
export class ChainSwitchException extends WalletError {
  constructor() {
    super('Failed to switch chains');
  }
}

/**
 * Error thrown when the user denies a request.
 */
export class UserDeniedException extends WalletError {
  constructor() {
    super('User denied the request');
  }
}

/**
 * Error thrown when the user's balance is insufficient to cover the transaction cost.
 */
export class InsufficientBalanceException extends WalletError {
  constructor() {
    super('Insufficient balance to cover the transaction cost');
  }
}

/**
 * Error thrown when the user has insufficient token balance.
 */
export class InsufficientTokenBalanceException extends WalletError {
  constructor() {
    super('Insufficient token balance');
  }
}

/**
 * Error thrown when invalid parameters are provided.
 */
export class InvalidParametersException extends ChainError {
  constructor(message: string) {
    super(`Invalid parameters: ${message}`);
  }
}
