import React from 'react';
import { socialMediaLinks } from './socialLinks';
import CustomIcon from 'components/customIcon/CustomIcon';
import useThemeInfo from 'hooks/useThemeInfo';

// Accept socialChannels as prop
interface SocialChannel {
  links?: {
    type?: string;
    channel?: string;
    url?: string;
  };
}

interface SocialMediaBarProps {
  socialChannels?: SocialChannel[];
}

/**
 * SocialMediaBar Component
 * 
 * @description Renders a horizontal bar of social media icons based on the provided socialChannels prop.
 * Each icon uses the provided url and channel to determine the icon and link.
 */
const SocialMediaBar: React.FC<SocialMediaBarProps> = React.memo(({ socialChannels }) => {
  const { shopDesign: { foreground } } = useThemeInfo()

  // Map channel name to icon from socialMediaLinks
  const getIconByChannel = (channel: string) => {
    const found = socialMediaLinks.find(
      (item) => item.key.replace('URL', '').toLowerCase() === channel.toLowerCase()
    );
    return found ? found.icon : undefined;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {(socialChannels ?? [])
        .filter((item) => !!item.links?.url && !!item.links?.channel)
        .map((item, idx) => {
          const { channel, url } = item.links!;
          const Icon = getIconByChannel(channel!);
          if (!Icon) return null;
          return (
            <a
              key={channel + idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md p-[10px] transition-colors duration-100 ease-out"
              style={{ backgroundColor: foreground }}
            >
              <CustomIcon as={Icon} w="20px" h="20px" />
            </a>
          );
        })}
    </div>
  );
});

export default SocialMediaBar;

/**
 * Utility function to darken a hexadecimal color by a percentage
 * 
 * @param color - Hexadecimal color string (e.g., "#FFFFFF")
 * @param percent - Percentage to darken the color (-100 to 100)
 * @returns Darkened hexadecimal color string
 */
const darkenColor = (color: string, percent: number): string => {
  let num = parseInt(color.slice(1), 16);
  let amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let G = ((num >> 8) & 0x00ff) + amt;
  let B = (num & 0x0000ff) + amt;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};
