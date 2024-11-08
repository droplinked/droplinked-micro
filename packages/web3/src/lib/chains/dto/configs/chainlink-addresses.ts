import { Chain, Network } from '../chains';

const chainLink = {
  [Chain.BINANCE]: {
    [Network.TESTNET]: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526',
    [Network.MAINNET]: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
  },
  [Chain.POLYGON]: {
    [Network.TESTNET]: '0x001382149eBa3441043c1c66972b4772963f5D43',
    [Network.MAINNET]: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
  },
  [Chain.BASE]: {
    [Network.TESTNET]: '0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1',
    [Network.MAINNET]: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
  },
  [Chain.LINEA]: {
    [Network.TESTNET]: '',
    [Network.MAINNET]: '0x3c6Cd9Cc7c7a4c2Cf5a82734CD249D7D593354dA',
  },
  [Chain.ETH]: {
    [Network.TESTNET]: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
    [Network.MAINNET]: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  },
};

export { chainLink };
