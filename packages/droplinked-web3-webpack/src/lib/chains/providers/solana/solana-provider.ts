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
  IChainPayment,
} from '../../../web3';
import { ChainWallet, Network } from '../../dto/chains';
import { IChainProvider } from '../../dto/interfaces/chain-provider.interface';
import { ILoginResult } from '../../dto/interfaces/login-result.interface';
import { IPaymentInputs } from '../../dto/interfaces/payment-interface';
import { getCartData, getNonce } from '../evm/evm.helpers';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { base58 } from 'ethers/lib/utils';
import { BigNumber, ethers } from 'ethers';
import { ClaimNFTInputs } from '../../dto/interfaces/claim-nft-inputs';
export class SolanaProvider implements IChainProvider {
  axiosInstance: KyInstance;
  network: Network;
  address: string;
  modalInterface: ModalInterface = new defaultModal();
  wallet: ChainWallet = ChainWallet.Phantom;
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
  }
  customPayment(
    data: IChainPayment
  ): Promise<{ transactionHash: string; cryptoAmount: any }> {
    throw new Error('Method not implemented.');
  }
  unstoppableLogin(clientID: string, redirectUri: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  claimNFTs(data: ClaimNFTInputs): Promise<string> {
    throw new Error('Method not implemented.');
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
    const signedMessage = base58.encode(
      (await provider.signMessage(encodedMessage, 'utf8')).signature
    );
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
  async payment(
    data: IPaymentInputs
  ): Promise<{ transactionHash: string; cryptoAmount: any; orderID: string }> {
    const { paymentData, orderID } = await getCartData(
      data.cartID,
      data.paymentToken,
      data.paymentType,
      this.address,
      this.axiosInstance
    );
    const { tbdReceivers, tbdValues, totalPrice, tokenAddress } = paymentData;
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
          ? 'https://multi-greatest-voice.solana-mainnet.quiknode.pro/908c9dd72998ac69ec2205d5cdb2eccd654dfd0b'
          : clusterApiUrl('devnet')
      );
      const mintPublicKey = new PublicKey(tokenAddress as string);

      const mintToken = new Token(
        connection,
        mintPublicKey,
        TOKEN_PROGRAM_ID,
        provider // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
      );
      console.log({ tbdReceivers: tbdReceivers, tbdValues: tbdValues });
      const recipientPublicKeys = tbdReceivers.map(
        (recipient) => new PublicKey(recipient)
      );
      console.log({ recipientPublicKeys });

      const associatedDestinationTokenAddrs = recipientPublicKeys.map(
        (recipientPublicKey) =>
          Token.getAssociatedTokenAddress(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            recipientPublicKey
          )
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

      const receiverAccounts = await Promise.all(
        associatedDestinationTokenAddrs.map(
          async (associatedDestinationTokenAddr) =>
            connection.getAccountInfo(await associatedDestinationTokenAddr)
        )
      );

      const instructions: TransactionInstruction[] = [];

      for (let i = 0; i < receiverAccounts.length; i++) {
        const receiverAccount = receiverAccounts[i];
        if (receiverAccount === null) {
          instructions.push(
            Token.createAssociatedTokenAccountInstruction(
              mintToken.associatedProgramId,
              mintToken.programId,
              mintPublicKey,
              await associatedDestinationTokenAddrs[i],
              recipientPublicKeys[i],
              senderPublicKey
            )
          );
        }
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
      for (let i = 0; i < associatedDestinationTokenAddrs.length; i++) {
        instructions.push(
          Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            associatedFromTokenAddr,
            await associatedDestinationTokenAddrs[i],
            senderPublicKey,
            [],
            ethers.BigNumber.from(tbdValues[i])
              .div(ethers.BigNumber.from(10).pow(13))
              .toNumber()
          )
        );
      }
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
      return {
        transactionHash: transactionSignature,
        cryptoAmount: totalPrice,
        orderID: orderID,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
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
          ? 'https://multi-greatest-voice.solana-mainnet.quiknode.pro/908c9dd72998ac69ec2205d5cdb2eccd654dfd0b'
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
