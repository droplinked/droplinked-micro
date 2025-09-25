import PLPIcons from 'assets/icons/PLP/PLPIcons';
import { DropdownMenu, DropdownMenuTrigger } from 'components/ui/dropdown-menu';
import useThemeInfo from 'hooks/useThemeInfo';
import Text from 'components/ui/Text';

function SortDropdown() {
  const { isDarkTheme } = useThemeInfo();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex w-[250px] select-none items-center justify-between rounded-lg border border-shop-borderColor bg-transparent px-4 py-3`}
      >
        <Text
          as="span"
          className={`text-sm font-normal ${isDarkTheme ? 'text-[#7B7B7B]' : 'text-[#B1B1B1]'}`}
        >
          Sort Products
        </Text>
        <PLPIcons.GrayChevronDown />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}

export default SortDropdown;
