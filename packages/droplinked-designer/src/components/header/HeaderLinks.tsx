import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/legacy-components/typography/AppTypography'

interface Props {
    type: "vertical" | "horizontal"
    onClose?: () => void
    textColor?: string
    linkManagement?: { link: { label: string, url: string } }[]
}

function HeaderLinks({ type, onClose, textColor, linkManagement }: Props) {
    return (
        <Flex flexDirection={type === "vertical" ? "column" : "row"} gap="36px">
            {linkManagement?.map((item, idx) => (
                <AppTypography key={idx} {...(textColor && { color: textColor })} className='opacity-80 hover:opacity-100 transition-all'>
                    {item?.link?.label}
                </AppTypography>
            ))}
        </Flex>
    )
}

export default HeaderLinks