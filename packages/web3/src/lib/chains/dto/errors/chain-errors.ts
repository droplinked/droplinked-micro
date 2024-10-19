import { EthAddress, Uint256 } from '../constants/chain-structs';

export class AlreadyRequested {
  public readonly message: string = '';
  public readonly requestId: Uint256 = 0;
  public readonly publisher: EthAddress = '';
  constructor(productId: Uint256, requester: EthAddress) {
    this.message = `Request for ${productId} from ${requester} already exists`;
    this.publisher = requester;
    this.requestId = productId;
  }
}

export class Unauthorized {
  public readonly message: string = '';
  public readonly method: string = '';
  public readonly from: EthAddress = '';
  public readonly to: EthAddress = '';
  constructor(method: string, from: EthAddress, to: EthAddress) {
    this.message = 'Unauthorized';
    this.method = method;
    this.from = from;
    this.to = to;
  }
}

export class RequestAlreadyConfirmed {
  public readonly message: string = '';
  public readonly requestId: Uint256 = 0;
  public readonly shopAddress: EthAddress = '';
  constructor(requestId: Uint256, shopAddress: EthAddress) {
    this.message = `Request ${requestId} already confirmed`;
    this.shopAddress = shopAddress;
    this.requestId = requestId;
  }
}

export class RequestDoesntExist {
  public readonly message: string = '';
  public readonly requestId: Uint256 = 0;
  public readonly shopAddress: EthAddress = '';
  constructor(requestId: Uint256, shopAddress: EthAddress) {
    this.message = `Request ${requestId} does not exist`;
    this.shopAddress = shopAddress;
    this.requestId = requestId;
  }
}

export class RequestNotConfirmed {
  public readonly message: string = '';
  public readonly requestId: Uint256 = 0;
  public readonly publisher: EthAddress = '';
  constructor(requestId: Uint256, publisher: EthAddress) {
    this.message = `Request ${requestId} not confirmed`;
    this.publisher = publisher;
    this.requestId = requestId;
  }
}

export class AccountChangedException {
  public readonly message: string = '';
  constructor(field: string) {
    this.message = field;
  }
}

export class ChainNotImplementedException {
  public readonly message: string = '';
  constructor(field: string) {
    this.message = field;
  }
}

export class MetadataUploadFailedException {
  public readonly message: string = '';
  constructor(field: string) {
    this.message = field;
  }
}

class WalletError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WalletError';
  }
}

class WalletNotFoundException extends WalletError {
  constructor(message = 'EVM Wallet not found') {
    super(message);
    this.name = 'WalletNotFoundException';
  }
}

class MetaMaskNotFoundException extends WalletError {
  constructor(message = 'MetaMask is not installed') {
    super(message);
    this.name = 'MetaMaskNotFoundException';
  }
}

class AccountAccessDeniedException extends WalletError {
  constructor(message = 'Account access request denied by the user') {
    super(message);
    this.name = 'AccountAccessDeniedException';
  }
}

class NoAccountsFoundException extends WalletError {
  constructor(message = 'No accounts were found in the wallet') {
    super(message);
    this.name = 'NoAccountsFoundException';
  }
}

class SignatureRequestDeniedException extends WalletError {
  constructor(message = 'Signature request was denied by the user') {
    super(message);
    this.name = 'SignatureRequestDeniedException';
  }
}

class ChainSwitchException extends WalletError {
  constructor(message = 'Failed to switch chains') {
    super(message);
    this.name = 'ChainSwitchException';
  }
}

class UserDeniedException extends WalletError {
  constructor(message = 'User denied the request') {
    super(message);
    this.name = 'UserDeniedException';
  }
}

export {
  MetaMaskNotFoundException,
  NoAccountsFoundException,
  WalletError,
  AccountAccessDeniedException,
  SignatureRequestDeniedException,
  WalletNotFoundException,
  ChainSwitchException,
  UserDeniedException,
};
