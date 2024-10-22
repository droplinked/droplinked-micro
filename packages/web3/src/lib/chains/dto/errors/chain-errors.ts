import { EthAddress, Uint256 } from '../constants/chain-structs';

class ChainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChainError';
  }
}

export class AlreadyRequested extends ChainError {
  public readonly requestId: Uint256;
  public readonly publisher: EthAddress;
  constructor(productId: Uint256, requester: EthAddress) {
    super(`Request for ${productId} from ${requester} already exists`);
    this.requestId = productId;
    this.publisher = requester;
  }
}

export class Unauthorized extends ChainError {
  public readonly method: string;
  public readonly from: EthAddress;
  public readonly to: EthAddress;
  constructor(method: string, from: EthAddress, to: EthAddress) {
    super('Unauthorized');
    this.method = method;
    this.from = from;
    this.to = to;
  }
}

export class RequestAlreadyConfirmed extends ChainError {
  public readonly requestId: Uint256;
  public readonly shopAddress: EthAddress;
  constructor(requestId: Uint256, shopAddress: EthAddress) {
    super(`Request ${requestId} already confirmed`);
    this.requestId = requestId;
    this.shopAddress = shopAddress;
  }
}
export class RequestDoesntExist extends ChainError {
  public readonly requestId: Uint256;
  public readonly shopAddress: EthAddress;
  constructor(requestId: Uint256, shopAddress: EthAddress) {
    super(`Request ${requestId} does not exist`);
    this.requestId = requestId;
    this.shopAddress = shopAddress;
  }
}

export class RequestNotConfirmed extends ChainError {
  public readonly requestId: Uint256;
  public readonly publisher: EthAddress;
  constructor(requestId: Uint256, publisher: EthAddress) {
    super(`Request ${requestId} not confirmed`);
    this.requestId = requestId;
    this.publisher = publisher;
  }
}

export class AccountChangedException extends ChainError {
  constructor(field: string) {
    super(`Account changed: ${field}`);
  }
}

export class ChainNotImplementedException extends ChainError {
  constructor(chainName: string) {
    super(`Chain not implemented: ${chainName}`);
  }
}

export class MetadataUploadFailedException extends ChainError {
  constructor(reason: string) {
    super(`Metadata upload failed: ${reason}`);
  }
}

class WalletError extends ChainError {
  constructor(message: string) {
    super(message);
    this.name = 'WalletError';
  }
}

class WalletNotFoundException extends WalletError {
  constructor() {
    super('EVM Wallet not found');
    this.name = 'WalletNotFoundException';
  }
}

class MetaMaskNotFoundException extends WalletError {
  constructor() {
    super('MetaMask is not installed');
    this.name = 'MetaMaskNotFoundException';
  }
}

class AccountAccessDeniedException extends WalletError {
  constructor() {
    super('Account access request denied by the user');
    this.name = 'AccountAccessDeniedException';
  }
}

class NoAccountsFoundException extends WalletError {
  constructor() {
    super('No accounts were found in the wallet');
    this.name = 'NoAccountsFoundException';
  }
}

class SignatureRequestDeniedException extends WalletError {
  constructor() {
    super('Signature request was denied by the user');
    this.name = 'SignatureRequestDeniedException';
  }
}

class ChainSwitchException extends WalletError {
  constructor() {
    super('Failed to switch chains');
    this.name = 'ChainSwitchException';
  }
}

class UserDeniedException extends WalletError {
  constructor() {
    super('User denied the request');
    this.name = 'UserDeniedException';
  }
}

class InsufficientBalanceException extends WalletError {
  constructor() {
    super('Insufficient balance to cover the transaction cost');
    this.name = 'InsufficientBalanceException';
  }
}

class InsufficientTokenBalanceException extends WalletError {
  constructor() {
    super('Insufficient token balance');
    this.name = 'InsufficientTokenBalanceException';
  }
}

class InvalidParametersException extends ChainError {
  constructor(message: string) {
    super(`Invalid parameters: ${message}`);
    this.name = 'InvalidParametersException';
  }
}

export {
  MetaMaskNotFoundException,
  NoAccountsFoundException,
  WalletError,
  AccountAccessDeniedException,
  SignatureRequestDeniedException,
  InsufficientTokenBalanceException,
  InvalidParametersException,
  InsufficientBalanceException,
  WalletNotFoundException,
  ChainSwitchException,
  UserDeniedException,
};
