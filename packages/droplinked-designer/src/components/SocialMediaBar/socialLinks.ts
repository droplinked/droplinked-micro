import AppIcons from "assets/icons/appIcons";
import AppSocialMediaIcons from "assets/icons/social-media/appSocialMediaIcons";

export interface SocialMediaLink {
  link: string;
  key: keyof ShopURLs; 
  icon: React.ElementType; 
}

export interface ShopURLs {
  discordURL?: string;
  instagramURL?: string;
  facebookURL?: string;
  infoEmail?: string;
  linkedinURL?: string;
  tiktokURL?: string;
  twitterURL?: string;
  webURL?: string;
  youtubeURL?: string;
  telegramURL?: string;
  messengerURL?: string;
}

// Array of social media links using your custom icons
export const socialMediaLinks: SocialMediaLink[] = [
  { link: "https://discord.gg/", key: "discordURL", icon: AppSocialMediaIcons.Discord },
  { link: "https://instagram.com/", key: "instagramURL", icon: AppSocialMediaIcons.Instagram },
  { link: "https://facebook.com/", key: "facebookURL", icon: AppSocialMediaIcons.Facebook },
  { link: "mailto:", key: "infoEmail", icon: AppIcons.Letter },
  { link: "https://linkedin.com/", key: "linkedinURL", icon: AppSocialMediaIcons.LinkedIn },
  { link: "https://tiktok.com/@", key: "tiktokURL", icon: AppSocialMediaIcons.Tiktok },
  { link: "https://twitter.com/", key: "twitterURL", icon: AppSocialMediaIcons.X },
  { link: "http://", key: "webURL", icon: AppSocialMediaIcons.Globe },
  { link: "https://youtube.com/@", key: "youtubeURL", icon: AppSocialMediaIcons.Youtube },
  { link: "https://t.me/", key: "telegramURL", icon: AppSocialMediaIcons.Telegram },
  { link: "https://m.me/", key: "messengerURL", icon: AppSocialMediaIcons.Messenger },
];
