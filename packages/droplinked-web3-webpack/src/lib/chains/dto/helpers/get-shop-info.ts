import { KyInstance } from "ky";
import { Chain } from "../chains";

interface IgetLink {
    blockchain: string;
    hashkey: string;
    isTestnet: boolean;
}

export const hashkeyModel = {
    getLink: ({ blockchain, hashkey, isTestnet }: IgetLink) => {
        switch (blockchain) {
            case 'CASPER':
                return `https://${isTestnet ? 'testnet.' : ''
                    }cspr.live/deploy/${hashkey}`;
            case 'STACKS':
                return `https://explorer.hiro.so/txid/${hashkey}?chain=${isTestnet ? 'testnet' : 'mainnet'
                    }`;
            case 'POLYGON':
                return `https://${isTestnet ? 'amoy.' : ''
                    }polygonscan.com/tx/${hashkey}`;
            case 'XRPLSIDECHAIN':
                return `https://evm-sidechain.xrpl.org/tx/${hashkey}`;
            case 'BINANCE':
                return `https://${isTestnet ? 'testnet.' : ''
                    }bscscan.com/tx/${hashkey}`;
            case 'NEAR':
                return `https://explorer.${isTestnet ? 'testnet' : 'mainnet'
                    }.aurora.dev/tx/${hashkey}`;
            case 'BASE':
                return `https://base${isTestnet ? '-sepolia' : ''
                    }.blockscout.com/tx/${hashkey}`;
            case 'LINEA':
                return `https://${isTestnet ? 'sepolia' : ''
                    }.lineascan.build/tx/${hashkey}`;
            case 'ETH':
                return `https://${isTestnet ? 'sepolia' : ''
                    }.etherscan.io/tx/${hashkey}`;
            case 'SOLANA':
                return `https://explorer.solana.com/tx/${hashkey}?cluster=devnet`;
            case 'REDBELLY':
                return isTestnet
                    ? `https://redbelly.testnet.routescan.io/tx/${hashkey}`
                    : `https://redbelly.routescan.io/tx/${hashkey}`;
            case 'SKALE':
                return `https://${isTestnet
                    ? 'giant-half-dual-testnet.explorer.testnet.skalenodes.com'
                    : 'honorable-steel-rasalhague.explorer.mainnet.skalenodes.com'
                    }/tx/${hashkey}`;
            case 'BITLAYER':
                return isTestnet
                    ? `https://testnet.btrscan.com/tx/${hashkey}`
                    : `https://www.btrscan.com/tx/${hashkey}`;
            default:
                return '';
        }
    },
};

export async function getShopInfo(
    chain: Chain,
    axiosInstance: KyInstance
): Promise<{ nftContractAddress: string; shopContractAddress: string }> {
    const result = ((
        (await (
            await axiosInstance.get(
                `shops/v2?fields=deployedContracts`,
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ).json()) as any
    ).data.deployedContracts as { deployedShopAddress: string; deployedNFTAddress: string; type: string }[]).filter((item) => item.type === chain);
    if (result.length === 0) {
        return {
            nftContractAddress: "",
            shopContractAddress: ""
        };
    }
    return {
        nftContractAddress: result[0].deployedShopAddress,
        shopContractAddress: result[0].deployedNFTAddress,
    };
}

export async function sendRecordAllToBackend(chain: Chain, body: {
    deploy_hash: string,
    commision: string,
    productId: string;
    royalty?: number,
}, axiosInstance: KyInstance, isTestnet: boolean): Promise<{ message: string }> {
    const deploy_hash_link = hashkeyModel.getLink({ blockchain: chain, hashkey: body.deploy_hash, isTestnet });
    return (
        (await (
            await axiosInstance.post(
                `sku/record-all/${chain}`,
                {
                    json: { ...body, deploy_hash_link, canBeAffiliated: parseFloat(body.commision) > 0 }
                }
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ).json()) as any
    ).data.data as { message: string };
}
