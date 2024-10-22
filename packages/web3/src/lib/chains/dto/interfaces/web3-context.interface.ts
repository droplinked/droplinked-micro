import { AxiosInstance } from 'axios';
import { ModalInterface } from './modal-interface.interface';
import { EthAddress } from '../constants/chain-structs';

export interface IWeb3Context {
  modalInterface: ModalInterface;
  axiosInstance: AxiosInstance;
  shopContractAddress?: EthAddress;
  nftContract?: EthAddress;
}
