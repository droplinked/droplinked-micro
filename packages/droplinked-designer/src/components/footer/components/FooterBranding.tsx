import AppLogo from 'components/legacy-components/appLogo/AppLogo';
import SocialMediaBar from 'components/SocialMediaBar/SocialMediaBar';
import Text from 'components/ui/Text';
import useThemeInfo from 'hooks/useThemeInfo';
import { createUsePuck } from 'puck-editor';

interface FooterBrandingProps {
  socialChannels?: Array<{
    links?: {
      type?: string;
      channel?: string;
      url?: string;
    };
  }>;
  description?: {
    text?: string;
  };
}

const usePuck = createUsePuck()

const FooterBranding = ({ socialChannels, description }: FooterBrandingProps) => {
  const { isDarkTheme } = useThemeInfo()
  const logo = usePuck((s) => s.appState.data.shopDefaultData.logo)

  const textColor = isDarkTheme ? "text-[#7b7b7b]" : "text-[#B1B1B1]";

  return (
    <div className="mb-12 flex-1 md:mb-0">
      <AppLogo src={logo} alt="Logo" maxW="128px" objectFit="contain" className="mb-6 md:mb-9" />
      {description?.text && (
        <Text className={`mb-6 text-sm ${textColor} md:mb-9 max-w-[70%] md:max-w-[90%] sm:max-w-[100%]`}>
          {description.text}
        </Text>
      )}
      <div className="flex w-full flex-wrap justify-start gap-3 sm:w-auto sm:justify-start">
        <SocialMediaBar socialChannels={socialChannels ?? []} />
      </div>
    </div>
  );
};

export default FooterBranding;
