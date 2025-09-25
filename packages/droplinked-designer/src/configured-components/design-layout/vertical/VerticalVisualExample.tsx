import { Box, Flex } from '@chakra-ui/react'

export default function VerticalVisualExample() {
    return (
        <Flex gap={1} flexDirection="column" margin="auto" width="min-content">
            <Box width="84px" height="20px" background="neutral.gray.900" borderRadius={4} />
            <Box width="84px" height="20px" background="neutral.gray.900" borderRadius={4} />
        </Flex>
    )
}
