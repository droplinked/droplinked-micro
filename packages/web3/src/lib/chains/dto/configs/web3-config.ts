import { AxiosInstance } from 'axios';
import { Chain, ChainWallet, Network } from '../chains';
import { ModalInterface } from '../interfaces/modal-interface.interface';

export type Web3Config = {
  chain: Chain;
  network: Network;
  preferredWallet: ChainWallet;
  modalInterface?: ModalInterface;
  userAddress?: string;
  nftContractAddress?: string;
  shopContractAddress?: string;
  axiosInstance: AxiosInstance;
};
