import { Flex, Image } from "@chakra-ui/react";
import { isDarkColor } from "lib/utils/app/helpers";
import { createUsePuck } from "puck-editor";

interface Props {
    image: string;
    alignment?: {
        width?: number;
        height?: number;
        position?: "left" | "center" | "right";
    };
}

const usePuck = createUsePuck();

export default function ImageComponent({ image, alignment }: Props) {
    const backgroundBody = usePuck((s) => s.appState.data.shopDefaultData.shopDesign.backgroundBody)

    const isDark = isDarkColor(backgroundBody)
    const imagePlaceholder = isDark ? "https://upload-file-droplinked.s3.amazonaws.com/b4b9c7da8f6a971de3a00086318f821b6db3b04f0f8b73e6118d79514a33c7a4_or.png" : "https://upload-file-droplinked.s3.amazonaws.com/a2c47cc1ea7767a55b895e4104d29c856c9f2808ce69fccd5f2c02d895134c59_or.png";
    const imageSrc = image || imagePlaceholder;
    const width = `${alignment?.width}px`;
    const height = `${alignment?.height}px`;

    return (
        <Flex justifyContent={alignment?.position} alignItems="center">
            <Image src={imageSrc} width={width} height={height} />
        </Flex>
    )
}
