import { ethers } from 'ethers';
import { DroplinkedChainConfig, IWeb3Context } from '../../../web3';
import {
  ITokenDetails,
  TokenStandard,
} from '../../dto/interfaces/airdrop-token.interface';
import { airdropABI } from '../../dto/constants/airdrop-abi';

async function airdrop(
  chainConfig: DroplinkedChainConfig,
  context: IWeb3Context,
  token: ITokenDetails
) {
  const contract = new ethers.Contract(
    token.tokenAddress,
    airdropABI,
    chainConfig.provider
  );
  let tx;
  switch (token.type) {
    case TokenStandard.ERC721:
      tx = await contract['distributeERC721'](
        token.tokenAddress.toString(),
        token.receivers,
        token.amounts
      );
      break;
    case TokenStandard.ERC1155:
      break;
    case TokenStandard.ERC20:
      break;
    default:
      break;
  }

  return tx.hash;
}

export { airdrop };
