import { Icon, IconProps } from "@chakra-ui/react";
import useThemeInfo from "hooks/useThemeInfo";

/**
 * Interface for CustomIcon props extending Chakra UI's IconProps
 * @interface Props
 * @extends IconProps
 * @property {any} as - Component to be rendered as the icon
 */
interface Props extends IconProps {
    as: any;
}

/**
 * A custom icon component that extends Chakra UI's Icon with theme awareness
 * @param {Props} props - Component props
 * @param {any} props.as - Component to be rendered as the icon
 * @returns {JSX.Element} The CustomIcon component
 */
const CustomIcon = ({ as, ...props }: Props) => {
    const { isDarkTheme } = useThemeInfo()

    return (
        <Icon
            as={as}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize={16}
            fontWeight={400}
            color={props.color || isDarkTheme ? '#FFF' : '#000'}
            cursor={"pointer"}
            {...props}
        >
            {props.children}
        </Icon>
    )
}

export default CustomIcon