import { ModalInterface } from './modal-interface.interface';
import { EthAddress } from '../constants/chain-structs';
import { KyInstance } from 'ky';

export interface IWeb3Context {
  modalInterface: ModalInterface;
  axiosInstance: KyInstance;
  shopContractAddress?: EthAddress;
  nftContract?: EthAddress;
}
