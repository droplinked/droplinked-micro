import { Flex, FlexProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
    props?: FlexProps
    mini?: boolean
}

function AppContainer({ children, props, mini }: IProps) {

    return (
        <Flex
            width={{ base: "90%", md: "90%" }}
            maxWidth={mini ? "700px" : "100%"}
            {...props}
        >
            {children}
        </Flex>
    )
}

export default AppContainer