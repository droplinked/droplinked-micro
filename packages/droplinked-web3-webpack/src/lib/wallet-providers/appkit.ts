import { AppKit, createAppKit, Features } from "@reown/appkit";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { AppKitNetwork, bitlayerTestnet, redbellyMainnet, redbellyTestnet } from "@reown/appkit/networks";
import { bitlayer } from "@reown/appkit/networks";
import { baseSepolia, base } from "@reown/appkit/networks";
import { bscTestnet, sepolia, skaleCalypso, skaleCalypsoTestnet } from "@reown/appkit/networks";
import { bsc } from "@reown/appkit/networks";
import { mainnet, polygon, polygonAmoy } from "@reown/appkit/networks";
import { lineaSepolia, linea } from "@reown/appkit/networks";

const defaultFeatures: Features = {
    analytics: true,
    email: false,
    socials: false,
    allWallets: true,
    swaps: false,
};

export class AppKitProvider {
    adapter: EthersAdapter | undefined;
    modal: AppKit | undefined;
    static instance: AppKitProvider | undefined;
    private projectId = "061b5aabb8e1b036137cd69b90fb6758";
    private metadata = {
        name: "droplinked",
        description: "Droplinked Store-front",
        url: "https://dev.droplinked.io",
        icons: ["https://pbs.twimg.com/profile_images/1649131803817439240/0LiaLAEN_400x400.jpg"],
    };
    private networks = [
        mainnet,
        polygon,
        polygonAmoy,
        bsc,
        bscTestnet,
        skaleCalypso,
        skaleCalypsoTestnet,
        sepolia,
        base,
        baseSepolia,
        bitlayer,
        bitlayerTestnet,
        redbellyMainnet,
        redbellyTestnet,
        linea,
        lineaSepolia,
    ];

    static getInstance() {
        if (!this.instance) {
            this.instance = new AppKitProvider();
        }
        return this.instance;
    }

    getModal() {
        if (!this.modal) {
            this.adapter = new EthersAdapter();

            // Create the modal only once
            this.modal = createAppKit({
                adapters: [this.adapter],
                metadata: this.metadata,
                networks: this.networks as unknown as [AppKitNetwork, ...AppKitNetwork[]],
                projectId: this.projectId,
                features: defaultFeatures,
            });
        }
        return this;
    }

    setWallets(walletIds: string[] | undefined) {
        // Make sure modal is initialized
        if (!this.modal) {
            this.getModal();
        }

        if (walletIds && walletIds.length > 0) {
            // First set allWallets to HIDE in a separate call
            this.modal?.updateOptions({
                allWallets: "HIDE"
            });

            // Then set the wallet IDs
            this.modal?.updateOptions({
                includeWalletIds: walletIds,
                featuredWalletIds: walletIds
            });
        } else {
            this.setAllWallets();
        }

        return this;
    }

    setAllWallets() {
        // Make sure modal is initialized
        if (!this.modal) {
            this.getModal();
        }

        // First clear includeWalletIds and featuredWalletIds
        this.modal?.updateOptions({
            includeWalletIds: undefined,
            featuredWalletIds: undefined
        });

        // Then set allWallets to SHOW
        this.modal?.updateOptions({
            allWallets: "SHOW"
        });

        return this;
    }

    setFeatures(features: Features | undefined) {
        // Make sure modal is initialized
        if (!this.modal) {
            this.getModal();
        }

        if (features) {
            this.modal?.updateFeatures(features);
        } else {
            this.modal?.updateFeatures(defaultFeatures);
        }
        return this;
    }

    build() {
        return {
            modal: this.modal,
            adapter: this.adapter
        }
    }
}