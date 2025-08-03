import AppIcons from 'assets/icons/appIcons';
import AppContainer from 'components/legacy-components/container/AppContainer';
import Text from 'components/ui/Text';
import useThemeInfo from 'hooks/useThemeInfo';

const FooterLicence = () => {
  const { isDarkTheme, shopDesign: { foreground } } = useThemeInfo();

  const linkTextClass = isDarkTheme ? 'text-text-subtextPlaceholder-Dark' : 'text-text-subtextPlaceholder-Light';
  const logoColor = isDarkTheme ? 'text-white' : 'text-black';

  return (
    <div className="py-4" style={{ backgroundColor: foreground }}>
      <div className="flex justify-center">
        <AppContainer>
          <div className="flex flex-col justify-between md:flex-grow md:flex-row">
            <Text className={`flex text-sm ${linkTextClass}`}>
              Powered by <AppIcons.DroplinkedLogo className={`ml-2 h-5 ${logoColor}`} />
            </Text>
          </div>
        </AppContainer>
      </div>
    </div>
  );
};

export default FooterLicence;
