import { EthAddress } from '../constants/chain-structs';

enum TokenStandard {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  ERC20 = 'ERC20',
}

type ITokenDetails =
  | {
      type: TokenStandard.ERC721;
      tokenAddress: EthAddress;
      receivers: { receiver: string; amount: number }[];
      airdropId: string;
      chunkSize?: number;
    }
  | {
      type: TokenStandard.ERC1155;
      tokenAddress: EthAddress;
      tokenId: number;
      receivers: { receiver: string; amount: number }[];
      airdropId: string;
      chunkSize?: number;
    }
  | {
      type: TokenStandard.ERC20;
      tokenAddress: EthAddress;
      receivers: { receiver: string; amount: number }[];
      airdropId: string;
      chunkSize?: number;
    };

export { ITokenDetails, TokenStandard };
