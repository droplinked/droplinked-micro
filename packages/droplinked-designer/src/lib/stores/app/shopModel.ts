import {
    FontFamilyEnum,
    ImsTypeEnum,
    template_options_defaults,
} from "lib/models/shop";
import { IShop } from "./interfaces";

/**
 * Generates default shop states with optional overrides.
 * @param data - Partial shop data to override defaults.
 * @returns A complete IShop object.
 */
export const shopStates = (data: any): IShop => {
    return {
        _id: "",
        addressBookID: "",
        backgroundColor: "#000",
        backgroundImage:
            "https://upload-file-droplinked.s3.amazonaws.com/23af0b47bf743d9c9b0f5a79e0f3726b8d35a1175a5434e9174b8b34bb6b9c45.png",
        backgroundImageSecondary: "",
        backgroundText: "",
        description: "",
        design: {
            textColor: "",
            logo: "",
            headerIcon: "",
            backgroundText: "",
            backgroundColor: "",
            backgroundImage: "",
            backgroundImageSecondary: "",
        },
        discordURL: null,
        facebookURL: null,
        fullWidthHero: false,
        headerIcon:
            "https://upload-file-droplinked.s3.amazonaws.com/3ac6262ee09643c53e41f175725ca843f0e31ff9ab6075e2f4a13ad2cefe0685.png",
        imsType: ImsTypeEnum.DROPLINKED,
        infoEmail: "",
        instagramURL: null,
        linkedinURL: null,
        logo: "https://upload-file-droplinked.s3.amazonaws.com/af2155ee398a90b7bee96508a80d54939341aaec246ac8cd695dbb05c0aea8b8.png",
        name: "",
        ownerID: "",
        paymentMethods: [],
        productSectionText: "",
        productsTags: null,
        shopifyDomain: "",
        socialMedias: [],
        template_options: template_options_defaults,
        textColor: "#FFF",
        tiktokURL: null,
        twitterURL: null,
        webURL: null,
        shopDesign: {
            backgroundBody: "#11151A",
            bannerLinks: [],
            fontfamily: FontFamilyEnum.Nunito_Sans,
            footerLinks: [],
            foreground: "#262738",
            headerBackground: "",
            hiroLayout: "center_text",
            hiroTextColor: "#8880fb",
            iconHeaderColor: "#584b4b",
            productListTitle: null,
            textColorParagraphs: "#F9F9F6",
        },
        launchDate: null,
        ...data,
    };
};

