import { Box, Flex, HStack } from "@chakra-ui/react"
import { HamburgermenuLg } from "assets/icon/Navigation/HamburgerMenu/HamburgermenuLg"
import AppLogo from "components/legacy-components/appLogo/AppLogo"
import AppContainer from "components/legacy-components/container/AppContainer"
import useThemeInfo from "hooks/useThemeInfo"
import HeaderIcons from "./HeaderIcons"
import HeaderLinks from "./HeaderLinks"

interface Props {
  linkManagement?: { link: { label: string, url: string } }[]
}

const Header = ({ linkManagement }: Props) => {
  const { shopDesign: { backgroundBody, iconHeaderColor } } = useThemeInfo()
  const headerBackground = backgroundBody
  const headerBoxShadow = "rgba(0, 0, 0, 0.25) 0px 0px 4px"
  const iconColor = iconHeaderColor

  return (
    <Flex
      as="header"
      top="0"
      right="0"
      left="0"
      width="full"
      justifyContent="center"
      backgroundColor={headerBackground}
      boxShadow={headerBoxShadow}
      transition="all 0.3s ease"
    >
      <AppContainer
        props={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingBlock: { base: 2, md: 5 }
        }}
      >
        <HStack gap={{ base: "16px", md: "100px" }}>
          <Box display={{ base: "block", md: "none" }}>
            <HamburgermenuLg color={iconColor} />
          </Box>
          <Box maxWidth="150px">
            <AppLogo height="31px" objectFit="contain" />
          </Box>
          <Box display={{ base: "none", md: "block" }}>
            <HeaderLinks type="horizontal" linkManagement={linkManagement} />
          </Box>
        </HStack>
        <HeaderIcons iconColor={iconColor} />
      </AppContainer>
    </Flex>
  )
}

export default Header