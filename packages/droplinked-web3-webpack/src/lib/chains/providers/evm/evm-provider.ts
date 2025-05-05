/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import {
  AffiliateRequestData,
  DeployShopResponse,
  EthAddress,
  RecordResponse,
  toEthAddress,
  Uint256,
} from '../../dto/constants/chain-structs';
import { Chain, ChainWallet, getGasPrice, Network } from '../../dto/chains';
import {
  ModalInterface,
  defaultModal,
} from '../../dto/interfaces/modal-interface.interface';
import { EVMApproveRequest, EVMDisapproveRequest } from './evm-affiliate';
import { deployEVMShop } from './evm-deploy-shop';
import {
  evmLogin,
  isMetamaskInstalled,
  getAccounts,
  isWalletConnected,
  isChainCorrect,
  changeChain,
  addChain,
} from './evm-login';
import { EVMPublishRequest } from './evm-publish';
import { recordProduct } from './evm-record';
import { getERC20TokenTransferABI } from './evm-constants';
import { ZERO_ADDRESS } from '../../dto/constants/chain-constants';
import { DroplinkedChainConfig } from '../../dto/configs/chain.config';
import {
  IProductDetails,
  ISKUDetails,
} from '../../dto/interfaces/record-web3-product.interface';
import { WalletNotFoundException, TransactionRejectedError, ChainConnectionError } from '../../dto/errors/chain-errors';
import { IWeb3Context } from '../../dto/interfaces/web3-context.interface';
import { IChainProvider } from '../../dto/interfaces/chain-provider.interface';
import { IDeployShop } from '../../dto/interfaces/deploy-shop.interface';
import { getAirdropData, getCartData } from './evm.helpers';
import { IChainPayment } from '../../dto/interfaces/chain-payment.interface';
import { droplinked_payment } from './evm-payments';
import { ILoginResult } from '../../dto/interfaces/login-result.interface';
import { IPaymentInputs } from '../../dto/interfaces/payment-interface';
import ky, { KyInstance } from 'ky';
import { ClaimNFTInputs } from '../../dto/interfaces/claim-nft-inputs';
import { claimNFT } from './evm-claim-nfts';
import { airdrop } from './evm-airdrop';
import { TokenStandard } from '../../dto/interfaces/airdrop-token.interface';
import { AppKit } from "@reown/appkit";

/**
 * EVMProvider implements IChainProvider for EVM-compatible blockchains
 * Handles wallet connections, contract interactions, and blockchain operations
 */
export class EVMProvider implements IChainProvider {
  /** Target blockchain (e.g., Ethereum, Binance) */
  chain: Chain = Chain.BINANCE;
  
  /** Network type (Mainnet or Testnet) */
  network: Network = Network.TESTNET;
  
  /** Connected wallet address */
  address: EthAddress;
  
  /** Interface for user interactions */
  modalInterface: ModalInterface = new defaultModal();
  
  /** Wallet type to use */
  wallet: ChainWallet = ChainWallet.Metamask;
  
  /** HTTP client for API calls */
  axiosInstance: KyInstance;
  
  /** NFT contract address */
  nftContractAddress?: EthAddress;
  
  /** Shop contract address */
  shopContractAddress?: EthAddress;
  
  /** Whether gas is predictable on this chain */
  gasPredictable: boolean;
  
  /** Modern wallet modal interface */
  modal?: AppKit;

  /** Current active wallet operation that can be canceled */
  private activeWalletOperation: { reject?: (reason: Error) => void } = {};

  /**
   * Creates a new EVMProvider instance
   * @param _chain - Target blockchain
   * @param _network - Network type (mainnet/testnet)
   * @param gasPredictable - Whether gas is predictable
   */
  constructor(_chain: Chain, _network: Network, gasPredictable: boolean) {
    this.chain = _chain;
    this.network = _network;
    this.gasPredictable = gasPredictable;
    this.address = ZERO_ADDRESS;
    this.axiosInstance = ky.create({
      prefixUrl:
        this.network === Network.MAINNET
          ? 'https://apiv3.droplinked.com'
          : 'https://apiv3dev.droplinked.com',
    });
  }

  // ==============================
  // CONFIGURATION METHODS
  // ==============================

  /**
   * Sets the HTTP client for API calls
   * @param axiosInstance - HTTP client instance
   * @returns This provider instance (for method chaining)
   */
  setAxiosInstance(axiosInstance: KyInstance): this {
    this.axiosInstance = axiosInstance;
    return this;
  }

  /**
   * Sets the modern wallet modal interface
   * @param modal - AppKit instance
   * @returns This provider instance (for method chaining)
   */
  setWalletModal(modal: AppKit): this {
    this.modal = modal;
    return this;
  }

  /**
   * Sets the NFT contract address
   * @param address - NFT contract address
   * @returns This provider instance (for method chaining)
   */
  setNFTContractAddress(address: string): this {
    this.nftContractAddress = toEthAddress(address);
    return this;
  }

  /**
   * Sets the shop contract address
   * @param address - Shop contract address
   * @returns This provider instance (for method chaining)
   */
  setShopContractAddress(address: string): this {
    this.shopContractAddress = toEthAddress(address);
    return this;
  }

  /**
   * Sets the wallet type to use
   * @param wallet - Wallet type
   * @returns This provider instance (for method chaining)
   */
  setWallet(wallet: ChainWallet): this {
    this.wallet = wallet;
    return this;
  }

  /**
   * Sets the modal interface for user interactions
   * @param modal - Modal interface
   * @returns This provider instance (for method chaining)
   */
  setModal(modal: ModalInterface): this {
    this.modalInterface = modal;
    return this;
  }

  /**
   * Sets the connected wallet address
   * @param address - Wallet address
   * @returns This provider instance (for method chaining)
   */
  setAddress(address: string): this {
    this.address = toEthAddress(address);
    return this;
  }

  // ==============================
  // CONNECTION MANAGEMENT METHODS
  // ==============================

  /**
   * Gets or establishes a connection with the wallet
   * Uses official AppKit methods to track state and handle cancellation
   */
  async getEthersProvider(): Promise<ethers.BrowserProvider> {
    try {
      // Check for existing provider first
      const existing = this.modal?.getProvider?.('eip155');
      if (existing && typeof existing === 'object' && existing !== null) {
        try {
          if ('request' in existing) {
            const ethersProvider = new ethers.BrowserProvider(existing as any);
            const accounts = await (existing as any).request({ method: "eth_accounts" });
            if (accounts && accounts.length > 0) {
              return ethersProvider;
            }
          }
        } catch (err) {
          console.log("Error with existing provider, will reconnect:", err);
        }
      }

      // Disconnect any existing connection
      let provider = this.modal?.getProvider?.('eip155');
      while (provider) {
        try {
          await this.modal?.disconnect('eip155');
        } catch (err) {
          console.log("Error disconnecting:", err);
        }
        provider = this.modal?.getProvider?.('eip155');
      }
      
      if (!this.modal) {
        throw new Error('Wallet modal not initialized');
      }
      
      console.log("Opening wallet connection modal...");
      
      return new Promise<ethers.BrowserProvider>((resolve, reject) => {
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
          const provider = state["eip155"];
          
          if (provider && !isHandled) {
            // Mark that we detected a provider IMMEDIATELY
            // This prevents race conditions with modal closure
            providerDetected = true;
            console.log("Provider detected, checking accounts...");
            
            (async () => {
              try {
                // Verify provider is valid by checking accounts
                const accounts = await (provider as any).request({ method: "eth_accounts" });
                
                if (accounts && accounts.length > 0) {
                  console.log("Provider connected successfully:", accounts);
                  
                  // Clean up subscriptions
                  if (typeof providerUnsubscribe === 'function') {
                    providerUnsubscribe();
                  }
                  if (typeof stateUnsubscribe === 'function') {
                    stateUnsubscribe();
                  }
                  
                  isHandled = true;
                  this.activeWalletOperation = {};
                  
                  const ethersProvider = new ethers.BrowserProvider(provider as any);
                  resolve(ethersProvider);
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
            const currentProvider = this.modal?.getProvider?.('eip155');
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
                  const provider = currentProvider;
                  // Verify provider is valid by checking accounts
                  const accounts = await (provider as any).request({ method: "eth_accounts" });
                  
                  if (accounts && accounts.length > 0) {
                    console.log("Provider connected successfully (direct check):", accounts);
                    
                    // Clean up subscriptions
                    if (typeof providerUnsubscribe === 'function') {
                      providerUnsubscribe();
                    }
                    if (typeof stateUnsubscribe === 'function') {
                      stateUnsubscribe();
                    }
                    
                    isHandled = true;
                    this.activeWalletOperation = {};
                    
                    const ethersProvider = new ethers.BrowserProvider(provider as any);
                    resolve(ethersProvider);
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
            this.modal.open({ namespace: 'eip155', view: 'AllWallets' })
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
  
  /**
   * Handle wallet connection and verification
   * @param _address - Expected address to connect with
   * @throws {WalletNotFoundException} If wallet is not installed
   */
  async handleWallet(_address: string): Promise<void> {
    if (!isMetamaskInstalled()) {
      this.modalInterface.error('Wallet is not installed');
      throw new WalletNotFoundException();
    }
    
    this.modalInterface.waiting('Getting accounts...');
    const provider = await this.getEthersProvider();
    const ethereum = provider.provider;
    
    const accounts = await getAccounts(ethereum);
    
    // If no connection or no accounts, initiate login
    if (!isWalletConnected(ethereum) || accounts.length === 0) {
      this.modalInterface.waiting('Please connect your wallet');
      const { address } = await this.walletLogin();
      
      if (_address.toLowerCase() !== address.toLowerCase()) {
        // Try to switch to the expected address
        const switched = await this.switchToAddress(_address);
        if (!switched) {
          this.modalInterface.error(
            `Connected with wrong address. Expected: ${_address}, got: ${address}`
          );
          throw new Error('Address mismatch. Please reconnect with the correct account.');
        }
      }
    }
    
    // Verify account matches expected address
    if (accounts[0]?.toLowerCase() !== _address.toLowerCase()) {
      this.modalInterface.waiting(
        'Account mismatch detected. Attempting to switch...'
      );
      
      // Try to switch to the expected address
      const switched = await this.switchToAddress(_address);
      if (!switched) {
        this.modalInterface.error(
          `Connected with wrong address. Expected: ${_address}, got: ${accounts[0]}`
        );
        throw new Error('Address mismatch. Please reconnect with the correct account.');
      }
    }
    
    // Handle special case for SKALE chain (sFuel distribution)
    await this.handleSKALEFuelDistribution();

    this.modalInterface.success('Wallet connected');
  }

  /**
   * Handle SKALE chain specific operations (sFuel distribution)
   * @private
   */
  private async handleSKALEFuelDistribution(): Promise<void> {
    if (this.chain === Chain.SKALE) {
      try {
      const distributionRequest = await ((
        await this.axiosInstance.post(`shop/sFuelDistribution`, {
          json: {
            wallet: this.address,
            isTestnet: this.network === Network.TESTNET,
          },
        })
      ).json() as any);
      console.log(distributionRequest);
      } catch (error) {
        console.warn("Failed to distribute sFuel:", error);
      }
    }
  }

  /**
   * Ensures correct blockchain is selected in wallet
   * @throws {ChainConnectionError} If chain connection fails
   */
  async handleChain(): Promise<void> {
    try {
      const provider = await this.getEthersProvider();
      
      // Add chain to wallet if needed
      await addChain(provider, this.chain, this.network, this.modalInterface);
      
      // Change to correct chain if needed
      if (!(await isChainCorrect(provider.provider, this.chain, this.network))) {
        console.log(`Changing chain to ${this.chain} ${this.network}`);
        await changeChain(provider.provider, this.chain, this.network);
      }
    } catch (error) {
      throw new ChainConnectionError(this.chain, error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Checks if required contracts are set
   * @throws {Error} If NFT or shop contract address is not set
   */
  checkDeployment(): void {
    if (!this.nftContractAddress) {
      throw new Error('NFT contract address not set');
    }
    if (!this.shopContractAddress) {
      throw new Error('Shop contract address not set');
    }
  }

  /**
   * Gets chain configuration for operations
   * @returns Chain configuration object
   */
  async getChainConfig(): Promise<DroplinkedChainConfig> {
    return {
      address: this.address,
      chain: this.chain,
      network: this.network,
      provider: await this.getEthersProvider(),
      gasPredictable: this.gasPredictable,
    };
  }

  /**
   * Gets web3 context for operations
   * @returns Web3 context object
   */
  getContext(): IWeb3Context {
    return {
      axiosInstance: this.axiosInstance,
      modalInterface: this.modalInterface,
      nftContract: this.nftContractAddress,
      shopContractAddress: this.shopContractAddress,
    };
  }

  /**
   * Execute a blockchain operation with proper setup
   * @param operation - Function to execute
   * @param requiresContractAddresses - Whether operation needs contract addresses
   * @private
   */
  private async executeOperation<T>(
    operation: () => Promise<T>,
    requiresContractAddresses = false
  ): Promise<T> {
    if (requiresContractAddresses) {
      this.checkDeployment();
    }
    
    // Use cancellation tracking for wallet operations
    return this.executeWithCancellation(async () => {
      await this.handleWallet(this.address);
      await this.handleChain();
      
      return operation();
    });
  }

  /**
   * Disconnects the currently connected wallet
   * @returns Promise resolving to true if disconnection was successful
   */
  async disconnect(): Promise<boolean> {
    try {
      const existing = this.modal?.getProvider?.('eip155');
      if (existing) {
        this.modalInterface.waiting('Disconnecting wallet...');
        await this.modal?.disconnect('eip155');
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

  // ==============================
  // AUTHENTICATION METHODS
  // ==============================

  /**
   * Authenticates with wallet (login)
   * @returns Login result with address, signature, etc.
   */
  async walletLogin(): Promise<ILoginResult> {
    const { address, signature, date, nonce } = await evmLogin(
      await this.getEthersProvider(),
      this.chain,
      this.network,
      this.modalInterface,
      this.axiosInstance
    );
    this.address = toEthAddress(address);
    return { address, signature, date, nonce };
  }

  /**
   * Login using Unstoppable Domains (not implemented)
   * @param _clientID - Client ID
   * @param _redirectUri - Redirect URI
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unstoppableLogin(_clientID: string, _redirectUri: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // ==============================
  // SHOP & PRODUCT OPERATIONS
  // ==============================

  /**
   * Deploys a new shop on the blockchain
   * @param shopDetails - Shop details
   * @returns Promise with deployment response
   */
  async deployShop(shopDetails: IDeployShop): Promise<DeployShopResponse> {
    return this.executeOperation(async () => {
      return await deployEVMShop(
        await this.getChainConfig(),
        {
          axiosInstance: this.axiosInstance,
          modalInterface: this.modalInterface,
        },
        shopDetails
      );
    });
  }

  /**
   * Records a product on the blockchain
   * @param productData - Product details
   * @param skuData - SKU details
   * @returns Promise with record response
   */
  async recordProduct(
    productData: IProductDetails,
    skuData: ISKUDetails[]
  ): Promise<RecordResponse> {
    return this.executeOperation(
      async () => {
    return await recordProduct(
      await this.getChainConfig(),
      this.getContext(),
      productData,
      skuData
        );
      },
      true
    );
  }

  /**
   * Creates a publish request for a product
   * @param productId - Product ID
   * @param shopAddress - Shop address
   * @returns Promise with affiliate request data
   */
  async publishRequest(
    productId: Uint256,
    shopAddress: EthAddress
  ): Promise<AffiliateRequestData> {
    return this.executeOperation(async () => {
    return await EVMPublishRequest({
        provider: await this.getEthersProvider(),
      chain: this.chain,
      address: this.address,
      productId,
      shopAddress,
      modalInterface: this.modalInterface,
      });
    });
  }

  /**
   * Approves an affiliate request
   * @param requestId - Request ID
   * @param shopAddress - Shop address
   * @returns Promise with transaction hash
   */
  async approveRequest(
    requestId: Uint256,
    shopAddress: EthAddress
  ): Promise<string> {
    return this.executeOperation(
      async () => {
    return await EVMApproveRequest(
          await this.getEthersProvider(),
      this.chain,
      this.address,
      requestId,
      shopAddress,
      this.modalInterface
        );
      },
      true
    );
  }

  /**
   * Disapproves an affiliate request
   * @param requestId - Request ID
   * @param shopAddress - Shop address
   * @returns Promise with transaction hash
   */
  async disapproveRequest(
    requestId: Uint256,
    shopAddress: EthAddress
  ): Promise<string> {
    return this.executeOperation(
      async () => {
    return await EVMDisapproveRequest(
          await this.getEthersProvider(),
      this.chain,
      this.address,
      requestId,
      shopAddress,
      this.modalInterface
        );
      },
      true
    );
  }

  // ==============================
  // PAYMENT OPERATIONS
  // ==============================

  /**
   * Processes a payment from cart
   * @param data - Payment inputs
   * @returns Promise with transaction result
   */
  async payment(
    data: IPaymentInputs
  ): Promise<{ transactionHash: string; cryptoAmount: any; orderID: string }> {
    return this.executeOperation(async () => {
    const { cartID, paymentToken, paymentType } = data;
    const paymentDetails = await getCartData(
      cartID,
      paymentToken,
      paymentType,
      this.address,
      this.axiosInstance
    );
      
    const paymentData: IChainPayment = paymentDetails.paymentData;
      
    const result = await droplinked_payment(
      await this.getChainConfig(),
      this.getContext(),
      paymentData
    );
      
    return { ...result, orderID: paymentDetails.orderID };
    });
  }

  /**
   * Gets payment data for a cart
   * @param cartID - Cart ID
   * @param paymentType - Payment type
   * @param token - Token address
   */
  async getPaymentData(cartID: string, paymentType: string, token: string) {
    return await getCartData(
      cartID,
      token,
      paymentType,
      this.address,
      this.axiosInstance
    );
  }

  /**
   * Processes a custom payment
   * @param data - Payment data
   * @returns Promise with transaction result
   */
  async customPayment(
    data: IChainPayment
  ): Promise<{ transactionHash: string; cryptoAmount: any }> {
    return this.executeOperation(async () => {
      return await droplinked_payment(
        await this.getChainConfig(),
        this.getContext(),
        data
      );
    });
  }

  /**
   * Transfers tokens directly to a recipient
   * @param receiver - Recipient address
   * @param amount - Amount to transfer
   * @param tokenAddress - Token contract address
   * @returns Promise with transaction hash
   */
  async paymentWithToken(
    receiver: string,
    amount: number,
    tokenAddress: string
  ): Promise<string> {
    return this.executeOperation(async () => {
    const abi = getERC20TokenTransferABI();
      const provider = await (await this.getEthersProvider()).getSigner();
    const contract = new ethers.Contract(tokenAddress, abi, provider);
      
      // Calculate token amount with proper decimals
      const tokenAmount = BigInt(Math.floor(amount * 1e6)) * BigInt(1e12);
      
      try {
        // Pre-flight check
        await contract['transfer'].staticCall(receiver, tokenAmount);
        
        // Gas estimation
      const estimation = (
          await contract['transfer'].estimateGas(receiver, tokenAmount)
        ).valueOf();
        
        const gasPrice = (await getGasPrice(await this.getEthersProvider())).valueOf();
        
        // Execute transfer with 5% gas buffer
        const tx = await contract['transfer'](receiver, tokenAmount, {
          gasPrice: (gasPrice * BigInt(105)) / BigInt(100),
          gasLimit: (estimation * BigInt(105)) / BigInt(100),
        });
        
      return tx.hash;
    } catch (e: any) {
        this.handleTokenTransferError(e);
      }
    });
  }

  /**
   * Handle token transfer specific errors with clear messages
   * @param e - Error from token transfer
   * @private
   * @throws Reformatted error with clear message
   */
  private handleTokenTransferError(e: any): never {
      if (e.reason) {
        if (e.reason === 'ERC20: transfer amount exceeds balance') {
          throw new Error('Insufficient token balance');
        } else if (e.reason === 'insufficient funds for gas * price + value') {
        throw new Error('Insufficient ETH balance for gas');
      } else if (e.reason === 'bad result from backend') {
        throw new Error('Transaction failed, check your ETH and token balance');
        }
        throw new Error(e.reason);
      }
    
    if (e.code?.toString() === 'ACTION_REJECTED') {
      throw new TransactionRejectedError('User rejected the transaction');
    }
    
      throw e;
    }

  // ==============================
  // NFT OPERATIONS
  // ==============================

  /**
   * Claims NFTs from a source
   * @param data - NFT claim inputs
   * @returns Promise with transaction hash
   */
  async claimNFTs(data: ClaimNFTInputs): Promise<string> {
    return this.executeOperation(async () => {
      const result = await claimNFT(
        data,
        await this.getChainConfig(),
        this.getContext()
      );
      return result.transactionHash;
    });
  }

  /**
   * Executes an airdrop for tokens
   * @param airdropId - Airdrop ID
   * @returns Promise with transaction hashes
   */
  async executeAirdrop(
    airdropId: string
  ): Promise<{ transactionHashes: string[] }> {
    return this.executeOperation(async () => {
      const airdropData = await getAirdropData(airdropId, this.axiosInstance);
      
      return await airdrop(await this.getChainConfig(), this.getContext(), {
        type: TokenStandard.ERC1155,
        airdropId: airdropId,
        receivers: airdropData.receivers,
        tokenAddress: toEthAddress(airdropData.tokenAddress),
        tokenId: airdropData.tokenId,
        chunkSize: 300,
      });
    });
  }

  /**
   * Request wallet switch by disconnecting and prompting for reconnection
   * @param targetAddress - The address to switch to
   * @returns Promise resolving to boolean indicating success
   */
  async switchToAddress(targetAddress: string): Promise<boolean> {
    try {
      // Check if we're already using the right address
      const provider = await this.getEthersProvider();
      const signer = await provider.getSigner();
      const currentAddress = await signer.getAddress();
      
      if (currentAddress.toLowerCase() === targetAddress.toLowerCase()) {
        return true; // Already using the right address
      }
      
      // With AppKit we can't directly switch accounts
      // We need to disconnect and then prompt for reconnection
      this.modalInterface.waiting('Disconnecting current wallet...');
      
      // Disconnect current wallet
      await this.disconnect();
      
      // Prompt user to connect with the right account
      this.modalInterface.waiting(
        `Please connect wallet with account ${targetAddress}`
      );
      
      // Verify if the correct account is now connected
      const newProvider = await this.getEthersProvider();
      const newSigner = await newProvider.getSigner();
      const newAddress = await newSigner.getAddress();
      
      if (newAddress.toLowerCase() === targetAddress.toLowerCase()) {
        this.modalInterface.success(`Successfully connected with the correct account`);
        this.address = toEthAddress(targetAddress);
        return true;
      } else {
        this.modalInterface.error(`Connected with ${newAddress} instead of the requested ${targetAddress}`);
        return false;
      }
    } catch (error) {
      console.error('Error while switching wallet address:', error);
      this.modalInterface.error('Failed to switch wallet. Please try again.');
      return false;
    }
  }

  /**
   * Cancel any active wallet operation with a specific reason
   * @param reason - The reason for cancellation
   * @private
   */
  private cancelActiveWalletOperation(reason: string): void {
    if (this.activeWalletOperation.reject) {
      console.log(`Canceling wallet operation: ${reason}`);
      
      // Create a copy of the reject function
      const rejectFn = this.activeWalletOperation.reject;
      
      // Clear the active operation immediately to prevent multiple calls
      this.activeWalletOperation = {};
      
      // Then call the reject function
      rejectFn(new Error(`Operation canceled: ${reason}`));
    }
  }

  /**
   * Called by external systems (like onClick handlers) to cancel pending wallet operations
   * @param reason - Optional reason for cancellation
   * @returns True if an operation was canceled, false otherwise
   */
  public cancelPendingWalletOperations(reason = 'User initiated cancellation'): boolean {
    if (this.activeWalletOperation.reject) {
      this.cancelActiveWalletOperation(reason);
      return true;
    }
    return false;
  }

  /**
   * Execute a function with wallet connection while tracking it for possible cancellation
   * @param operation - The async operation to perform
   * @returns Promise that can be canceled if the modal is closed
   * @private
   */
  private executeWithCancellation<T>(operation: () => Promise<T>): Promise<T> {
    // Clear any previous operation
    this.activeWalletOperation = {};
    
    return new Promise((resolve, reject) => {
      // Store the reject function for possible cancellation
      this.activeWalletOperation.reject = reject;
      
      // Execute the operation
      operation()
        .then((result) => {
          // Clear the active operation on success
          this.activeWalletOperation = {};
          resolve(result);
        })
        .catch((error) => {
          // Clear the active operation on error
          this.activeWalletOperation = {};
          reject(error);
        });
    });
  }
}
