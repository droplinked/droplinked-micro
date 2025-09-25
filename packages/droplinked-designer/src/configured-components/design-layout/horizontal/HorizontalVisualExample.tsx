import { Box, Flex } from '@chakra-ui/react'

export default function HorizontalVisualExample() {
    return (
        <Flex gap={1} margin="auto" width="min-content">
            <Box width="40px" height="44px" background="neutral.gray.900" borderRadius={4} />
            <Box width="40px" height="44px" background="neutral.gray.900" borderRadius={4} />
        </Flex>
    )
}
