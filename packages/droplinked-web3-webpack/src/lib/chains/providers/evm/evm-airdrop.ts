/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import {
  DroplinkedChainConfig,
  IWeb3Context,
  ModalInterface,
} from '../../../web3';
import {
  ITokenDetails,
  TokenStandard,
} from '../../dto/interfaces/airdrop-token.interface';
import { airdropABI } from '../../dto/constants/airdrop-abi';
import { checkWallet } from './evm.helpers';
import { getAirdropAddress } from '../../dto/constants/chain-constants';

async function sendTransaction(
  contract: ethers.Contract,
  method: string,
  params: any[],
  chunkIndex: number,
  modalInterface: ModalInterface
) {
  try {
    await contract.callStatic[method](...params);
    const tx = await contract[method](...params);
    return tx;
  } catch (e: any) {
    modalInterface.error(
      `Error simulating ${method} transaction ${chunkIndex + 1}: ${e.message}`
    );
    throw e;
  }
}

async function airdrop(
  chainConfig: DroplinkedChainConfig,
  context: IWeb3Context,
  token: ITokenDetails
) {
  const modalInterface = context.modalInterface;
  const signer = chainConfig.provider.getSigner();
  modalInterface.waiting('Connecting to wallet...');
  await checkWallet(chainConfig.provider, chainConfig.address);
  modalInterface.waiting('Getting airdrop contract address...');
  const airdropContractAddress = await getAirdropAddress(
    chainConfig.chain,
    chainConfig.network
  );
  const contract = new ethers.Contract(
    airdropContractAddress,
    airdropABI,
    signer
  );
  modalInterface.waiting('Initializing airdrop');
  const calculateAmounts = (data: { receiver: string; amount: number }[]) => {
    const receivers: string[] = [];
    const amounts: number[] = [];
    for (const item of data) {
      receivers.push(item.receiver);
      amounts.push(item.amount);
    }
    return { receivers, amounts };
  };
  const splitAirdrop = (
    receivers: string[],
    amounts: number[],
    chunkSize = 300
  ) => {
    const chunks: { receivers: string[]; amounts: number[] }[] = [];
    for (let i = 0; i < receivers.length; i += chunkSize) {
      chunks.push({
        receivers: receivers.slice(i, i + chunkSize),
        amounts: amounts.slice(i, i + chunkSize),
      });
    }
    return chunks;
  };
  try {
    let tx;
    const { receivers, amounts } = calculateAmounts(token.receivers);
    const chunks = splitAirdrop(receivers, amounts);
    const txHashes = [];
    for (const [i, chunk] of chunks.entries()) {
      modalInterface.waiting(
        `Processing transaction ${i + 1} of ${chunks.length}`
      );

      if (token.type === TokenStandard.ERC1155) {
        tx = await sendTransaction(
          contract,
          'distributeERC1155',
          [
            token.tokenAddress,
            token.tokenId,
            chunk.receivers,
            chunk.amounts,
            token.airdropId,
          ],
          i,
          modalInterface
        );
      } else if (token.type === TokenStandard.ERC20) {
        tx = await sendTransaction(
          contract,
          'distributeERC20',
          [token.tokenAddress, chunk.receivers, chunk.amounts, token.airdropId],
          i,
          modalInterface
        );
      } else if (token.type === TokenStandard.ERC721) {
        tx = await sendTransaction(
          contract,
          'distributeERC721',
          [token.tokenAddress, chunk.receivers, chunk.amounts, token.airdropId],
          i,
          modalInterface
        );
      }

      modalInterface.waiting(`Transaction ${i + 1} sent: ${tx.hash}`);
      txHashes.push(tx.hash);
      await tx.wait();
      modalInterface.waiting(`Transaction ${i + 1} confirmed`);
    }
    return { transactionHashes: txHashes };
  } catch (e: any) {
    if (e.code && e.code.toString() === 'ACTION_REJECTED') {
      context.modalInterface.error('Transaction Rejected');
      throw new Error('Transaction Rejected');
    }
    try {
      const err = contract.interface.parseError(e.data);
      context.modalInterface.error(err.name);
      context.modalInterface.error(e);
      throw e;
    } catch (error) {
      context.modalInterface.error(`Unexpected error: ${error}`);
      throw error;
    }
  }
}

export { airdrop };
