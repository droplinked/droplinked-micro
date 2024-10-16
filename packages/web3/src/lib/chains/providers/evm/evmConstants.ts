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

export const SkaleUsdcAddressForTestnet =
  '0x2aebcdc4f9f9149a50422fff86198cb0939ea165';
export const SkaleUsdcAddressForMainnet =
  '0x2aebcdc4f9f9149a50422fff86198cb0939ea165';

export { getERC20TokenTransferABI };
