import { ArrowrightSm } from "assets/icon/Navigation/ArrowRight/ArrowrightSm";
import Text from "components/ui/Text";
import useThemeInfo from "hooks/useThemeInfo";
import React from "react";

interface LinkItem {
  caption: string;
  link: string;
}

interface CommonLinksProps {
  links: LinkItem[];
  linkTextClass: string;
  isDynamic?: boolean;
}

interface FooterNavigationProps {
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

export default function FooterNavigation({ linkManagement }: FooterNavigationProps) {
  const { isDarkTheme } = useThemeInfo();

  const textClass = isDarkTheme ? "text-white" : "text-black";
  const linkTextClass = isDarkTheme ? "text-[#7B7B7B] hover:text-white" : "text-[#B1B1B1] hover:text-black";

  // Extract columns and links according to new structure
  const firstColumnName = linkManagement?.firstColumn?.name ?? "First Column";
  const firstColumnLinks: LinkItem[] =
    linkManagement?.firstColumn?.links?.map(link => ({
      caption: link.list?.label ?? "",
      link: link.list?.url ?? "#"
    })) ?? [];

  const secondColumnName = linkManagement?.secondColumn?.name ?? "Second Column";
  const secondColumnLinks: LinkItem[] =
    linkManagement?.secondColumn?.links?.map(link => ({
      caption: link.list?.label ?? "",
      link: link.list?.url ?? "#"
    })) ?? [];

  return (
    <div className="flex">
      <div className="flex w-full flex-shrink flex-col gap-12 md:flex-row">
        {firstColumnLinks.length > 0 && (
          <div className="mb-4 w-full md:mb-0 md:w-auto">
            <Text className={`mb-2 text-sm ${textClass}`}>{firstColumnName}</Text>
            <CommonLinks links={firstColumnLinks} linkTextClass={linkTextClass} isDynamic />
          </div>
        )}
        {secondColumnLinks.length > 0 && (
          <div className="mb-4 w-full md:mb-0 md:w-auto">
            <Text className={`mb-2 text-sm ${textClass}`}>{secondColumnName}</Text>
            <CommonLinks links={secondColumnLinks} linkTextClass={linkTextClass} isDynamic />
          </div>
        )}
      </div>
    </div>
  );
}

const CommonLinks: React.FC<CommonLinksProps> = ({ links, linkTextClass, isDynamic = false }) =>
  links.length ? (
    <ul className="space-y-2">
      {links.map(({ caption, link }, index) => (
        <li key={index}>
          {isDynamic ? (
            <a href={link} target="_self" rel="noopener noreferrer" className="group flex">
              <Text className={`relative flex items-center text-sm ${linkTextClass}`}>
                {caption}
                <ArrowrightSm className="ml-1 h-4 w-4 translate-x-[-4px] transform opacity-0 transition duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
              </Text>
            </a>
          ) : (
            <Text className={`relative flex items-center text-sm ${linkTextClass}`}>
              {caption}
              <ArrowrightSm className="ml-1 h-4 w-4 translate-x-[-4px] transform opacity-0 transition duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
            </Text>
          )}
        </li>
      ))}
    </ul>
  ) : null;
