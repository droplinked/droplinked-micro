import { Chain, ChainWallet } from '../chains';
import { ModalInterface } from '../interfaces/modal-interface.interface';

export enum Web3Actions {
  LOGIN,
  DEPLOY,
  RECORD_AFFILIATE,
  PAYMENT,
}

export type Web3ChainConfig =
  | {
      method: Web3Actions.LOGIN;
      chain: Chain;
      preferredWallet: ChainWallet;
      modalInterface?: ModalInterface;
    }
  | {
      method: Web3Actions.DEPLOY;
      chain: Chain;
      preferredWallet: ChainWallet;
      modalInterface?: ModalInterface;
      userAddress: string;
    }
  | {
      method: Web3Actions.RECORD_AFFILIATE;
      chain: Chain;
      preferredWallet: ChainWallet;
      modalInterface?: ModalInterface;
      userAddress: string;
      nftContractAddress: string;
      shopContractAddress: string;
    }
  | {
      method: Web3Actions.PAYMENT;
      chain: Chain;
      userAddress: string;
      preferredWallet: ChainWallet;
      modalInterface?: ModalInterface;
    };
