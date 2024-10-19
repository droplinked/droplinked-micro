import { Chain, ChainWallet, Network } from '../chains';
import { ModalInterface } from '../interfaces/modal-interface.interface';

export type Web3ChainConfig = {
  chain: Chain;
  network: Network;
  preferredWallet: ChainWallet;
  modalInterface?: ModalInterface;
  userAddress?: string;
  nftContractAddress?: string;
  shopContractAddress?: string;
};
