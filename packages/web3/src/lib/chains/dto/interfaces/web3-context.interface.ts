import { AxiosInstance } from 'axios';
import { ModalInterface } from './modal-interface.interface';

export interface IWeb3Context {
  modalInterface: ModalInterface;
  axiosInstance: AxiosInstance;
  shopContractAddress?: string;
  nftContract?: string;
}
