import {
  Chain,
  ChainWallet,
  DropWeb3,
  Network,
  ProductType,
} from '@droplinked/web3';
import { ZERO_ADDRESS } from 'packages/web3/src/lib/chains/dto/constants/chain-constants';
import { FC } from 'react';

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

export const DeployShop: FC<IDeployParams> = (deployParams: IDeployParams) => {
  return (
    <button
      onClick={async () => {
        const web3 = new DropWeb3(Network.TESTNET);

        const binance = web3.web3Instance({
          method: 'deploy',
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

export const RecordProduct: FC<IRecordProduct> = (
  recordParams: IRecordProduct
) => {
  return (
    <button
      onClick={async () => {
        const web3 = new DropWeb3(Network.TESTNET);
        const chainInstance = web3.web3Instance({
          method: 'record-affiliate',
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
          const web3 = new DropWeb3(Network.TESTNET);
          const chainProvider = web3.web3Instance({
            method: 'login',
            chain: Chain.BASE,
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
          const web3 = new DropWeb3(Network.TESTNET);

          const info = await web3.getWalletInfo();
          console.log({ info });
        }}
      >
        Easy Login With Wallet
      </button>
      <br></br>
      <br></br>
      <DeployShop
        chainName={Chain.BINANCE}
        address="0xe29E7479c23Db494aAa0D36C93844B2d79f50c25"
      />
      <br></br>
      <DeployShop
        chainName={Chain.SKALE}
        address="0xe29E7479c23Db494aAa0D36C93844B2d79f50c25"
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
        nftContract="0x7C7999d5de928e1d74570d2310EdbfbAeE18642E"
        shopAddress="0xc93C130BD7D6A7Ac3BD8ebEd77D620DF01B69E15"
        walletAddress="0xe29E7479c23Db494aAa0D36C93844B2d79f50c25"
      />
    </div>
  );
}

export default App;
