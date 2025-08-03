import { Box, Grid } from '@chakra-ui/react'

export default function GridVisualExample() {
    return (
        <Grid margin="auto" width="min-content" templateColumns="repeat(5, 1fr)" templateRows="repeat(2, 1fr)" gap={1}>
            {Array.from({ length: 10 }, (_, index) => (
                <Box key={index} width="40px" height="20px" background="neutral.gray.900" borderRadius={4} />
            ))}
        </Grid>
    )
}