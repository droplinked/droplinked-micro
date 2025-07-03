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
import { ITokenDetails } from '../../dto/interfaces/airdrop-token.interface';

/**
 * SolanaProvider implements the IChainProvider interface for Solana blockchain
 * Handles interactions with Solana blockchain including payments, token transfers,
 * and wallet management primarily through the Phantom wallet
 */
export class SolanaProvider implements IChainProvider {
  /** HTTP client instance for API calls */
  axiosInstance: KyInstance;
  
  /** Network type (MAINNET or TESTNET) */
  network: Network;
  
  /** Connected wallet address */
  address: string;
  
  /** Interface for modal dialogues and user interactions */
  modalInterface: ModalInterface = new defaultModal();
  
  /** Type of wallet to use, defaults to Phantom */
  wallet: ChainWallet = ChainWallet.Phantom;
  
  /** Optional NFT contract address */
  nftContractAddress?: EthAddress;
  
  /** Optional shop contract address */
  shopContractAddress?: EthAddress;

  /**
   * Creates a new SolanaProvider instance
   * 
   * @param network - Network type (MAINNET or TESTNET)
   */
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

  /**
   * Execute an airdrop operation for tokens
   * 
   * @param airdropId - Identifier for the airdrop
   * @returns Promise with transaction hashes
   * @throws {Error} Method not implemented yet
   */
  executeAirdrop(airdropId: string): Promise<{ transactionHashes: string[] }> {
    throw new Error('Method not implemented.');
  }

  /**
   * Processes a custom payment transaction
   * 
   * @param data - Chain payment data
   * @returns Promise with transaction details
   * @throws {Error} Method not implemented yet
   */
  customPayment(
    data: IChainPayment
  ): Promise<{ transactionHash: string; cryptoAmount: any }> {
    throw new Error('Method not implemented.');
  }

  /**
   * Login using Unstoppable Domains
   * 
   * @param clientID - Client ID for Unstoppable Domains
   * @param redirectUri - Redirect URI after authentication
   * @returns Promise with login result
   * @throws {Error} Method not implemented yet
   */
  unstoppableLogin(clientID: string, redirectUri: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  /**
   * Claim NFTs from a specific source
   * 
   * @param data - NFT claim inputs
   * @returns Promise with transaction hash
   * @throws {Error} Method not implemented yet
   */
  claimNFTs(data: ClaimNFTInputs): Promise<string> {
    throw new Error('Method not implemented.');
  }

  /**
   * Sets the HTTP client instance for API calls
   * 
   * @param axiosInstance - The HTTP client instance
   * @returns This provider instance (for method chaining)
   */
  setAxiosInstance(axiosInstance: KyInstance): IChainProvider {
    this.axiosInstance = axiosInstance;
    return this;
  }

  /**
   * Authenticates user with Phantom wallet
   * Prompts user to connect wallet and sign a message to verify ownership
   * 
   * @returns Promise with login result containing address, signature, nonce, and date
   * @throws {WalletNotFoundException} If Phantom wallet is not installed
   */
  async walletLogin(): Promise<ILoginResult> {
    if (!(window as any).solana || !(window as any).solana.isPhantom) {
      window.open('https://phantom.app/', '_blank');
      throw new WalletNotFoundException();
    }
    const provider = (window as any).solana;
    const resp = await provider.connect();
    const nonce = await getNonce(resp.publicKey.toString(), this.axiosInstance);
    const currentDate = new Date().toLocaleString();
    const message = `Welcome to Droplinked! Please sign this message to verify your ownership over your wallet and log in. - Nonce: ${nonce} - Date: ${currentDate}`;
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

  /**
   * Deploys a new shop on the blockchain
   * 
   * @param shopDetails - Shop details to deploy
   * @returns Promise with deployment response
   * @throws {Error} Method not implemented yet
   */
  deployShop(shopDetails: IDeployShop): Promise<DeployShopResponse> {
    throw new Error('Method not implemented.');
  }

  /**
   * Records a product on the blockchain
   * 
   * @param productData - Product details
   * @param skuData - SKU information array
   * @returns Promise with record response
   * @throws {Error} Method not implemented yet
   */
  recordProduct(
    productData: IProductDetails,
    skuData: ISKUDetails[]
  ): Promise<RecordResponse> {
    throw new Error('Method not implemented.');
  }

  /**
   * Creates a publish request for a product to an affiliate shop
   * 
   * @param productId - ID of the product
   * @param shopAddress - Address of the shop
   * @returns Promise with affiliate request data
   * @throws {Error} Method not implemented yet
   */
  publishRequest(
    productId: Uint256,
    shopAddress: EthAddress
  ): Promise<AffiliateRequestData> {
    throw new Error('Method not implemented.');
  }

  /**
   * Approves an affiliate request
   * 
   * @param requestId - ID of the request to approve
   * @param shopAddress - Address of the shop
   * @returns Promise with transaction hash
   * @throws {Error} Method not implemented yet
   */
  approveRequest(requestId: Uint256, shopAddress: EthAddress): Promise<string> {
    throw new Error('Method not implemented.');
  }

  /**
   * Disapproves an affiliate request
   * 
   * @param requestId - ID of the request to disapprove
   * @param shopAddress - Address of the shop
   * @returns Promise with transaction hash
   * @throws {Error} Method not implemented yet
   */
  disapproveRequest(
    requestId: Uint256,
    shopAddress: EthAddress
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }
  
  /**
   * Helper function to create a delay (sleep) for a specified time
   * @param ms - Time in milliseconds to delay execution
   * @returns Promise that resolves after the specified delay
   */
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Helper function to check if Phantom wallet is available
   * Opens the Phantom wallet website in a new tab if not installed
   * @throws {WalletNotFoundException} If Phantom wallet is not available
   */
  private checkPhantomWallet(): void {
    if (!(window as any).solana || !(window as any).solana.isPhantom) {
      window.open('https://phantom.app/', '_blank');
      throw new WalletNotFoundException();
    }
  }

  /**
   * Helper function to establish a connection to Solana network
   * @returns {Connection} Solana connection instance
   */
  private getConnection(): Connection {
    return new Connection(
      this.network === Network.MAINNET
        ? 'https://multi-greatest-voice.solana-mainnet.quiknode.pro/908c9dd72998ac69ec2205d5cdb2eccd654dfd0b'
        : clusterApiUrl('devnet')
    );
  }

  /**
   * Helper function to wait for transaction confirmation
   * @param connection - Solana connection instance
   * @param transactionSignature - Transaction signature to wait for
   */
  private async waitForTransactionConfirmation(
    connection: Connection,
    transactionSignature: string
  ): Promise<void> {
    const latestBlockHash = await connection.getLatestBlockhash();
    
    try {
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: transactionSignature,
      });
    } catch (error) {
      console.error('Error confirming transaction:', error);
      throw new Error(`Failed to confirm transaction: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Additional check to ensure transaction is complete
    while (true) {
      await this.delay(1500);
      try {
        if (await connection.getParsedTransaction(transactionSignature)) {
          break;
        }
      } catch (error) {
        console.warn('Error checking transaction status:', error);
      }
    }
    
    // Additional delay to ensure transaction is fully processed
    await this.delay(1000);
  }

  /**
   * Processes a payment transaction for multiple recipients using the specified SPL token
   * 
   * @param data - Payment input data including cartID, paymentToken, and paymentType
   * @returns Object containing transaction hash, crypto amount, and orderID
   * @throws {WalletNotFoundException} If Phantom wallet is not installed
   * @throws {Error} If payment processing fails
   */
  async payment(
    data: IPaymentInputs
  ): Promise<{ transactionHash: string; cryptoAmount: any; orderID: string }> {
    try {
      // Fetch cart data from backend
      const { paymentData, orderID } = await getCartData(
        data.cartID,
        data.paymentToken,
        data.paymentType,
        this.address,
        this.axiosInstance
      );
      const { tbdReceivers, tbdValues, totalPrice, tokenAddress } = paymentData;

      // Verify Phantom wallet is available
      this.checkPhantomWallet();

      // Connect to Phantom and establish Solana connection
      const provider = (window as any).solana;
      await provider.connect();
      const senderPublicKey = provider.publicKey;
      const connection = this.getConnection();
      
      // Initialize token instance
      const mintPublicKey = new PublicKey(tokenAddress as string);
      const mintToken = new Token(
        connection,
        mintPublicKey,
        TOKEN_PROGRAM_ID,
        provider
      );

      const decimals = (await mintToken.getMintInfo()).decimals;

      // Convert receiver addresses to PublicKeys
      const recipientPublicKeys = tbdReceivers.map(
        (recipient) => new PublicKey(recipient)
      );

      // Get associated token accounts for all recipients
      const associatedDestinationTokenAddrs = await Promise.all(
        recipientPublicKeys.map(async (recipientPublicKey) => 
          Token.getAssociatedTokenAddress(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            recipientPublicKey
          )
        )
      );

      // Get sender's associated token account
      const associatedFromTokenAddr = await Token.getAssociatedTokenAddress(
        mintToken.associatedProgramId,
        mintToken.programId,
        mintPublicKey,
        senderPublicKey
      );

      // Check if accounts exist and prepare transaction instructions
      const fromTokenAccount = await connection.getAccountInfo(
        associatedFromTokenAddr
      );

      const receiverAccounts = await Promise.all(
        associatedDestinationTokenAddrs.map(
          async (addr) => connection.getAccountInfo(addr)
        )
      );

      const instructions: TransactionInstruction[] = [];

      // Create recipient accounts if they don't exist
      for (let i = 0; i < receiverAccounts.length; i++) {
        if (receiverAccounts[i] === null) {
          instructions.push(
            Token.createAssociatedTokenAccountInstruction(
              mintToken.associatedProgramId,
              mintToken.programId,
              mintPublicKey,
              associatedDestinationTokenAddrs[i],
              recipientPublicKeys[i],
              senderPublicKey
            )
          );
        }
      }

      // Create sender account if it doesn't exist
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

      // Add transfer instructions for each recipient
      for (let i = 0; i < associatedDestinationTokenAddrs.length; i++) {
        const transferAmount = ethers.BigNumber.from(tbdValues[i])
          .div(ethers.BigNumber.from(10).pow(18-decimals))
          .toNumber();
          
        instructions.push(
          Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            associatedFromTokenAddr,
            associatedDestinationTokenAddrs[i],
            senderPublicKey,
            [],
            transferAmount
          )
        );
      }

      // Build and sign transaction
      const transaction = new Transaction().add(...instructions);
      transaction.feePayer = senderPublicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      
      const signedTransaction = await provider.signTransaction(transaction);
      
      // Send transaction and wait for confirmation
      const transactionSignature = await connection.sendRawTransaction(
        signedTransaction.serialize(),
        { skipPreflight: true }
      );
      
      await this.waitForTransactionConfirmation(connection, transactionSignature);

      return {
        transactionHash: transactionSignature,
        cryptoAmount: totalPrice,
        orderID: orderID,
      };
    } catch (error) {
      console.error('Payment error:', error);
      if (error instanceof WalletNotFoundException) {
        throw error;
      }
      throw new Error(`Payment failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Processes a direct token transfer to a single recipient
   * 
   * @param receiver - Recipient's Solana address
   * @param amount - Amount of tokens to transfer
   * @param tokenAddress - SPL token contract address
   * @returns Transaction signature
   * @throws {WalletNotFoundException} If Phantom wallet is not installed
   * @throws {Error} If token transfer fails
   */
  async paymentWithToken(
    receiver: string,
    amount: number,
    tokenAddress: string
  ): Promise<string> {
    try {
      // Verify Phantom wallet is available
      this.checkPhantomWallet();

      // Connect to Phantom and establish Solana connection
      const provider = (window as any).solana;
      await provider.connect();
      const senderPublicKey = provider.publicKey;
      const connection = this.getConnection();
      
      // Initialize token details
      const mintPublicKey = new PublicKey(tokenAddress);
      const recipientPublicKey = new PublicKey(receiver);
      const mintToken = new Token(
        connection,
        mintPublicKey,
        TOKEN_PROGRAM_ID,
        provider
      );

      const decimals = (await mintToken.getMintInfo()).decimals;

      // Get associated token accounts
      const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
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

      // Check if accounts exist
      const fromTokenAccount = await connection.getAccountInfo(associatedFromTokenAddr);
      const receiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr);
      
      const instructions: TransactionInstruction[] = [];

      // Create recipient account if it doesn't exist
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

      // Create sender account if it doesn't exist
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

      // Calculate transfer amount (with proper decimal handling)
      const transferAmount = Math.floor(amount * 1e9);
      
      // Add transfer instruction
      instructions.push(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          associatedFromTokenAddr,
          associatedDestinationTokenAddr,
          senderPublicKey,
          [],
          transferAmount
        )
      );

      // Build and sign transaction
      const transaction = new Transaction().add(...instructions);
      transaction.feePayer = senderPublicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      
      const signedTransaction = await provider.signTransaction(transaction);
      
      // Send transaction and wait for confirmation
      const transactionSignature = await connection.sendRawTransaction(
        signedTransaction.serialize(),
        { skipPreflight: true }
      );
      
      await this.waitForTransactionConfirmation(connection, transactionSignature);

      return transactionSignature;
    } catch (error) {
      console.error('Token payment error:', error);
      if (error instanceof WalletNotFoundException) {
        throw error;
      }
      throw new Error(`Token transfer failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Sets the connected wallet address
   * 
   * @param address - Ethereum-compatible address
   * @returns This provider instance (for method chaining)
   */
  setAddress(address: EthAddress): IChainProvider {
    this.address = address;
    return this;
  }

  /**
   * Sets the wallet type to use
   * 
   * @param wallet - Wallet type from ChainWallet enum
   * @returns This provider instance (for method chaining)
   */
  setWallet(wallet: ChainWallet): IChainProvider {
    this.wallet = wallet;
    return this;
  }

  /**
   * Sets the modal interface for user interactions
   * 
   * @param modal - Modal interface implementation
   * @returns This provider instance (for method chaining)
   */
  setModal(modal: ModalInterface): IChainProvider {
    this.modalInterface = modal;
    return this;
  }

  /**
   * Sets the NFT contract address
   * 
   * @param address - NFT contract address as string
   * @returns This provider instance (for method chaining)
   */
  setNFTContractAddress(address: string): IChainProvider {
    this.nftContractAddress = toEthAddress(address);
    return this;
  }

  /**
   * Sets the shop contract address
   * 
   * @param address - Shop contract address as string
   * @returns This provider instance (for method chaining)
   */
  setShopContractAddress(address: string): IChainProvider {
    this.shopContractAddress = toEthAddress(address);
    return this;
  }

  /**
   * Retrieves payment data for a cart
   * 
   * @param cartID - ID of the cart
   * @param paymentType - Type of payment
   * @param token - Token address for payment
   * @returns Payment data for the cart
   * @throws {Error} Method not implemented yet
   */
  getPaymentData(cartID: string, paymentType: string, token: string) {
    throw new Error('Method not implemented.');
  }
}
