/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { ContractType } from '../constants/chain-constants';
import { Chain, Network } from '../chains';

export type DroplinkedChainConfig = {
  provider: ethers.providers.Web3Provider | any;
  chain: Chain;
  network: Network;
  contractType: ContractType;
  address: string;
  gasPredictable: boolean;
};
