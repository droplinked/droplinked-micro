import { Box } from '@chakra-ui/react'
import { ImageMd } from '../../../assets/icon/System/Image/ImageMd'

export default function ImageVisualExample() {
    return (
        <Box width="100%" paddingInline={6} paddingBlock={3} borderRadius={4} background="neutral.gray.900">
            <ImageMd color='#fff' style={{ margin: "auto" }} />
        </Box>
    )
}
