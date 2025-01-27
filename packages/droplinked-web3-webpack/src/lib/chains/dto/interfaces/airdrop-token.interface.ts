import { EthAddress } from '../constants/chain-structs';

enum TokenStandard {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  ERC20 = 'ERC20',
}

interface ITokenDetails {
  type: TokenStandard;
  tokenAddress: EthAddress;
  receivers: EthAddress[];
  amounts: number[];
}

export { ITokenDetails, TokenStandard };
