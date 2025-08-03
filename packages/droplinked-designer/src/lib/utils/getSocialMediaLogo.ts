import { DiscordMd } from "assets/icon/SocialMedia/Colored/Discord/DiscordMd";
import { FacebookMd } from "assets/icon/SocialMedia/Colored/Facebook/FacebookMd";
import { InstagramMd } from "assets/icon/SocialMedia/Colored/Instagram/InstagramMd";
import { LinkedinMd } from "assets/icon/SocialMedia/Colored/LinkedIn/LinkedinMd";
import { MessengerMd } from "assets/icon/SocialMedia/Colored/Messenger/MessengerMd";
import { TiktoklightMd } from "assets/icon/SocialMedia/Colored/TikTokLight/TiktoklightMd";
import { YoutubeMd } from "assets/icon/SocialMedia/Colored/YouTube/YoutubeMd";
import { XMd } from "assets/icon/SocialMedia/Colorless/X/XMd";

import { DiscordMd as SimpleDiscord } from "assets/icon/SocialMedia/Colorless/Discord/DiscordMd";
import { FacebookMd as SimpleFacebook } from "assets/icon/SocialMedia/Colorless/Facebook/FacebookMd";
import { InstagramMd as SimpleInstagram } from "assets/icon/SocialMedia/Colorless/Instagram/InstagramMd";
import { LinkedinMd as SimpleLinkedin } from "assets/icon/SocialMedia/Colorless/LinkedIn/LinkedinMd";
import { MessengerMd as SimpleMessenger } from "assets/icon/SocialMedia/Colorless/Messenger/MessengerMd";
import { YoutubeMd as SimpleYoutube } from "assets/icon/SocialMedia/Colorless/YouTube/YoutubeMd";

export type Channels = "discord" | "facebook" | "instagram" | "linkedin" | "messenger" | "tiktok" | "twitter" | "youtube"

export const getSocialMediaLogo = (channel: Channels, isColored: boolean) => {
    switch (channel) {
        case "discord":
            return isColored ? DiscordMd : SimpleDiscord;
        case "facebook":
            return isColored ? FacebookMd : SimpleFacebook;
        case "instagram":
            return isColored ? InstagramMd : SimpleInstagram;
        case "linkedin":
            return isColored ? LinkedinMd : SimpleLinkedin;
        case "messenger":
            return isColored ? MessengerMd : SimpleMessenger;
        case "tiktok":
            return TiktoklightMd;
        case "twitter":
            return XMd;
        case "youtube":
            return isColored ? YoutubeMd : SimpleYoutube;
        default:
            return null;
    }
}