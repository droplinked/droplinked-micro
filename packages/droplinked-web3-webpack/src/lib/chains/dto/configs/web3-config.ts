import { Chain, Wallets } from '../chains';
import { ModalInterface } from '../interfaces/modal-interface.interface';

export enum Web3Actions {
  LOGIN = 'LOGIN',
  DEPLOY = 'DEPLOY',
  RECORD_AFFILIATE = 'RECORD_AFFILIATE',
  PAYMENT = 'PAYMENT',
  CLAIM = 'CLAIM',
  AIRDROP = 'AIRDROP',
}

export type Web3ChainConfig =
  | {
      method: Web3Actions.LOGIN;
      preferredWallet: Wallets;
      modalInterface?: ModalInterface;
    }
  | {
      method: Web3Actions.DEPLOY;
      chain: Chain;
      preferredWallet: Wallets;
      modalInterface?: ModalInterface;
      userAddress: string;
    }
  | {
      method: Web3Actions.RECORD_AFFILIATE;
      chain: Chain;
      preferredWallet: Wallets;
      modalInterface?: ModalInterface;
      userAddress: string;
      nftContractAddress: string;
      shopContractAddress: string;
    }
  | {
      method: Web3Actions.PAYMENT;
      chain: Chain;
      userAddress: string;
      preferredWallet: Wallets;
      modalInterface?: ModalInterface;
    }
  | {
      method: Web3Actions.CLAIM;
      chain: Chain;
      userAddress: string;
      preferredWallet: Wallets;
      shopContractAddress: string;
      modalInterface?: ModalInterface;
    }
  | {
      method: Web3Actions.AIRDROP;
      chain: Chain;
      userAddress: string;
      preferredWallet: Wallets;
      modalInterface?: ModalInterface;
    };
