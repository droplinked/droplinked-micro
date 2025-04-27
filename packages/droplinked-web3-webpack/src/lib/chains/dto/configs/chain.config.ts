/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { Chain, Network } from '../chains';
import { EthAddress } from '../constants/chain-structs';

export type DroplinkedChainConfig = {
  provider: ethers.BrowserProvider;
  chain: Chain;
  network: Network;
  address: EthAddress;
  gasPredictable: boolean;
};
