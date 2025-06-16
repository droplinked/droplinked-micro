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
import { encodeBase58, decodeBase58 } from 'ethers';
import { ethers } from 'ethers';
import { ClaimNFTInputs } from '../../dto/interfaces/claim-nft-inputs';
import { ITokenDetails } from '../../dto/interfaces/airdrop-token.interface';
import { AppKit } from '@reown/appkit';

/**
 * Interface defining the shape of a Solana wallet provider
 * Extends to include both wallet provider methods and properties needed by the Signer interface
 */
interface SolanaWalletProvider {
  isPhantom?: boolean;
  publicKey: PublicKey;
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signMessage: (message: Uint8Array, encoding: string) => Promise<{ signature: Uint8Array }>;
  // The following are needed to satisfy the Signer interface requirements
  secretKey?: Uint8Array;
}

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

  modal?: AppKit;

  private activeWalletOperation: { reject?: (reason: Error) => void } = {};


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
  setWalletModal(modal: AppKit) {
    this.modal = modal;
    return this;
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
    // Get Solana provider using our new method
    const provider = await this.getSolanaProvider();
    
    // Connect to the provider
    const resp = await provider.connect();
    const publicKey = resp.publicKey.toString();
    
    // Get nonce for signing
    const nonce = await getNonce(publicKey, this.axiosInstance);
    const currentDate = new Date().toLocaleString();
    
    // Create message to sign
    const message = `Welcome to Droplinked! Please sign this message to verify your ownership over your wallet and log in. - Nonce: ${nonce} - Date: ${currentDate}`;
    const encodedMessage = new TextEncoder().encode(message);
    
    // Sign the message
    const signedMessage = encodeBase58(
      (await provider.signMessage(encodedMessage, 'utf8')).signature
    );
    
    // Set address and return login result
    this.address = publicKey;
    return {
      address: publicKey,
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

      // Get Solana provider using our new method
      const provider = await this.getSolanaProvider();
      
      // Connect to provider and establish Solana connection
      const resp = await provider.connect();
      const senderPublicKey = resp.publicKey;
      const connection = this.getConnection();

      // Initialize token instance - use as-any assertion for the provider since Token expects a specific type
      const mintPublicKey = new PublicKey(tokenAddress as string);
      const mintToken = new Token(
        connection,
        mintPublicKey,
        TOKEN_PROGRAM_ID,
        provider as any
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

      function bigPow(base: bigint, exp: number): bigint {
        let result = BigInt(1);
        for (let i = 0; i < exp; i++) {
          result *= base;
        }
        return result;
      }

      // Add transfer instructions for each recipient
      for (let i = 0; i < associatedDestinationTokenAddrs.length; i++) {
        const divisor = bigPow(BigInt(10), 18 - decimals);
        const transferAmount = Number(BigInt(tbdValues[i]) / divisor);

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
      // Get Solana provider using our new method
      const provider = await this.getSolanaProvider();
      
      // Connect to provider and establish Solana connection
      const resp = await provider.connect();
      const senderPublicKey = resp.publicKey;
      const connection = this.getConnection();

      // Initialize token details - use as-any assertion for the provider
      const mintPublicKey = new PublicKey(tokenAddress);
      const recipientPublicKey = new PublicKey(receiver);
      const mintToken = new Token(
        connection,
        mintPublicKey,
        TOKEN_PROGRAM_ID,
        provider as any
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

  /**
   * Disconnects the currently connected wallet
   * 
   * @returns Promise resolving to true if disconnection was successful, false otherwise
   */
  async disconnect(): Promise<boolean> {
    try {
      if (this.modal) {
        // Use AppKit to disconnect
        const existing = this.modal?.getProvider?.('solana');
        if (existing) {
          this.modalInterface.waiting('Disconnecting Solana wallet...');
          await this.modal?.disconnect('solana');
          this.address = '';
          this.modalInterface.success('Wallet disconnected successfully');
          return true;
        } else {
          this.modalInterface.success('No wallet connection to disconnect');
          return true;
        }
      } else if ((window as any).solana && (window as any).solana.isPhantom) {
        // Fall back to direct Phantom disconnect if AppKit not available
        this.modalInterface.waiting('Disconnecting Phantom wallet...');
        await (window as any).solana.disconnect();
        this.address = '';
        this.modalInterface.success('Wallet disconnected successfully');
        return true;
      } else {
        this.modalInterface.success('No wallet connection to disconnect');
        return true;
      }
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
      this.modalInterface.error('Failed to disconnect wallet');
      return false;
    }
  }

  /**
   * Gets or establishes a connection with a Solana wallet
   * Uses official AppKit methods to track state and handle cancellation when available,
   * or falls back to window.solana (Phantom) when not
   * 
   * @returns Promise that resolves to a Solana wallet provider
   * @throws Error if wallet connection fails
   */
  async getSolanaProvider(): Promise<SolanaWalletProvider> {
    try {
      // Check for existing provider first
      const existing = this.modal?.getProvider?.('solana');
      if (existing && typeof existing === 'object' && existing !== null) {
        try {
          if ('isPhantom' in existing || 'connect' in existing) {
            // Type assertion to tell TypeScript this object has a connect method
            const phantomProvider = existing as { connect: () => Promise<{ publicKey: any }> };
            const accounts = await phantomProvider.connect();
            if (accounts && accounts.publicKey) {
              return existing as unknown as SolanaWalletProvider;
            }
          }
        } catch (err) {
          console.log("Error with existing provider, will reconnect:", err);
        }
      }

      // Disconnect any existing connection
      let provider = this.modal?.getProvider?.('solana');
      while (provider) {
        try {
          await this.modal?.disconnect('solana');
        } catch (err) {
          console.log("Error disconnecting:", err);
        }
        provider = this.modal?.getProvider?.('solana');
      }

      // If modal is not available, fall back to window.solana
      if (!this.modal) {
        // Check if Phantom is available in the browser
        if (!(window as any).solana || !(window as any).solana.isPhantom) {
          window.open('https://phantom.app/', '_blank');
          throw new WalletNotFoundException();
        }
        return (window as any).solana as SolanaWalletProvider;
      }

      console.log("Opening wallet connection modal...");

      return new Promise<SolanaWalletProvider>((resolve, reject) => {
        // Track if we've already handled this connection attempt
        let isHandled = false;
        // Track if a provider has been detected (critical for avoiding race conditions)
        let providerDetected = false;
        // Track whether the modal has been fully opened
        let modalFullyOpened = false;

        // Store reject function for external cancellation
        this.activeWalletOperation.reject = (reason) => {
          if (!isHandled) {
            isHandled = true;

            // Clean up subscriptions
            if (typeof providerUnsubscribe === 'function') {
              providerUnsubscribe();
            }
            if (typeof stateUnsubscribe === 'function') {
              stateUnsubscribe();
            }

            reject(reason instanceof Error ? reason : new Error(String(reason)));
          }
        };

        // Track provider changes (most important for detecting successful connection)
        const providerUnsubscribe = this.modal?.subscribeProviders?.((state: any) => {
          const provider = state["solana"];

          if (provider && !isHandled) {
            // Mark that we detected a provider IMMEDIATELY
            // This prevents race conditions with modal closure
            providerDetected = true;
            console.log("Provider detected, checking connection...");

            (async () => {
              try {
                // Verify provider is valid by checking connection
                // Type assertion for the Solana provider
                const phantomProvider = provider as { connect: () => Promise<{ publicKey: any }> };
                const resp = await phantomProvider.connect();

                if (resp && resp.publicKey) {
                  console.log("Provider connected successfully:", resp.publicKey.toString());

                  // Clean up subscriptions
                  if (typeof providerUnsubscribe === 'function') {
                    providerUnsubscribe();
                  }
                  if (typeof stateUnsubscribe === 'function') {
                    stateUnsubscribe();
                  }

                  isHandled = true;
                  this.activeWalletOperation = {};

                  resolve(provider as unknown as SolanaWalletProvider);
                }
              } catch (err) {
                console.warn("Error validating provider:", err);
                providerDetected = false; // Reset if validation fails
              }
            })();
          }
        });

        // Track modal state to detect when it's closed by the user
        const stateUnsubscribe = this.modal?.subscribeState?.((state) => {
          const isInitialized = state.initialized === true;

          // First detect when the modal is fully open
          if (isInitialized && state.open === true && !modalFullyOpened) {
            modalFullyOpened = true;
            console.log("Modal is now fully open");
          }

          // Only treat closure as user cancellation if the modal was fully opened first
          // This prevents false "user closed" detection during initial setup
          if (isInitialized && state.open === false && modalFullyOpened && !isHandled) {
            // CRITICAL: Check directly if a provider exists right now
            // This is more reliable than waiting for the subscription
            const currentProvider = this.modal?.getProvider?.('solana');
            console.log("Modal closing, checking for provider:", !!currentProvider);

            // Only treat as cancellation if no provider exists
            if (!currentProvider && !providerDetected) {
              console.log("Modal was closed without connecting");

              // Clean up subscriptions
              if (typeof providerUnsubscribe === 'function') {
                providerUnsubscribe();
              }
              if (typeof stateUnsubscribe === 'function') {
                stateUnsubscribe();
              }

              isHandled = true;
              this.activeWalletOperation = {};

              reject(new Error("Wallet connection canceled by user"));
            } else if (currentProvider && !isHandled) {
              // We have a provider but haven't processed it via subscription yet
              // Let's handle it directly to avoid race conditions
              console.log("Provider found during modal close, handling directly");

              (async () => {
                try {
                  // Type assertion for the Solana provider
                  const phantomProvider = currentProvider as { connect: () => Promise<{ publicKey: any }> };
                  // Verify provider is valid by checking connection
                  const resp = await phantomProvider.connect();

                  if (resp && resp.publicKey) {
                    console.log("Provider connected successfully (direct check):", resp.publicKey.toString());

                    // Clean up subscriptions
                    if (typeof providerUnsubscribe === 'function') {
                      providerUnsubscribe();
                    }
                    if (typeof stateUnsubscribe === 'function') {
                      stateUnsubscribe();
                    }

                    isHandled = true;
                    this.activeWalletOperation = {};

                    resolve(currentProvider as unknown as SolanaWalletProvider);
                  }
                } catch (err) {
                  console.warn("Error validating provider during modal close:", err);
                  // If validation fails, let the operation continue
                  // The provider subscription might still handle it
                }
              })();
            }
          }
        });

        // Add 250ms delay before opening the modal
        // This helps avoid initialization race conditions
        setTimeout(() => {
          // Open the modal
          if (this.modal && this.modal.open && !isHandled) {
            this.modal.open({ namespace: 'solana', view: 'AllWallets' })
              .catch(err => {
                if (!isHandled) {
                  // Clean up subscriptions
                  if (typeof providerUnsubscribe === 'function') {
                    providerUnsubscribe();
                  }
                  if (typeof stateUnsubscribe === 'function') {
                    stateUnsubscribe();
                  }

                  isHandled = true;
                  this.activeWalletOperation = {};

                  reject(new Error(`Failed to open wallet modal: ${err.message}`));
                }
              });
          }
        }, 250);
      });
    } catch (error) {
      console.error("Wallet connection error:", error);
      this.activeWalletOperation = {};

      throw error instanceof Error ? error : new Error(String(error));
    }
  }
}
