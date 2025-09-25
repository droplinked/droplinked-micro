export enum WALLET_TYPES {
  CASPER = 'CASPER',
  UNSTOPPABLEDOMAIN = 'UNSTOPPABLEDOMAIN',
  STACK = 'STACK',
  UNISAT = 'UNISAT',
  POLYGON = 'POLYGON',
  XUMM = 'XUMM',
  XRPLSIDECHAIN = 'XRPLSIDECHAIN',
  BINANCE = 'BINANCE',
  HEDERA = 'HEDERA',
  NEAR = 'NEAR',
  BASE = 'BASE',
  LINEA = 'LINEA',
  ETH = 'ETH',
  XVERSE = 'XVERSE',
  SOLANA = 'SOLANA',
  REDBELLY = 'REDBELLY',
  SKALE = 'SKALE',
  BITLAYER = 'BITLAYER'
}

export const RULESET_TYPE_OF_WALLET_ENUM: {
  readonly [W in WALLET_TYPES]: WALLET_TYPES | 'BITCOIN';
} = {
  CASPER: WALLET_TYPES.CASPER,
  STACK: WALLET_TYPES.STACK,
  ETH: WALLET_TYPES.ETH,
  UNSTOPPABLEDOMAIN: WALLET_TYPES.UNSTOPPABLEDOMAIN,
  POLYGON: WALLET_TYPES.POLYGON,
  HEDERA: WALLET_TYPES.HEDERA,
  BINANCE: WALLET_TYPES.BINANCE,
  LINEA: WALLET_TYPES.LINEA,
  BASE: WALLET_TYPES.BASE,
  XRPLSIDECHAIN: WALLET_TYPES.XRPLSIDECHAIN,
  NEAR: WALLET_TYPES.NEAR,
  XUMM: WALLET_TYPES.XUMM,
  SOLANA: WALLET_TYPES.SOLANA,
  XVERSE: 'BITCOIN',
  UNISAT: 'BITCOIN',
  REDBELLY: WALLET_TYPES.REDBELLY,
  SKALE: WALLET_TYPES.SKALE,
  BITLAYER: WALLET_TYPES.BITLAYER
};

export interface IUser {
  walletAddress: string | '';
  customerShop: string;
  firstname: string;
  lastname: string;
  registerType: string;
  type: string;
  email: string | '';
  emailNotificationEnabled: boolean;
  publicKey: string;
  status: string;
  stripeCustomerID: string;
  walletType?: WALLET_TYPES;
  _id: string;
}

/*
{
  [shopname]:{token , user}
}
*/
export interface IUserData {
  [key: string]: {
    token: string;
    user: IUser;
  };
}
