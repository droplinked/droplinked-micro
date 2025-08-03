import { Image, ImageProps } from '@chakra-ui/react'
import { createUsePuck } from 'puck-editor'

interface IProps extends ImageProps {
}

const usePuck = createUsePuck()

const AppLogo = ({ ...props }: ImageProps) => {
    const logo = usePuck((s) => s.appState.data.shopDefaultData.logo)

    return (
        <Image
            src={props?.src || logo}
            height="45px"
            maxWidth="100%"
            {...props}
        />
    )
}

export default AppLogo