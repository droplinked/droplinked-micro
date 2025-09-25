import { Box, HStack, IconProps } from '@chakra-ui/react'
import { CartMd } from 'assets/icon/System/Cart/CartMd'
import { UserMd } from 'assets/icon/System/User/UserMd'
import useThemeInfo from 'hooks/useThemeInfo'
import { isDarkColor } from 'lib/utils/app/helpers'
import * as React from 'react'

function HeaderIcons({ iconColor }: { iconColor: string }) {
    const { shopDesign: { backgroundBody } } = useThemeInfo()

    const renderIcon = (iconComponent: React.ReactElement, customStyles?: IconProps) => {
        return React.cloneElement(iconComponent, {
            cursor: "pointer",
            width: "40px",
            height: "40px",
            color: iconColor,
            style: {
                transition: 'all 0.5s ease',
                border: `1px solid ${isDarkColor(backgroundBody) ? "#292929" : "#F2F2F2"} `,
                padding: "10px",
                borderRadius: "8px",
                color: iconColor,
            },
            ...customStyles
        });
    };

    return (
        <HStack spacing={{ base: 4, lg: "4px" }}>
            {renderIcon(<CartMd />)}
            <Box display={{ base: "none", md: "block" }}>
                {renderIcon(<UserMd />)}
            </Box>
        </HStack>
    )
}

export default HeaderIcons