import { ContractType } from './chain-constants';

const deployerABI = [
  {
    inputs: [],
    name: 'InvalidInitialization',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotInitializing',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newFee',
        type: 'uint256',
      },
    ],
    name: 'DroplinkedFeeUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newHeartBeat',
        type: 'uint256',
      },
    ],
    name: 'HeartBeatUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'shop',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
    ],
    name: 'ShopDeployed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'bytecode',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
    ],
    name: 'deployShop',
    outputs: [
      {
        internalType: 'address',
        name: 'shop',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'droplinkedFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'droplinkedWallet',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDroplinkedFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getHeartBeat',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'heartBeat',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_heartBeat',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_droplinkedWallet',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_droplinkedFee',
        type: 'uint256',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'nftContracts',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'shopOwner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'nftOwners',
    outputs: [
      {
        internalType: 'address',
        name: 'nftContracts',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newFee',
        type: 'uint256',
      },
    ],
    name: 'setDroplinkedFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newHeartBeat',
        type: 'uint256',
      },
    ],
    name: 'setHeartBeat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'shopAddresses',
    outputs: [
      {
        internalType: 'contract IDropShop',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'shopCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'shopOwner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'shopOwners',
    outputs: [
      {
        internalType: 'address',
        name: 'shops',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const type0ShopABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_shopName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_shopAddress',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_shopOwner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_shopLogo',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_shopDescription',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_deployer',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_chainLink',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_IFundsProxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AffiliatePOD',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'requester',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'AlreadyRequested',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'producer',
        type: 'address',
      },
    ],
    name: 'NotEnoughTokens',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'ProductDoesntExist',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'ProductExists',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'RequestAlreadyConfirmed',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'RequestDoesntExist',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'RequestNotConfirmed',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
    ],
    name: 'ShopDoesNotOwnToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'oldPrice',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AffiliatePurchase',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approver',
        type: 'address',
      },
    ],
    name: 'AffiliateRequestApproved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'disapprover',
        type: 'address',
      },
    ],
    name: 'AffiliateRequestDisapproved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'requester',
        type: 'address',
      },
    ],
    name: 'AffiliateRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'beneficiaryHash',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isPercentage',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'BeneficiaryAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'ProductPurchased',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    name: 'ProductRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'ProductUnregistered',
    type: 'event',
  },
  {
    inputs: [],
    name: '_shopInfo',
    outputs: [
      {
        internalType: 'string',
        name: 'shopName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'shopAddress',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'shopLogo',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'shopDescription',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'shopOwner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isPercentage',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
        ],
        internalType: 'struct Beneficiary',
        name: 'beneficary',
        type: 'tuple',
      },
    ],
    name: 'addBeneficiary',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'affiliateRequestCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'affiliateRequests',
    outputs: [
      {
        internalType: 'address',
        name: 'publisher',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isConfirmed',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'approveRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'beneficiaries',
    outputs: [
      {
        internalType: 'bool',
        name: 'isPercentage',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deployer',
    outputs: [
      {
        internalType: 'contract Deployer',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'disapproveRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'getAffiliate',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'publisher',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'productId',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isConfirmed',
            type: 'bool',
          },
        ],
        internalType: 'struct AffiliateRequest',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAffiliateRequestCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_hash',
        type: 'uint256',
      },
    ],
    name: 'getBeneficiary',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isPercentage',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
        ],
        internalType: 'struct Beneficiary',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'getPaymentInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currencyAddress',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'beneficiaries',
            type: 'uint256[]',
          },
          {
            internalType: 'enum PaymentMethodType',
            name: 'paymentType',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'receiveUSDC',
            type: 'bool',
          },
        ],
        internalType: 'struct PaymentInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'getProduct',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftAddress',
            type: 'address',
          },
          {
            internalType: 'enum NFTType',
            name: 'nftType',
            type: 'uint8',
          },
          {
            internalType: 'enum ProductType',
            name: 'productType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currencyAddress',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'beneficiaries',
                type: 'uint256[]',
              },
              {
                internalType: 'enum PaymentMethodType',
                name: 'paymentType',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'receiveUSDC',
                type: 'bool',
              },
            ],
            internalType: 'struct PaymentInfo',
            name: 'paymentInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'affiliatePercentage',
            type: 'uint256',
          },
        ],
        internalType: 'struct Product',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getProductCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftAddress',
            type: 'address',
          },
          {
            internalType: 'enum NFTType',
            name: 'nftType',
            type: 'uint8',
          },
          {
            internalType: 'enum ProductType',
            name: 'productType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currencyAddress',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'beneficiaries',
                type: 'uint256[]',
              },
              {
                internalType: 'enum PaymentMethodType',
                name: 'paymentType',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'receiveUSDC',
                type: 'bool',
              },
            ],
            internalType: 'struct PaymentInfo',
            name: 'paymentInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'affiliatePercentage',
            type: 'uint256',
          },
        ],
        internalType: 'struct Product',
        name: 'product',
        type: 'tuple',
      },
    ],
    name: 'getProductId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getProductIdV2',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'affiliateId',
        type: 'uint256',
      },
    ],
    name: 'getProductViaAffiliateId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftAddress',
            type: 'address',
          },
          {
            internalType: 'enum NFTType',
            name: 'nftType',
            type: 'uint8',
          },
          {
            internalType: 'enum ProductType',
            name: 'productType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currencyAddress',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'beneficiaries',
                type: 'uint256[]',
              },
              {
                internalType: 'enum PaymentMethodType',
                name: 'paymentType',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'receiveUSDC',
                type: 'bool',
              },
            ],
            internalType: 'struct PaymentInfo',
            name: 'paymentInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'affiliatePercentage',
            type: 'uint256',
          },
        ],
        internalType: 'struct Product',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getShopAddress',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getShopDescription',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getShopLogo',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getShopName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getShopOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'requester',
        type: 'address',
      },
    ],
    name: 'isRequestSubmited',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: '_nftAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_accepted',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: '_affiliatePercentage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_price',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currencyAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royalty',
            type: 'uint256',
          },
          {
            internalType: 'enum NFTType',
            name: '_nftType',
            type: 'uint8',
          },
          {
            internalType: 'enum ProductType',
            name: '_productType',
            type: 'uint8',
          },
          {
            internalType: 'enum PaymentMethodType',
            name: '_paymentType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'isPercentage',
                type: 'bool',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'wallet',
                type: 'address',
              },
            ],
            internalType: 'struct Beneficiary[]',
            name: '_beneficiaries',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: '_receiveUSDC',
            type: 'bool',
          },
        ],
        internalType: 'struct RecordData',
        name: 'mintData',
        type: 'tuple',
      },
    ],
    name: 'mintAndRegister',
    outputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: '_nftAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_accepted',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: '_affiliatePercentage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_price',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currencyAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royalty',
            type: 'uint256',
          },
          {
            internalType: 'enum NFTType',
            name: '_nftType',
            type: 'uint8',
          },
          {
            internalType: 'enum ProductType',
            name: '_productType',
            type: 'uint8',
          },
          {
            internalType: 'enum PaymentMethodType',
            name: '_paymentType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'isPercentage',
                type: 'bool',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'wallet',
                type: 'address',
              },
            ],
            internalType: 'struct Beneficiary[]',
            name: '_beneficiaries',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: '_receiveUSDC',
            type: 'bool',
          },
        ],
        internalType: 'struct RecordData[]',
        name: 'recordData',
        type: 'tuple[]',
      },
    ],
    name: 'mintAndRegisterBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'productCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'products',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
      {
        internalType: 'enum NFTType',
        name: 'nftType',
        type: 'uint8',
      },
      {
        internalType: 'enum ProductType',
        name: 'productType',
        type: 'uint8',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currencyAddress',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'beneficiaries',
            type: 'uint256[]',
          },
          {
            internalType: 'enum PaymentMethodType',
            name: 'paymentType',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'receiveUSDC',
            type: 'bool',
          },
        ],
        internalType: 'struct PaymentInfo',
        name: 'paymentInfo',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'affiliatePercentage',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proxyRouter',
    outputs: [
      {
        internalType: 'contract IFundsProxy',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isAffiliate',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint80',
        name: 'roundId',
        type: 'uint80',
      },
    ],
    name: 'purchaseProduct',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isAffiliate',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint80',
        name: 'roundId',
        type: 'uint80',
      },
    ],
    name: 'purchaseProductFor',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_nftAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_affiliatePercentage',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_currencyAddress',
        type: 'address',
      },
      {
        internalType: 'enum NFTType',
        name: '_nftType',
        type: 'uint8',
      },
      {
        internalType: 'enum ProductType',
        name: '_productType',
        type: 'uint8',
      },
      {
        internalType: 'enum PaymentMethodType',
        name: '_paymentType',
        type: 'uint8',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'isPercentage',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
        ],
        internalType: 'struct Beneficiary[]',
        name: '_beneficiaries',
        type: 'tuple[]',
      },
      {
        internalType: 'bool',
        name: '_receiveUSDC',
        type: 'bool',
      },
    ],
    name: 'registerProduct',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'requestAffiliate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'unregisterProduct',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const type1ShopABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_shopName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_shopAddress',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_shopOwner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_shopLogo',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_shopDescription',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_deployer',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_chainLink',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AffiliatePOD',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'requester',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'AlreadyRequested',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'producer',
        type: 'address',
      },
    ],
    name: 'NotEnoughTokens',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'ProductDoesntExist',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'ProductExists',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'RequestAlreadyConfirmed',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'RequestDoesntExist',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'RequestNotConfirmed',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
    ],
    name: 'ShopDoesNotOwnToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'oldPrice',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AffiliatePurchase',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approver',
        type: 'address',
      },
    ],
    name: 'AffiliateRequestApproved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'disapprover',
        type: 'address',
      },
    ],
    name: 'AffiliateRequestDisapproved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'requester',
        type: 'address',
      },
    ],
    name: 'AffiliateRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'beneficiaryHash',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isPercentage',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'BeneficiaryAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'ProductPurchased',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    name: 'ProductRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'ProductUnregistered',
    type: 'event',
  },
  {
    inputs: [],
    name: '_shopInfo',
    outputs: [
      {
        internalType: 'string',
        name: 'shopName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'shopAddress',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'shopLogo',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'shopDescription',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'shopOwner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isPercentage',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
        ],
        internalType: 'struct Beneficiary',
        name: 'beneficary',
        type: 'tuple',
      },
    ],
    name: 'addBeneficiary',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'affiliateRequestCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'affiliateRequests',
    outputs: [
      {
        internalType: 'address',
        name: 'publisher',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isConfirmed',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'approveRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'beneficiaries',
    outputs: [
      {
        internalType: 'bool',
        name: 'isPercentage',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deployer',
    outputs: [
      {
        internalType: 'contract Deployer',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'disapproveRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'getAffiliate',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'publisher',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'productId',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isConfirmed',
            type: 'bool',
          },
        ],
        internalType: 'struct AffiliateRequest',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAffiliateRequestCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_hash',
        type: 'uint256',
      },
    ],
    name: 'getBeneficiary',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isPercentage',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
        ],
        internalType: 'struct Beneficiary',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'getPaymentInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currencyAddress',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'beneficiaries',
            type: 'uint256[]',
          },
          {
            internalType: 'enum PaymentMethodType',
            name: 'paymentType',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'receiveUSDC',
            type: 'bool',
          },
        ],
        internalType: 'struct PaymentInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'getProduct',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftAddress',
            type: 'address',
          },
          {
            internalType: 'enum NFTType',
            name: 'nftType',
            type: 'uint8',
          },
          {
            internalType: 'enum ProductType',
            name: 'productType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currencyAddress',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'beneficiaries',
                type: 'uint256[]',
              },
              {
                internalType: 'enum PaymentMethodType',
                name: 'paymentType',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'receiveUSDC',
                type: 'bool',
              },
            ],
            internalType: 'struct PaymentInfo',
            name: 'paymentInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'affiliatePercentage',
            type: 'uint256',
          },
        ],
        internalType: 'struct Product',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getProductCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftAddress',
            type: 'address',
          },
          {
            internalType: 'enum NFTType',
            name: 'nftType',
            type: 'uint8',
          },
          {
            internalType: 'enum ProductType',
            name: 'productType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currencyAddress',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'beneficiaries',
                type: 'uint256[]',
              },
              {
                internalType: 'enum PaymentMethodType',
                name: 'paymentType',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'receiveUSDC',
                type: 'bool',
              },
            ],
            internalType: 'struct PaymentInfo',
            name: 'paymentInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'affiliatePercentage',
            type: 'uint256',
          },
        ],
        internalType: 'struct Product',
        name: 'product',
        type: 'tuple',
      },
    ],
    name: 'getProductId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getProductIdV2',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'affiliateId',
        type: 'uint256',
      },
    ],
    name: 'getProductViaAffiliateId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftAddress',
            type: 'address',
          },
          {
            internalType: 'enum NFTType',
            name: 'nftType',
            type: 'uint8',
          },
          {
            internalType: 'enum ProductType',
            name: 'productType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currencyAddress',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'beneficiaries',
                type: 'uint256[]',
              },
              {
                internalType: 'enum PaymentMethodType',
                name: 'paymentType',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'receiveUSDC',
                type: 'bool',
              },
            ],
            internalType: 'struct PaymentInfo',
            name: 'paymentInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'affiliatePercentage',
            type: 'uint256',
          },
        ],
        internalType: 'struct Product',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getShopAddress',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getShopDescription',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getShopLogo',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getShopName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getShopOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'requester',
        type: 'address',
      },
    ],
    name: 'isRequestSubmited',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: '_nftAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_accepted',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: '_affiliatePercentage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_price',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currencyAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royalty',
            type: 'uint256',
          },
          {
            internalType: 'enum NFTType',
            name: '_nftType',
            type: 'uint8',
          },
          {
            internalType: 'enum ProductType',
            name: '_productType',
            type: 'uint8',
          },
          {
            internalType: 'enum PaymentMethodType',
            name: '_paymentType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'isPercentage',
                type: 'bool',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'wallet',
                type: 'address',
              },
            ],
            internalType: 'struct Beneficiary[]',
            name: '_beneficiaries',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: '_receiveUSDC',
            type: 'bool',
          },
        ],
        internalType: 'struct RecordData',
        name: 'mintData',
        type: 'tuple',
      },
    ],
    name: 'mintAndRegister',
    outputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: '_nftAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_accepted',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: '_affiliatePercentage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_price',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currencyAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royalty',
            type: 'uint256',
          },
          {
            internalType: 'enum NFTType',
            name: '_nftType',
            type: 'uint8',
          },
          {
            internalType: 'enum ProductType',
            name: '_productType',
            type: 'uint8',
          },
          {
            internalType: 'enum PaymentMethodType',
            name: '_paymentType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'isPercentage',
                type: 'bool',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'wallet',
                type: 'address',
              },
            ],
            internalType: 'struct Beneficiary[]',
            name: '_beneficiaries',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: '_receiveUSDC',
            type: 'bool',
          },
        ],
        internalType: 'struct RecordData[]',
        name: 'recordData',
        type: 'tuple[]',
      },
    ],
    name: 'mintAndRegisterBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'productCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'products',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
      {
        internalType: 'enum NFTType',
        name: 'nftType',
        type: 'uint8',
      },
      {
        internalType: 'enum ProductType',
        name: 'productType',
        type: 'uint8',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currencyAddress',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'beneficiaries',
            type: 'uint256[]',
          },
          {
            internalType: 'enum PaymentMethodType',
            name: 'paymentType',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'receiveUSDC',
            type: 'bool',
          },
        ],
        internalType: 'struct PaymentInfo',
        name: 'paymentInfo',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'affiliatePercentage',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isAffiliate',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint80',
        name: 'roundId',
        type: 'uint80',
      },
    ],
    name: 'purchaseProduct',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isAffiliate',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint80',
        name: 'roundId',
        type: 'uint80',
      },
    ],
    name: 'purchaseProductFor',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_nftAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_affiliatePercentage',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_currencyAddress',
        type: 'address',
      },
      {
        internalType: 'enum NFTType',
        name: '_nftType',
        type: 'uint8',
      },
      {
        internalType: 'enum ProductType',
        name: '_productType',
        type: 'uint8',
      },
      {
        internalType: 'enum PaymentMethodType',
        name: '_paymentType',
        type: 'uint8',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'isPercentage',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
        ],
        internalType: 'struct Beneficiary[]',
        name: '_beneficiaries',
        type: 'tuple[]',
      },
      {
        internalType: 'bool',
        name: '_receiveUSDC',
        type: 'bool',
      },
    ],
    name: 'registerProduct',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'requestAffiliate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'productId',
        type: 'uint256',
      },
    ],
    name: 'unregisterProduct',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const type2ShopABI = [{}];
const type3ShopABI = [{}];

function getShopABI(contractType: ContractType) {
  switch (contractType) {
    case ContractType.TYPE0:
      return type0ShopABI;
    case ContractType.TYPE1:
      return type1ShopABI;
    case ContractType.TYPE2:
      return type2ShopABI;
    case ContractType.TYPE3:
      return type3ShopABI;
  }
}

export { deployerABI, getShopABI };
