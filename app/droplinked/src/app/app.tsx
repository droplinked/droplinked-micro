import {
  Chain,
  ChainWallet,
  DropWeb3,
  Network,
  ProductType,
} from '@droplinked/web3';
import axios from 'axios';
import {
  IProductDetails,
  ISKUDetails,
} from 'packages/web3/src/lib/chains/dto/interfaces/record-web3-product.interface';
import { FC } from 'react';

interface IDeployParams {
  chainName: Chain;
}

interface IRecordProduct {
  chainName: Chain;
  shopAddress: string;
  nftContract: string;
  walletAddress: string;
}

export const DeployShop: FC<IDeployParams> = (deployParams: IDeployParams) => {
  return (
    <button
      onClick={async () => {
        const web3 = new DropWeb3(
          axios.create({
            baseURL: 'https://apiv3dev.droplinked.com',
          })
        );
        const binance = web3.web3Instance({
          chain: deployParams.chainName,
          network: Network.TESTNET,
          preferredWallet: ChainWallet.Metamask,
          userAddress: '0x734ce112E36B915a688D803FD9C57F339cBe410b',
        });
        const result = await binance.deployShop({
          shopAddress: 'https://k3rn3lpanicc.com',
          shopDescription: 'lol',
          shopLogo: 'na',
          shopName: 'k3rn3lpanic',
          shopOwner: '0x734ce112E36B915a688D803FD9C57F339cBe410b',
        });
        console.log({ result });
      }}
    >
      Deploy Shop on {Chain[deployParams.chainName]}
    </button>
  );
};

export const RecordProduct: FC<IRecordProduct> = (
  recordParams: IRecordProduct
) => {
  return (
    <button
      onClick={async () => {
        const web3 = new DropWeb3(
          axios.create({
            baseURL: 'https://apiv3dev.droplinked.com',
          })
        );
        const binance = web3.web3Instance({
          chain: recordParams.chainName,
          network: Network.TESTNET,
          preferredWallet: ChainWallet.Metamask,
          userAddress: recordParams.walletAddress,
          nftContractAddress: recordParams.nftContract,
          shopContractAddress: recordParams.shopAddress,
        });
        const result = await binance.recordProduct(
          {
            acceptsManageWallet: true,
            commission: 0,
            currencyAddress: '0x0000000000000000000000000000000000000000',
            description: 'desc',
            productTitle: 'title',
            royalty: 0,
            skuProperties: {},
            type: ProductType.DIGITAL,
          },
          {
            amount: 1000,
            beneficiaries: [],
            imageUrl: 'https://k3rn3lpanic.img',
            price: 1000,
            skuID: '670fcb2ea6738730848f8933',
          }
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
          const web3 = new DropWeb3(
            axios.create({
              baseURL: 'https://apiv3dev.droplinked.com',
            })
          );
          const chainProvider = web3.web3Instance({
            chain: Chain.BASE,
            network: Network.TESTNET,
            preferredWallet: ChainWallet.Metamask,
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
          const web3 = new DropWeb3(
            axios.create({
              baseURL: 'https://apiv3dev.droplinked.com',
            })
          );
          const info = await web3.getWalletInfo();
          console.log({ info });
        }}
      >
        Easy Login With Wallet
      </button>
      <br></br>
      <br></br>
      <DeployShop chainName={Chain.BINANCE} />
      <br></br>
      <DeployShop chainName={Chain.SKALE} />
      <br></br>
      <DeployShop chainName={Chain.POLYGON} />
      <br></br>
      <DeployShop chainName={Chain.BASE} />
      <br></br>
      <DeployShop chainName={Chain.REDBELLY} />
      <br></br>
      <RecordProduct
        chainName={Chain.REDBELLY}
        nftContract="0xEEBB0Ee8779e58c4ba881EB3BB2BEAd81ea3f119"
        shopAddress="0x24780563F3b2a498D162ce420fE7788311517F0B"
        walletAddress="0x734ce112E36B915a688D803FD9C57F339cBe410b"
      />
    </div>
  );
}

export default App;
