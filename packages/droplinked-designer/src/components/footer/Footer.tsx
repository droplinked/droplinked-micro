import FooterNavigation from './components/FooterNavigation';
import FooterBranding from './components/FooterBranding';
import FooterLicence from './components/FooterLicence';
import AppContainer from 'components/legacy-components/container/AppContainer';
import useThemeInfo from 'hooks/useThemeInfo';

interface FooterProps {
  description?: {
    text?: string;
  };
  socialChannels?: Array<{
    links?: {
      type?: string;
      channel?: string;
      url?: string;
    };
  }>;
  linkManagement?: {
    firstColumn?: {
      name?: string;
      links?: Array<{
        list?: {
          label?: string;
          url?: string;
        };
      }>;
    };
    secondColumn?: {
      name?: string;
      links?: Array<{
        list?: {
          label?: string;
          url?: string;
        };
      }>;
    };
  };
}

const Footer = ({ description, socialChannels, linkManagement }: FooterProps) => {
  const { shopDesign: { foreground } } = useThemeInfo()

  return (
    <footer>
      <hr className="border" style={{ borderColor: foreground }} />
      <div className="flex flex-col text-base">
        <div className="flex justify-center py-9 md:py-12 lg:py-14">
          <AppContainer>
            <div className="flex w-full flex-col justify-between md:flex-row">
              <FooterBranding socialChannels={socialChannels} description={description} />
              <FooterNavigation linkManagement={linkManagement} />
            </div>
          </AppContainer>
        </div>
        {/* Bottom Section */}
        <FooterLicence />
      </div>
    </footer>
  );
};

export default Footer;
