import { Chain, ChainWallet } from '../chains';
import { ModalInterface } from '../interfaces/modal-interface.interface';

export type Web3ChainConfig =
  | {
      method: 'login';
      chain: Chain;
      preferredWallet: ChainWallet;
      modalInterface?: ModalInterface;
    }
  | {
      method: 'deploy';
      chain: Chain;
      preferredWallet: ChainWallet;
      modalInterface?: ModalInterface;
      userAddress: string;
    }
  | {
      method: 'record-affiliate';
      chain: Chain;
      preferredWallet: ChainWallet;
      modalInterface?: ModalInterface;
      userAddress: string;
      nftContractAddress: string;
      shopContractAddress: string;
    }
  | {
      method: 'payment';
      chain: Chain;
      preferredWallet: ChainWallet;
      modalInterface?: ModalInterface;
    };
