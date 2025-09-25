import { StyleProps } from "@chakra-ui/react";

export enum ImsTypeEnum {
  SHOPIFY = "SHOPIFY",
  DROPLINKED = "DROPLINKED",
}

export enum ProductTypeEnum {
  DIGITAl = "DIGITAL",
  PRINT_ON_DEMAND = "PRINT_ON_DEMAND",
}


export enum SocialMediasEnum {
  INSTAGRAM = "INSTAGRAM",
  DISCORD = "DISCORD",
  TIKTOK = "TIKTOK",
  LINKDIN = "LINKDIN",
  FACEBOOK = "FACEBOOK",
  TWITTER = "TWITTER",
  WEB = "WEB",
  TELEGRAM = "TELEGRAM",
  YOUTUBE = "YOUTUBE",
  MESSENGER = "MESSENGER",
}

export interface IShopMedia {
  mediaType: SocialMediasEnum;
  address: string;
}

export enum PaymentsTypeEnum {
  STRIPE = "STRIPE",
  CASPER = "CASPER",
  STACKS = "STACKS",
  RIPPLE = "RIPPLE",
  XRPLSIDECHAIN = "XRPLSIDECHAIN",
  POLYGON = "POLYGON",
  BINANCE = "BINANCE",
  BASE = "BASE",
  NEAR = "NEAR",
  LINEA = "LINEA",
  ETH = "ETH",
  SOLANA = "SOLANA",
  COINBASE = "COINBASE",
  REDBELLY = "REDBELLY",
  SKALE = "SKALE",
  BITLAYER = "BITLAYER",
  PAYMOB = "PAYMOB",
}

export interface IPaymentMethods {
  _id: string;
  isActive: boolean;
  type: PaymentsTypeEnum;
  destinationAddress?: string;
  chainId: string;
  tokens: {
    _id: string;
    isActive: boolean;
    isCustom: boolean;
    isDirectPayment: boolean;
    decimals: number;
    tokenId: {
      isCustom: boolean;
      icon: string;
    };
    type: string;
  }[];
}

export interface IShopDesignPrev {
  textColor: string;
  logo: string;
  headerIcon: string;
  backgroundText: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundImageSecondary: string;
  fullWidthHero?: boolean;
}

export interface IShopDesign {
  fontfamily: FontFamilyEnum;
  headerBackground: string;
  isHeaderFixed: boolean;
  hiroLayout: string;
  hiroTextColor: string;
  footerLinks: IFooterLink[];
  bannerLinks: IBannerLink[];
  iconHeaderColor: string;
  backgroundBody: string;
  foreground: string;
  textColorParagraphs: string;
  productListTitle: string;
  isCollectionShown: boolean;
  isLogoAsFavicon: boolean;
  faviconURL: string;
}

export enum FontFamilyEnum {
  Montserrat = "Montserrat",
  Manrope = "Manrope",
  Source_Serif_Pro = "Source Serif Pro",
  Fredoka_One = "Fredoka One",
  Nunito_Sans = "Nunito Sans",
  Allerta = "Allerta",
}

interface IFooterLink {
  caption: string;
  link: string;
}

interface IBannerLink {
  caption: string;
  link: string;
}

export interface ITemplateOptions {
  "--dlk-lyt": {
    "--dlk-lyt-hdr": {
      "--dlk-lyt-hdr-styles": StyleProps;
      "--dlk-lyt-hdr-lgo": StyleProps;
      "--dlk-lyt-hdr-icn": {
        "--dlk-lyt-hdr-icn-styles": StyleProps;
        "--dlk-lyt-hdr-icn-prfl": {
          "--dlk-lyt-hdr-icn-prfl-styles": StyleProps;
          "--dlk-lyt-hdr-icn-prfl-ppvr": {
            "--dlk-lyt-hdr-icn-prfl-ppvr-styles": StyleProps;
            "--dlk-lyt-hdr-icn-prfl-ppvr-btns": StyleProps;
          };
          "--dlk-lyt-hdr-icn-prfl-mdl": {
            "--dlk-lyt-hdr-icn-prfl-mdl-styles": StyleProps;
          };
        };
        "--dlk-lyt-hdr-icn-crt": {
          "--dlk-lyt-hdr-icn-crt-styles": StyleProps;
          "--dlk-lyt-hdr-icn-crt-ppvr": {
            "--dlk-lyt-hdr-icn-crt-ppvr-styles": StyleProps;
          };
        };
        "--dlk-lyt-hdr-icn-ntf": {
          "--dlk-lyt-hdr-icn-ntf-styles": StyleProps;
          "--dlk-lyt-hdr-icn-ntf-ppvr": {
            "--dlk-lyt-hdr-icn-ntf-ppvr-styles": StyleProps;
          };
        };
      };
    };
    "--dlk-lyt-ftr": {
      "--dlk-lyt-ftr-styles": any;
      "--dlk-lyt-ftr-lgo": any;
      "--dlk-lyt-ftr-txt": any;
    };
  };
  "--dlk-comps": {
    "--dlk-comps-btn": {
      "--dlk-comps-btn-styles": StyleProps;
      "--dlk-comps-btn-out": {
        "--dlk-comps-btn-out-pseudo": {
          _hover: any;
          _active: any;
          _focus: any;
        };
        "--dlk-comps-btn-out-styles": StyleProps;
      };
      "--dlk-comps-btn-fill": {
        "--dlk-comps-btn-fill-pseudo": {
          _hover: any;
          _active: any;
          _focus: any;
        };
        "--dlk-comps-btn-fill-styles": StyleProps;
      };
    };
    "--dlk-comps-inps": {
      "--dlk-comps-inps-def": StyleProps;
      "--dlk-comps-inps-dds": StyleProps;
    };
    "--dlk-comps-mdl": {
      "--dlk-comps-mdl-styles": StyleProps;
    };
    "--dlk-comps-bc": {
      "--dlk-comps-bc-actv": StyleProps;
      "--dlk-comps-bc-def": StyleProps;
    };
  };
  "--dlk-pgs": {
    "--dlk-pgs-styles": StyleProps;
    "--dlk-pgs-hme": {
      "--dlk-pgs-hme-styles": StyleProps;
      "--dlk-pgs-hme-sd": {
        "--dlk-pgs-hme-sd-styles": StyleProps;
        "--dlk-pgs-hme-sd-srch": {
          "--dlk-pgs-hme-sd-srch-styles": StyleProps;
          "--dlk-pgs-hme-sd-srch-inp": StyleProps;
          "--dlk-pgs-hme-sd-srch-icn": StyleProps;
        };
        "--dlk-pgs-hme-sd-prfl": {
          "--dlk-pgs-hme-sd-prfl-styles": StyleProps;
          "--dlk-pgs-hme-sd-prfl-soc": {
            "--dlk-pgs-hme-sd-prfl-soc-styles": StyleProps;
            "--dlk-pgs-hme-sd-prfl-soc-icn": StyleProps;
          };
          "--dlk-pgs-hme-sd-prfl-lgo": StyleProps;
          "--dlk-pgs-hme-sd-prfl-txt": StyleProps;
        };
      };
      "--dlk-pgs-hme-prods": {
        "--dlk-pgs-hme-prods-styles": StyleProps;
        "--dlk-pgs-hme-prods-prod": {
          "--dlk-pgs-hme-prods-prod-styles": StyleProps;
          "--dlk-pgs-hme-prods-prod-img": StyleProps;
          "--dlk-pgs-hme-prods-prod-ttl": StyleProps;
          "--dlk-pgs-hme-prods-prod-prc": StyleProps;
          "--dlk-pgs-hme-prods-prod-clr": StyleProps;
        };
      };
      "--dlk-pgs-hme-bnr": {
        "--dlk-pgs-hme-bnr-styles": StyleProps;
        "--dlk-pgs-hme-bnr-img": StyleProps;
        "--dlk-pgs-hme-bnr-txt": {
          "--dlk-pgs-hme-bnr-txt-styles": StyleProps;
          "--dlk-pgs-hme-bnr-txt-cntnt": StyleProps;
        };
      };
    };
    "--dlk-pgs-prod": {
      "--dlk-pgs-prod-styles": StyleProps;
      "--dlk-pgs-prod-dtls": {
        "--dlk-pgs-prod-dtls-styles": StyleProps;
        "--dlk-pgs-prod-dtls-grp": {
          "--dlk-pgs-prod-dtls-grp-styles": StyleProps;
          "--dlk-pgs-prod-dtls-grp-ttl": StyleProps;
          "--dlk-pgs-prod-dtls-grp-prc": {
            "--dlk-pgs-prod-dtls-grp-prc-styles": StyleProps;
            "--dlk-pgs-prod-dtls-grp-prc-def": StyleProps;
            "--dlk-pgs-prod-dtls-grp-prc-dis": StyleProps;
          };
          "--dlk-pgs-prod-dtls-grp-vars": {
            "--dlk-pgs-prod-dtls-grp-vars-clr": {
              "--dlk-pgs-prod-dtls-grp-vars-clr-styles": StyleProps;
              "--dlk-pgs-prod-dtls-grp-vars-clr-lbl": StyleProps;
              "--dlk-pgs-prod-dtls-grp-vars-clr-sel": StyleProps;
              "--dlk-pgs-prod-dtls-grp-vars-clr-opts": {
                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-styles": StyleProps;
                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-actv": StyleProps;
                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-def": StyleProps;
              };
            };
            "--dlk-pgs-prod-dtls-grp-vars-sz": {
              "--dlk-pgs-prod-dtls-grp-vars-sz-styles": StyleProps;
              "--dlk-pgs-prod-dtls-grp-vars-sz-lbl": StyleProps;
              "--dlk-pgs-prod-dtls-grp-vars-sz-sel": StyleProps;
              "--dlk-pgs-prod-dtls-grp-vars-sz-opts": {
                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-styles": StyleProps;
                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-actv": StyleProps;
                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-def": StyleProps;
              };
            };
          };
        };
      };
      "--dlk-pgs-prod-sldr": {
        "--dlk-pgs-prod-sldr-styles": StyleProps;
        "--dlk-pgs-prod-sldr-grp": {
          "--dlk-pgs-prod-sldr-grp-styles": StyleProps;
          "--dlk-pgs-prod-sldr-grp-img": StyleProps;
          "--dlk-pgs-prod-sldr-grp-lst": {
            "--dlk-pgs-prod-sldr-grp-lst-styles": StyleProps;
            "--dlk-pgs-prod-sldr-grp-lst-opts": StyleProps;
          };
        };
      };
    };
    "--dlk-pgs-ckt": {
      "--dlk-pgs-ckt-styles": {};
      "--dlk-pgs-ckt-accs": {
        "--dlk-pgs-ckt-accs-styles": StyleProps;
        "--dlk-pgs-ckt-accs-em": {
          "--dlk-pgs-ckt-accs-em-styles": StyleProps;
          "--dlk-pgs-ckt-accs-em-inp": StyleProps;
          "--dlk-pgs-ckt-accs-em-btn": StyleProps;
        };
        "--dlk-pgs-ckt-accs-addr": {
          "--dlk-pgs-ckt-accs-addr-styles": StyleProps;
          "--dlk-pgs-ckt-accs-addr-trig": {
            "--dlk-pgs-ckt-accs-addr-trig-styles": StyleProps;
            "--dlk-pgs-ckt-accs-addr-trig-txt": StyleProps;
            "--dlk-pgs-ckt-accs-addr-trig-icn": StyleProps;
          };
          "--dlk-pgs-ckt-accs-addr-mdl": {
            "--dlk-pgs-ckt-accs-addr-mdl-styles": StyleProps;
          };
          "--dlk-pgs-ckt-accs-addr-btn": StyleProps;
        };
        "--dlk-pgs-ckt-accs-shp": {
          "--dlk-pgs-ckt-accs-shp-styles": StyleProps;
        };
        "--dlk-pgs-ckt-accs-pmt": {
          "--dlk-pgs-ckt-accs-pmt-styles": StyleProps;
        };
      };
      "--dlk-pgs-ckt-gft": {
        "--dlk-pgs-ckt-gft-styles": StyleProps;
        "--dlk-pgs-ckt-gft-inp": StyleProps;
        "--dlk-pgs-ckt-gft-btn": StyleProps;
      };
      "--dlk-pgs-ckt-smry": {
        "--dlk-pgs-ckt-smry-styles": StyleProps;
        "--dlk-pgs-ckt-smry-hdr": StyleProps;
        "--dlk-pgs-ckt-smry-sep": StyleProps;
        "--dlk-pgs-ckt-smry-itm": {
          "--dlk-pgs-ckt-smry-itm-styles": StyleProps;
          "--dlk-pgs-ckt-smry-itm-img": StyleProps;
          "--dlk-pgs-ckt-smry-itm-ttl": StyleProps;
          "--dlk-pgs-ckt-smry-itm-qty": StyleProps;
          "--dlk-pgs-ckt-smry-itm-prc": StyleProps;
        };
      };
      "--dlk-pgs-ckt-totl": {
        "--dlk-pgs-ckt-totl-styles": StyleProps;
        "--dlk-pgs-ckt-totl-itm": {
          "--dlk-pgs-ckt-totl-itm-styles": StyleProps;
          "--dlk-pgs-ckt-totl-itm-ttl": StyleProps;
          "--dlk-pgs-ckt-totl-itm-prc": StyleProps;
        };
      };
    };
  };
}

export const template_options_defaults: ITemplateOptions = {
  "--dlk-lyt": {
    "--dlk-lyt-hdr": {
      "--dlk-lyt-hdr-styles": {},
      "--dlk-lyt-hdr-lgo": {},
      "--dlk-lyt-hdr-icn": {
        "--dlk-lyt-hdr-icn-styles": {},
        "--dlk-lyt-hdr-icn-prfl": {
          "--dlk-lyt-hdr-icn-prfl-styles": {},
          "--dlk-lyt-hdr-icn-prfl-ppvr": {
            "--dlk-lyt-hdr-icn-prfl-ppvr-styles": {},
            "--dlk-lyt-hdr-icn-prfl-ppvr-btns": {},
          },
          "--dlk-lyt-hdr-icn-prfl-mdl": {
            "--dlk-lyt-hdr-icn-prfl-mdl-styles": {},
          },
        },
        "--dlk-lyt-hdr-icn-crt": {
          "--dlk-lyt-hdr-icn-crt-styles": {},
          "--dlk-lyt-hdr-icn-crt-ppvr": {
            "--dlk-lyt-hdr-icn-crt-ppvr-styles": {},
          },
        },
        "--dlk-lyt-hdr-icn-ntf": {
          "--dlk-lyt-hdr-icn-ntf-styles": {},
          "--dlk-lyt-hdr-icn-ntf-ppvr": {
            "--dlk-lyt-hdr-icn-ntf-ppvr-styles": {},
          },
        },
      },
    },
    "--dlk-lyt-ftr": {
      "--dlk-lyt-ftr-styles": {},
      "--dlk-lyt-ftr-lgo": {},
      "--dlk-lyt-ftr-txt": {},
    },
  },
  "--dlk-comps": {
    "--dlk-comps-btn": {
      "--dlk-comps-btn-styles": {},
      "--dlk-comps-btn-out": {
        "--dlk-comps-btn-out-styles": {},
        "--dlk-comps-btn-out-pseudo": {
          _hover: {},
          _active: {},
          _focus: {},
        },
      },
      "--dlk-comps-btn-fill": {
        "--dlk-comps-btn-fill-styles": {},
        "--dlk-comps-btn-fill-pseudo": {
          _hover: {},
          _active: {},
          _focus: {},
        },
      },
    },
    "--dlk-comps-inps": {
      "--dlk-comps-inps-def": {},
      "--dlk-comps-inps-dds": {},
    },
    "--dlk-comps-mdl": {
      "--dlk-comps-mdl-styles": {},
    },
    "--dlk-comps-bc": {
      "--dlk-comps-bc-actv": {},
      "--dlk-comps-bc-def": {},
    },
  },
  "--dlk-pgs": {
    "--dlk-pgs-styles": {},
    "--dlk-pgs-hme": {
      "--dlk-pgs-hme-styles": {},
      "--dlk-pgs-hme-sd": {
        "--dlk-pgs-hme-sd-styles": {},
        "--dlk-pgs-hme-sd-srch": {
          "--dlk-pgs-hme-sd-srch-styles": {},
          "--dlk-pgs-hme-sd-srch-inp": {},
          "--dlk-pgs-hme-sd-srch-icn": {},
        },
        "--dlk-pgs-hme-sd-prfl": {
          "--dlk-pgs-hme-sd-prfl-styles": {},
          "--dlk-pgs-hme-sd-prfl-soc": {
            "--dlk-pgs-hme-sd-prfl-soc-styles": {},
            "--dlk-pgs-hme-sd-prfl-soc-icn": {},
          },
          "--dlk-pgs-hme-sd-prfl-lgo": {},
          "--dlk-pgs-hme-sd-prfl-txt": {},
        },
      },
      "--dlk-pgs-hme-prods": {
        "--dlk-pgs-hme-prods-styles": {},
        "--dlk-pgs-hme-prods-prod": {
          "--dlk-pgs-hme-prods-prod-styles": {},
          "--dlk-pgs-hme-prods-prod-img": {},
          "--dlk-pgs-hme-prods-prod-ttl": {},
          "--dlk-pgs-hme-prods-prod-prc": {},
          "--dlk-pgs-hme-prods-prod-clr": {},
        },
      },
      "--dlk-pgs-hme-bnr": {
        "--dlk-pgs-hme-bnr-styles": {},
        "--dlk-pgs-hme-bnr-img": {},
        "--dlk-pgs-hme-bnr-txt": {
          "--dlk-pgs-hme-bnr-txt-styles": {},
          "--dlk-pgs-hme-bnr-txt-cntnt": {},
        },
      },
    },
    "--dlk-pgs-prod": {
      "--dlk-pgs-prod-styles": {},
      "--dlk-pgs-prod-dtls": {
        "--dlk-pgs-prod-dtls-styles": {},
        "--dlk-pgs-prod-dtls-grp": {
          "--dlk-pgs-prod-dtls-grp-styles": {},
          "--dlk-pgs-prod-dtls-grp-ttl": {},
          "--dlk-pgs-prod-dtls-grp-prc": {
            "--dlk-pgs-prod-dtls-grp-prc-styles": {},
            "--dlk-pgs-prod-dtls-grp-prc-def": {},
            "--dlk-pgs-prod-dtls-grp-prc-dis": {},
          },
          "--dlk-pgs-prod-dtls-grp-vars": {
            "--dlk-pgs-prod-dtls-grp-vars-clr": {
              "--dlk-pgs-prod-dtls-grp-vars-clr-styles": {},
              "--dlk-pgs-prod-dtls-grp-vars-clr-lbl": {},
              "--dlk-pgs-prod-dtls-grp-vars-clr-sel": {},
              "--dlk-pgs-prod-dtls-grp-vars-clr-opts": {
                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-styles": {},
                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-actv": {},
                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-def": {},
              },
            },
            "--dlk-pgs-prod-dtls-grp-vars-sz": {
              "--dlk-pgs-prod-dtls-grp-vars-sz-styles": {},
              "--dlk-pgs-prod-dtls-grp-vars-sz-lbl": {},
              "--dlk-pgs-prod-dtls-grp-vars-sz-sel": {},
              "--dlk-pgs-prod-dtls-grp-vars-sz-opts": {
                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-styles": {},
                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-actv": {},
                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-def": {},
              },
            },
          },
        },
      },
      "--dlk-pgs-prod-sldr": {
        "--dlk-pgs-prod-sldr-styles": {},
        "--dlk-pgs-prod-sldr-grp": {
          "--dlk-pgs-prod-sldr-grp-styles": {},
          "--dlk-pgs-prod-sldr-grp-img": {},
          "--dlk-pgs-prod-sldr-grp-lst": {
            "--dlk-pgs-prod-sldr-grp-lst-styles": {},
            "--dlk-pgs-prod-sldr-grp-lst-opts": {},
          },
        },
      },
    },
    "--dlk-pgs-ckt": {
      "--dlk-pgs-ckt-styles": {},
      "--dlk-pgs-ckt-accs": {
        "--dlk-pgs-ckt-accs-styles": {},
        "--dlk-pgs-ckt-accs-em": {
          "--dlk-pgs-ckt-accs-em-styles": {},
          "--dlk-pgs-ckt-accs-em-inp": {},
          "--dlk-pgs-ckt-accs-em-btn": {},
        },
        "--dlk-pgs-ckt-accs-addr": {
          "--dlk-pgs-ckt-accs-addr-styles": {},
          "--dlk-pgs-ckt-accs-addr-trig": {
            "--dlk-pgs-ckt-accs-addr-trig-styles": {},
            "--dlk-pgs-ckt-accs-addr-trig-txt": {},
            "--dlk-pgs-ckt-accs-addr-trig-icn": {},
          },
          "--dlk-pgs-ckt-accs-addr-mdl": {
            "--dlk-pgs-ckt-accs-addr-mdl-styles": {},
          },
          "--dlk-pgs-ckt-accs-addr-btn": {},
        },
        "--dlk-pgs-ckt-accs-shp": {
          "--dlk-pgs-ckt-accs-shp-styles": {},
        },
        "--dlk-pgs-ckt-accs-pmt": {
          "--dlk-pgs-ckt-accs-pmt-styles": {},
        },
      },
      "--dlk-pgs-ckt-gft": {
        "--dlk-pgs-ckt-gft-styles": {},
        "--dlk-pgs-ckt-gft-inp": {},
        "--dlk-pgs-ckt-gft-btn": {},
      },
      "--dlk-pgs-ckt-smry": {
        "--dlk-pgs-ckt-smry-styles": {},
        "--dlk-pgs-ckt-smry-hdr": {},
        "--dlk-pgs-ckt-smry-sep": {},
        "--dlk-pgs-ckt-smry-itm": {
          "--dlk-pgs-ckt-smry-itm-styles": {},
          "--dlk-pgs-ckt-smry-itm-img": {},
          "--dlk-pgs-ckt-smry-itm-ttl": {},
          "--dlk-pgs-ckt-smry-itm-qty": {},
          "--dlk-pgs-ckt-smry-itm-prc": {},
        },
      },
      "--dlk-pgs-ckt-totl": {
        "--dlk-pgs-ckt-totl-styles": {},
        "--dlk-pgs-ckt-totl-itm": {
          "--dlk-pgs-ckt-totl-itm-styles": {},
          "--dlk-pgs-ckt-totl-itm-ttl": {},
          "--dlk-pgs-ckt-totl-itm-prc": {},
        },
      },
    },
  },
};

export interface IShop {
  addressBookID: string | null;
  backgroundColor: string;
  backgroundImage: string;
  backgroundImageSecondary: string;
  backgroundText: string;
  description: string;
  discordURL: string | null;
  headerIcon: string;
  imsType: ImsTypeEnum;
  instagramURL: string | null;
  logo: string;
  name: string;
  ownerID: string;
  tiktokURL: string | null;
  linkedinURL: string | null;
  facebookURL: string | null;
  paymentMethods: IPaymentMethods[];
  productsTags: string | null;
  textColor: string;
  shopifyDomain: string | null;
  twitterURL: string | null;
  webURL: string | null;
  telegramURL: string | null;
  youtubeURL: string | null;
  messengerURL: string | null;
  infoEmail: string | null;
  socialMedias: IShopMedia[];
  productSectionText: string;
  _id: string;
  fullWidthHero: boolean;
  design: IShopDesignPrev;
  shopDesign: IShopDesign;
  template_options: ITemplateOptions;
}
