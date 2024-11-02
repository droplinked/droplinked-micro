/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ky, { KyInstance } from 'ky';
import {
  IDeployShop,
  DeployShopResponse,
  IProductDetails,
  ISKUDetails,
  RecordResponse,
  Uint256,
  EthAddress,
  AffiliateRequestData,
  ModalInterface,
  WalletNotFoundException,
  defaultModal,
  toEthAddress,
} from '../../../web3';
import { ChainWallet, Network } from '../../dto/chains';
import { IChainProvider } from '../../dto/interfaces/chain-provider.interface';
import { ILoginResult } from '../../dto/interfaces/login-result.interface';
import { IPaymentInputs } from '../../dto/interfaces/payment-interface';
import { getNonce } from '../evm/evm.helpers';
import { ContractType } from '../../dto/constants/chain-constants';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
export class SolanaProvider implements IChainProvider {
  axiosInstance: KyInstance;
  network: Network;
  address: string;
  modalInterface: ModalInterface = new defaultModal();
  wallet: ChainWallet = ChainWallet.Phantom;
  contractType: ContractType;
  nftContractAddress?: EthAddress;
  shopContractAddress?: EthAddress;

  constructor(network: Network) {
    this.network = network;
    this.axiosInstance = ky.create({
      prefixUrl:
        this.network === Network.MAINNET
          ? 'https://apiv3.droplinked.com'
          : 'https://apiv3dev.droplinked.com',
    });
    this.address = '';
    this.contractType = ContractType.TYPE0;
  }

  setAxiosInstance(axiosInstance: KyInstance): IChainProvider {
    this.axiosInstance = axiosInstance;
    return this;
  }

  async walletLogin(): Promise<ILoginResult> {
    if (!(window as any).solana || !(window as any).solana.isPhantom) {
      window.open('https://phantom.app/', '_blank');
      throw new WalletNotFoundException();
    }
    const provider = (window as any).solana;
    const resp = await provider.connect();
    const nonce = await getNonce(resp.publicKey.toString(), this.axiosInstance);
    const currentDate = new Date().toLocaleString();
    const message = `Welcome to Droplinked!
      
      Please sign this message to verify your identity and securely log in.
      
      - Nonce: ${nonce}
      - Date: ${currentDate}
      
      This action will not incur any gas fees or blockchain transactions.`;

    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await provider.signMessage(encodedMessage, 'utf8');
    return {
      address: resp.publicKey.toString(),
      signature: signedMessage,
      nonce: nonce,
      date: currentDate,
    };
  }
  deployShop(shopDetails: IDeployShop): Promise<DeployShopResponse> {
    throw new Error('Method not implemented.');
  }
  recordProduct(
    productData: IProductDetails,
    skuData: ISKUDetails[]
  ): Promise<RecordResponse> {
    throw new Error('Method not implemented.');
  }
  publishRequest(
    productId: Uint256,
    shopAddress: EthAddress
  ): Promise<AffiliateRequestData> {
    throw new Error('Method not implemented.');
  }
  approveRequest(requestId: Uint256, shopAddress: EthAddress): Promise<string> {
    throw new Error('Method not implemented.');
  }
  disapproveRequest(
    requestId: Uint256,
    shopAddress: EthAddress
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }
  payment(
    data: IPaymentInputs
  ): Promise<{ transactionHash: string; cryptoAmount: any; orderID: string }> {
    throw new Error('Method not implemented.');
  }
  async paymentWithToken(
    receiver: string,
    amount: number,
    tokenAddress: string
  ): Promise<string> {
    // Check if Phantom is available in the user's browser
    if (!(window as any).solana || !(window as any).solana.isPhantom) {
      window.open('https://phantom.app/', '_blank');
      throw new WalletNotFoundException();
    }
    try {
      const provider = (window as any).solana;
      await provider.connect();
      const senderPublicKey = provider.publicKey;
      const connection = new Connection(
        this.network === Network.MAINNET
          ? 'https://little-withered-rain.solana-mainnet.quiknode.pro/4c55253145da61029f48dea8ca5d66c685b64408/'
          : clusterApiUrl('devnet')
      );
      const mintPublicKey = new PublicKey(tokenAddress);
      const recipientPublicKey = new PublicKey(receiver);

      const mintToken = new Token(
        connection,
        mintPublicKey,
        TOKEN_PROGRAM_ID,
        provider // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
      );

      const associatedDestinationTokenAddr =
        await Token.getAssociatedTokenAddress(
          mintToken.associatedProgramId,
          mintToken.programId,
          mintPublicKey,
          recipientPublicKey
        );
      const associatedFromTokenAddr = await Token.getAssociatedTokenAddress(
        mintToken.associatedProgramId,
        mintToken.programId,
        mintPublicKey,
        senderPublicKey
      );
      const fromTokenAccount = await connection.getAccountInfo(
        associatedFromTokenAddr
      );

      const receiverAccount = await connection.getAccountInfo(
        associatedDestinationTokenAddr
      );
      const instructions: TransactionInstruction[] = [];

      if (receiverAccount === null) {
        instructions.push(
          Token.createAssociatedTokenAccountInstruction(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            associatedDestinationTokenAddr,
            recipientPublicKey,
            senderPublicKey
          )
        );
      }

      if (fromTokenAccount === null) {
        instructions.push(
          Token.createAssociatedTokenAccountInstruction(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            associatedFromTokenAddr,
            senderPublicKey,
            senderPublicKey
          )
        );
      }
      instructions.push(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          associatedFromTokenAddr,
          associatedDestinationTokenAddr,
          senderPublicKey,
          [],
          Math.floor(amount * 1e9)
        )
      );
      const transaction = new Transaction().add(...instructions);
      transaction.feePayer = senderPublicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      const signedTransaction = await provider.signTransaction(transaction);
      const transactionSignature = await connection.sendRawTransaction(
        signedTransaction.serialize(),
        { skipPreflight: true }
      );
      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: transactionSignature,
      });
      const delay = (delayInms: number) => {
        return new Promise((resolve) => setTimeout(resolve, delayInms));
      };

      while (true) {
        await delay(1500);
        console.log('Checking transaction status...');
        try {
          if (await connection.getParsedTransaction(transactionSignature))
            break;
        } catch (e) {
          console.log(e);
        }
      }
      await delay(1000);
      return transactionSignature;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  setAddress(address: EthAddress): IChainProvider {
    this.address = address;
    return this;
  }
  setWallet(wallet: ChainWallet): IChainProvider {
    this.wallet = wallet;
    return this;
  }
  setModal(modal: ModalInterface): IChainProvider {
    this.modalInterface = modal;
    return this;
  }
  setNFTContractAddress(address: string): IChainProvider {
    this.nftContractAddress = toEthAddress(address);
    return this;
  }
  setShopContractAddress(address: string): IChainProvider {
    this.shopContractAddress = toEthAddress(address);
    return this;
  }
  getPaymentData(cartID: string, paymentType: string, token: string) {
    throw new Error('Method not implemented.');
  }
}
