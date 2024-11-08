import ky from 'ky';
import {
  Chain,
  ChainWallet,
  Network,
  PaymentTokens,
} from 'packages/web3/src/lib/chains/dto/chains';
import { DropWeb3, ProductType } from 'packages/web3/src/index';
import { Web3Actions } from 'packages/web3/src/lib/chains/dto/configs/web3-config';
import { ZERO_ADDRESS } from 'packages/web3/src/lib/chains/dto/constants/chain-constants';
import { getCartData } from 'packages/web3/src/lib/chains/providers/evm/evm.helpers';
import { FC } from 'react';
import { PurchaseSignature } from 'packages/web3/src/lib/chains/dto/interfaces/claim-nft-inputs';

interface IDeployParams {
  chainName: Chain;
  address: string;
}

interface IRecordProduct {
  chainName: Chain;
  shopAddress: string;
  nftContract: string;
  walletAddress: string;
}

interface IPaymentProps {
  chainName: Chain;
  address: string;
  cartID: string;
  paymentToken: PaymentTokens;
  paymentType: string;
}

interface IClaimNFTSProps {
  chainName: Chain;
  address: string;
  signature: PurchaseSignature;
  shopAddress: string;
}

export const Payment: FC<IPaymentProps> = (paymentParams: IPaymentProps) => {
  return (
    <button
      onClick={async () => {
        const web3 = new DropWeb3(Network.TESTNET);

        const binance = web3.web3Instance({
          method: Web3Actions.PAYMENT,
          chain: paymentParams.chainName,
          preferredWallet: ChainWallet.Metamask,
          userAddress: paymentParams.address,
        });
        const result = await binance.payment({
          cartID: paymentParams.cartID,
          paymentToken: paymentParams.paymentToken,
          paymentType: paymentParams.chainName,
        });
        console.log({ result });
      }}
    >
      Pay With {Chain[paymentParams.chainName]}
    </button>
  );
};

export const DeployShop: FC<IDeployParams> = (deployParams: IDeployParams) => {
  return (
    <button
      onClick={async () => {
        const web3 = new DropWeb3(Network.TESTNET);

        const binance = web3.web3Instance({
          method: Web3Actions.DEPLOY,
          chain: deployParams.chainName,
          preferredWallet: ChainWallet.Metamask,
          userAddress: deployParams.address,
        });
        const result = await binance.deployShop({
          shopAddress: 'https://k3rn3lpanicc.com',
          shopDescription: 'lol',
          shopLogo: 'na',
          shopName: 'k3rn3lpanic',
        });
        console.log({ result });
      }}
    >
      Deploy Shop on {Chain[deployParams.chainName]}
    </button>
  );
};

export const ClaimNFTs: FC<IClaimNFTSProps> = (
  claimParams: IClaimNFTSProps
) => {
  return (
    <button
      onClick={async () => {
        const web3 = new DropWeb3(Network.TESTNET);
        const chainInstance = web3.web3Instance({
          method: Web3Actions.CLAIM,
          chain: claimParams.chainName,
          preferredWallet: ChainWallet.Metamask,
          userAddress: claimParams.address,
          shopContractAddress: claimParams.shopAddress,
        });
        const result = await chainInstance.claimNFTs({
          shopContractAddress: claimParams.shopAddress,
          signature: claimParams.signature,
        });
        console.log({ result });
      }}
    >
      Claim {claimParams.chainName}
    </button>
  );
};

export const RecordProduct: FC<IRecordProduct> = (
  recordParams: IRecordProduct
) => {
  return (
    <button
      onClick={async () => {
        const web3 = new DropWeb3(Network.TESTNET);
        const chainInstance = web3.web3Instance({
          method: Web3Actions.RECORD_AFFILIATE,
          chain: recordParams.chainName,
          preferredWallet: ChainWallet.Metamask,
          userAddress: recordParams.walletAddress,
          nftContractAddress: recordParams.nftContract,
          shopContractAddress: recordParams.shopAddress,
        });
        const result = await chainInstance.recordProduct(
          {
            productTitle: 'title',
            description: 'desc',
            royalty: 0,
            commission: 0,
            type: ProductType.DIGITAL,
            acceptsManageWallet: true,
            currencyAddress: ZERO_ADDRESS,
          },
          [
            {
              amount: 1000,
              price: 1000,
              beneficiaries: [],
              skuProperties: {},
              skuID: '670fcb2ea6738730848f8933',
              imageUrl: 'https://k3rn3lpanic.img',
            },
          ]
        );
        console.log({ result });
      }}
    >
      Record Product on {Chain[recordParams.chainName]}
    </button>
  );
};

export function App() {
  return (
    <div>
      <button
        onClick={async () => {
          const result = await getCartData(
            '671bf15b159badf2e1c60ab7',
            'BNB',
            'BINANCE',
            '0xbec8c184a8f55e6443b315361bac3bbb2280e8e8',
            ky.create({ prefixUrl: 'https://apiv3dev.droplinked.com' })
          );
          console.log({ result });
        }}
      >
        Get Payment data
      </button>
      <br></br>

      <h1>**Login**</h1>
      <button
        onClick={async () => {
          const web3 = new DropWeb3(Network.TESTNET);
          const chainProvider = web3.web3Instance({
            method: Web3Actions.LOGIN,
            chain: Chain.SOLANA,
            preferredWallet: ChainWallet.Phantom,
          });
          const loginData = await chainProvider.walletLogin();
          console.log({ loginData });
        }}
      >
        Login With Wallet
      </button>
      <br></br>
      <br></br>
      <button
        onClick={async () => {
          const web3 = new DropWeb3(Network.TESTNET);

          const info = await web3.getWalletInfo();
          console.log({ info });
        }}
      >
        Easy Login With Wallet
      </button>
      <br></br>
      <br></br>
      <h1>**Deploy shop**</h1>
      <DeployShop
        chainName={Chain.BINANCE}
        address="0xe29E7479c23Db494aAa0D36C93844B2d79f50c25"
      />
      <br></br>
      <DeployShop
        chainName={Chain.SKALE}
        address="0x2cBFC23A609a34AafB7DDA667dbA883f9f224571"
      />
      <br></br>
      <DeployShop
        chainName={Chain.POLYGON}
        address="0x9CA686090b4c6892Bd76200e3fAA2EeC98f0528F"
      />
      <br></br>
      <DeployShop
        chainName={Chain.BASE}
        address="0xBEc8C184A8f55E6443B315361Bac3BbB2280E8E8"
      />
      <br></br>
      <DeployShop
        chainName={Chain.REDBELLY}
        address="0x734ce112E36B915a688D803FD9C57F339cBe410b"
      />
      <br></br>
      <br></br>
      <h1>**Record Product**</h1>
      <RecordProduct
        chainName={Chain.REDBELLY}
        nftContract="0xEEBB0Ee8779e58c4ba881EB3BB2BEAd81ea3f119"
        shopAddress="0x24780563F3b2a498D162ce420fE7788311517F0B"
        walletAddress="0x734ce112E36B915a688D803FD9C57F339cBe410b"
      />
      <br></br>
      <RecordProduct
        chainName={Chain.POLYGON}
        nftContract="0x1C0b995351A7701692c634Bc8a3Ba8B3b10BCCBE"
        shopAddress="0xD8edb8198e7eF42790Af2e43339c8454d10fA7CB"
        walletAddress="0x9CA686090b4c6892Bd76200e3fAA2EeC98f0528F"
      />
      <br></br>
      <RecordProduct
        chainName={Chain.BINANCE}
        nftContract="0x6AEf48944b9c4FE84DA4359f059EfbC2b28dfFBA"
        shopAddress="0xDE248D788622a28e97903946c99733c0F9d38a05"
        walletAddress="0xe29E7479c23Db494aAa0D36C93844B2d79f50c25"
      />
      <br></br>
      <RecordProduct
        chainName={Chain.BASE}
        nftContract="0x013991eAeA6C68B9dfcdee0bF82F66cabAc2a6B0"
        shopAddress="0x5EC92F29d4F84C214574363074cC3e64895fb872"
        walletAddress="0xBEc8C184A8f55E6443B315361Bac3BbB2280E8E8"
      />
      <br></br>
      <br></br>
      <h1>** Payment **</h1>
      <Payment
        chainName={Chain.BINANCE}
        address="0xe29E7479c23Db494aAa0D36C93844B2d79f50c25"
        cartID="671c8e07159badf2e1c614c7"
        paymentToken={PaymentTokens.BNB}
        paymentType="BINANCE"
      />
      <br></br>
      <h1>** Claim NFT **</h1>
      <ClaimNFTs
        address="0xe29E7479c23Db494aAa0D36C93844B2d79f50c25"
        chainName={Chain.BINANCE}
        shopAddress="0xDE248D788622a28e97903946c99733c0F9d38a05"
        signature={{
          signature:
            '0x891347c4c682a0ac3b8849db78725024d5e4f7646cc1ad51aad4478fc6e164f41c51ff9c35bf06fb92b6eda5ed0e7e150c17af689fb2943e35532829a6bdacbe1b',
          purchaseData: [
            {
              amount: 5,
              productId:
                '52016425286446959491621875784841268570278260520849950042800701673080151161074',
              nullifier:
                '0x7eae68f7f2ed5db0d397fa6b068dd5c0fcdfc94099ad2d22d56984e942271dea',
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
