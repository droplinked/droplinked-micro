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
  AccountAccessDeniedException,
  WalletError,
} from '../../../web3';
import { ChainWallet, Network } from '../../dto/chains';
import { IChainProvider } from '../../dto/interfaces/chain-provider.interface';
import { ILoginResult } from '../../dto/interfaces/login-result.interface';
import { IPaymentInputs } from '../../dto/interfaces/payment-interface';
import { getCartData, getNonce } from '../evm/evm.helpers';
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { createAssociatedTokenAccountIdempotentInstruction, createTransferCheckedInstruction, getAssociatedTokenAddressSync, getMint, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { base58 } from 'ethers/lib/utils';
import { BigNumber, ethers } from 'ethers';
import { ClaimNFTInputs } from '../../dto/interfaces/claim-nft-inputs';
import { ITokenDetails } from '../../dto/interfaces/airdrop-token.interface';
import { getWallets, Wallet } from '@wallet-standard/core'
import { TransactionMessage } from '@solana/web3.js';
import { VersionedTransaction } from '@solana/web3.js';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';


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

  /** ShopId */
  shopId?: string;

  /** Interface for modal dialogues and user interactions */
  modalInterface: ModalInterface = new defaultModal();

  /** Type of wallet to use, defaults to Phantom */
  wallet: ChainWallet = ChainWallet.Phantom;

  /** Optional NFT contract address */
  nftContractAddress?: EthAddress;

  /** Optional shop contract address */
  shopContractAddress?: EthAddress;

  private connection: Connection;

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
    this.connection = this.getConnection();
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
    productId: string
  ): Promise<RecordResponse> {
    throw new Error('Method not implemented.');
  }

  setShopId(shopId: string): IChainProvider {
    this.shopId = shopId;
    return this;
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
    if (this.connection)
      return this.connection;
    this.connection = new Connection(
      this.network === Network.MAINNET
        ? 'https://multi-greatest-voice.solana-mainnet.quiknode.pro/908c9dd72998ac69ec2205d5cdb2eccd654dfd0b'
        : clusterApiUrl('devnet'), 'confirmed'
    );
    return this.connection;
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

  async getMintProgramAndDecimals(conn: Connection, mint: PublicKey) {
    const ai = await conn.getAccountInfo(mint, 'confirmed')
    if (!ai) throw new Error('Mint account not found on chain')
    const programId = ai.owner?.toBase58() === TOKEN_2022_PROGRAM_ID.toBase58()
      ? TOKEN_2022_PROGRAM_ID
      : TOKEN_PROGRAM_ID
    const mintInfo = await getMint(conn, mint, undefined, programId)
    return { programId, decimals: mintInfo.decimals }
  }

  detectChainId(url: string) {
    const u = url.toLowerCase()
    if (u.includes('devnet')) return 'solana:devnet'
    if (u.includes('testnet')) return 'solana:testnet'
    return 'solana:mainnet'
  }

  async connectWalletOrThrow() {
    const selectedWallet = this.wallet;
    const nameMapping = {
      [ChainWallet.Metamask]: "MetaMask",
      [ChainWallet.Phantom]: "Phantom",
    };
    if (selectedWallet !== ChainWallet.Metamask && selectedWallet !== ChainWallet.Phantom) {
      throw new WalletNotFoundException();
    }
    const name = nameMapping[selectedWallet];

    const discovered = getWallets().get()
    const wallets = (discovered || []).filter(
      w => w?.features?.['standard:connect'] &&
        (w.features['solana:signAndSendTransaction'] || w.features['solana:signTransaction']) &&
        w.name === name
    )
    if (!wallets.length) {
      throw new Error('No compatible Solana wallet found (install a Wallet-Standard Solana wallet, e.g. MetaMask Solana Snap).')
    }

    // You can add your own chooser UI; here we pick the first for brevity
    const wallet = wallets[0]
    const { accounts } = await (wallet.features['standard:connect'] as any).connect()
    if (!accounts?.length) throw new Error('No account returned by the wallet.')

    const account = accounts[0]
    // account.publicKey can be Uint8Array or similar; normalize into PublicKey
    const pkBytes = account.publicKey || account.address || account.addressBytes
    const publicKey = new PublicKey(pkBytes)

    return { wallet, account, publicKey }
  }


  rescaleUnits(
    amount: bigint,
    fromDecimals: number,
    toDecimals: number
  ): bigint {
    if (fromDecimals === toDecimals) return amount
    const diff = (Math.abs(fromDecimals - toDecimals))
    if (fromDecimals > toDecimals) {
      // e.g. from 18 -> 6 : divide
      return amount / (BigInt(10 ** diff))
    } else {
      // e.g. from 6 -> 18 : multiply
      return amount * (BigInt(10 ** diff))
    }
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

      // 1) Fetch cart/meta from your backend (unchanged)
      const { paymentData, orderID } = await getCartData(
        data.cartID,
        data.paymentToken,
        data.paymentType,
        this.address,
        this.axiosInstance
      )
      const { tbdReceivers, tbdValues, totalPrice, tokenAddress } = paymentData

      // 2) Build Solana connection
      const connection = this.getConnection()
      const chainId = this.detectChainId((connection as any)._rpcEndpoint ?? '') // or track your rpcUrl elsewhere

      // 3) Connect via Wallet Standard (MetaMask Solana Snap or any compatible wallet)
      const { wallet, account, publicKey: senderPublicKey } = await this.connectWalletOrThrow()

      // 4) Token mint & program/decimals
      const mintPublicKey = new PublicKey(tokenAddress as string)
      const { programId, decimals } = await this.getMintProgramAndDecimals(connection, mintPublicKey)
      // 5) Prepare recipients/ATAs & create-ATA instructions (idempotent)
      const recipientPKs = tbdReceivers.map((r: string) => new PublicKey(r))
      const fromATA = getAssociatedTokenAddressSync(
        mintPublicKey,
        senderPublicKey,
      /* allowOwnerOffCurve */ false,
        programId
      )

      const toATAs = recipientPKs.map(pk =>
        getAssociatedTokenAddressSync(
          mintPublicKey,
          pk,
        /* allowOwnerOffCurve */ false,
          programId
        )
      )

      const instructions = []

      // Ensure sender ATA exists (idempotent)
      instructions.push(
        createAssociatedTokenAccountIdempotentInstruction(
          senderPublicKey, // payer
          fromATA,
          senderPublicKey,
          mintPublicKey,
          programId
        )
      )

      // Ensure each recipient ATA exists (idempotent, payer = sender)
      for (let i = 0; i < recipientPKs.length; i++) {
        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(
            senderPublicKey, // payer
            toATAs[i],
            recipientPKs[i],
            mintPublicKey,
            programId
          )
        )
      }

      // 6) Add transferChecked instructions
      // Your tbdValues look like 18-decimal “wei-like” strings. We’ll treat them as 10^18,
      // then rescale to the mint’s decimals.
      for (let i = 0; i < toATAs.length; i++) {
        const raw18 = (ethers.BigNumber.from(tbdValues[i])).toBigInt();
        instructions.push(
          createTransferCheckedInstruction(
            fromATA,
            mintPublicKey,
            toATAs[i],
            senderPublicKey,
            raw18,
            decimals,
            [],
            programId
          )
        )
      }

      // 7) Build v0 transaction; fallback to legacy if wallet rejects v0
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized')

      const msgV0 = new TransactionMessage({
        payerKey: senderPublicKey,
        recentBlockhash: blockhash,
        instructions
      }).compileToV0Message()
      const v0tx = new VersionedTransaction(msgV0)
      const v0Bytes = v0tx.serialize()

      let signature: string

      try {
        if (wallet.features['solana:signAndSendTransaction']) {

          const s = await (wallet.features['solana:signAndSendTransaction'] as any).signAndSendTransaction({
            transaction: v0Bytes,
            chain: chainId,
            account
          })
          signature = bs58.encode(s[0].signature);
        } else {
          const { signedTransaction } =
            await (wallet.features['solana:signTransaction'] as any).signTransaction({
              transaction: v0Bytes,
              chain: chainId,
              account
            })
          const raw = typeof signedTransaction?.serialize === 'function'
            ? signedTransaction.serialize()
            : signedTransaction
          signature = await connection.sendRawTransaction(raw, { skipPreflight: false })
        }
      } catch (walletErr: any) {
        if (walletErr?.message === 'User rejected the request.') {
          throw new Error('User rejected the transaction.')
        }
        // Legacy fallback (some wallets still prefer legacy)
        const legacyTx = new Transaction({ feePayer: senderPublicKey, recentBlockhash: blockhash })
        for (const ix of instructions) legacyTx.add(ix)

        if (wallet.features['solana:signAndSendTransaction']) {
          const legacyBytes = legacyTx.serialize({ requireAllSignatures: false, verifySignatures: false })
          const s =
            await (wallet.features['solana:signAndSendTransaction'] as any).signAndSendTransaction({
              transaction: legacyBytes,
              chain: chainId,
              account
            })
          signature = bs58.encode(s[0].signature);
        } else {
          const { signedTransaction } =
            await (wallet.features['solana:signTransaction'] as any).signTransaction({
              transaction: legacyTx.serialize({ requireAllSignatures: false, verifySignatures: false }),
              chain: chainId,
              account
            })
          const raw = typeof signedTransaction?.serialize === 'function'
            ? signedTransaction.serialize()
            : signedTransaction
          signature = await connection.sendRawTransaction(raw, { skipPreflight: false })
        }
      }

      await connection
        .confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed');

      return {
        transactionHash: signature,
        cryptoAmount: totalPrice,
        orderID,
      }
    } catch (error) {
      console.error('Payment error:', error)
      throw new Error(`Payment failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  toBaseUnits(amount: number | string, decimals: number): bigint {
    const s = String(amount).trim()
    if (!/^\d+(\.\d+)?$/.test(s)) throw new Error('Invalid amount')
    const [whole, frac = ''] = s.split('.')
    const fracPadded = (frac + '0'.repeat(decimals)).slice(0, decimals)
    return BigInt(whole + fracPadded)
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
    amount: number,        // human units (e.g., 1.23)
    tokenAddress: string   // mint address
  ): Promise<string> {
    try {
      // 1) Solana connection + chain id
      const connection = this.getConnection()
      const chainId = this.detectChainId((connection as any)._rpcEndpoint ?? '')

      // 2) Wallet Standard connect (MetaMask Solana Snap or any compatible wallet)
      const { wallet, account, publicKey: senderPublicKey } = await this.connectWalletOrThrow()

      // 3) Mint info (program & decimals)
      const mintPublicKey = new PublicKey(tokenAddress)
      const { programId, decimals } = await this.getMintProgramAndDecimals(connection, mintPublicKey)

      // 4) Derive ATAs and ensure they exist (idempotent)
      const recipientPublicKey = new PublicKey(receiver)
      const fromATA = getAssociatedTokenAddressSync(
        mintPublicKey, senderPublicKey, /*allowOwnerOffCurve*/ false, programId
      )
      const toATA = getAssociatedTokenAddressSync(
        mintPublicKey, recipientPublicKey, /*allowOwnerOffCurve*/ false, programId
      )

      const instructions = []

      // Make sure both ATAs exist (payer = sender). Idempotent => safe if they already exist.
      instructions.push(
        createAssociatedTokenAccountIdempotentInstruction(
          senderPublicKey, fromATA, senderPublicKey, mintPublicKey, programId
        ),
        createAssociatedTokenAccountIdempotentInstruction(
          senderPublicKey, toATA, recipientPublicKey, mintPublicKey, programId
        )
      )

      // 5) Transfer (checked) using correct decimals
      const amountBaseUnits = this.toBaseUnits(amount, decimals)
      instructions.push(
        createTransferCheckedInstruction(
          fromATA,
          mintPublicKey,
          toATA,
          senderPublicKey,
          amountBaseUnits,
          decimals,
          [],
          programId
        )
      )

      // 6) Build v0 tx; fallback to legacy if wallet rejects v0
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized')

      const msgV0 = new TransactionMessage({
        payerKey: senderPublicKey,
        recentBlockhash: blockhash,
        instructions
      }).compileToV0Message()
      const v0tx = new VersionedTransaction(msgV0)
      const v0Bytes = v0tx.serialize()

      let signature: string
      try {
        if (wallet.features['solana:signAndSendTransaction']) {
          const { signature: sig } =
            await (wallet.features['solana:signAndSendTransaction'] as any).signAndSendTransaction({
              transaction: v0Bytes,
              chain: chainId,
              account
            })
          signature = sig
        } else {
          const { signedTransaction } =
            await (wallet.features['solana:signTransaction'] as any).signTransaction({
              transaction: v0Bytes,
              chain: chainId,
              account
            })
          const raw = typeof signedTransaction?.serialize === 'function'
            ? signedTransaction.serialize()
            : signedTransaction
          signature = await connection.sendRawTransaction(raw, { skipPreflight: false })
        }
      } catch (walletErr: any) {
        if (walletErr?.message === 'User rejected the request.') {
          throw new Error('User rejected the transaction.')
        }
        // Legacy fallback
        const legacyTx = new Transaction({ feePayer: senderPublicKey, recentBlockhash: blockhash })
        for (const ix of instructions) legacyTx.add(ix)

        if (wallet.features['solana:signAndSendTransaction']) {
          const legacyBytes = legacyTx.serialize({ requireAllSignatures: false, verifySignatures: false })
          const { signature: sig } =
            await (wallet.features['solana:signAndSendTransaction'] as any).signAndSendTransaction({
              transaction: legacyBytes,
              chain: chainId,
              account
            })
          signature = sig
        } else {
          const { signedTransaction } =
            await (wallet.features['solana:signTransaction'] as any).signTransaction({
              transaction: legacyTx.serialize({ requireAllSignatures: false, verifySignatures: false }),
              chain: chainId,
              account
            })
          const raw = typeof signedTransaction?.serialize === 'function'
            ? signedTransaction.serialize()
            : signedTransaction
          signature = await connection.sendRawTransaction(raw, { skipPreflight: false })
        }
      }

      await connection
        .confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed')

      return signature
    } catch (error) {
      console.error('Token payment error:', error)
      throw new Error(`Token transfer failed: ${error instanceof Error ? error.message : String(error)}`)
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
