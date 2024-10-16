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

export class WalletNotFoundException {
  public readonly message: string = '';
  constructor(field: string) {
    this.message = field;
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
