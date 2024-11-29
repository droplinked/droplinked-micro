function getERC20TokenTransferABI() {
  return [
    {
      constant: false,
      inputs: [
        {
          name: '_to',
          type: 'address',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];
}

const SkaleUsdcAddressForTestnet = '0x2aebcdc4f9f9149a50422fff86198cb0939ea165';
const SkaleUsdcAddressForMainnet = '0x7Cf76E740Cb23b99337b21F392F22c47Ad910c67';

export {
  getERC20TokenTransferABI,
  SkaleUsdcAddressForMainnet,
  SkaleUsdcAddressForTestnet,
};
