import ImageVisualExample from "./ImageVisualExample";
import { Config } from "../../../puck-editor";
import ImageComponent from "./ImageComponent";
import { ImageMd } from "../../../assets/icon/System/Image/ImageMd";

export const imageConfig: Config["components"][string] = {
    label: "Image",
    labelIcon: <ImageMd color="#fff" />,
    visualExample: <ImageVisualExample />,
    gridColumn: "span 1",
    fields: {
        content: {
            type: "object",
            label: "Content",
            objectFields: {
                image: {
                    type: "image",
                }
            }
        },
        alignment: {
            type: "object",
            label: "Alignment",
            objectFields: {
                width: {
                    type: "number",
                    label: "Width",
                    labelIcon: <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>,
                },
                height: {
                    type: "number",
                    label: "Height",
                    labelIcon: <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>,
                },
                position: {
                    type: "select",
                    label: "Position",
                    options: [
                        { label: "Left", value: "left" },
                        { label: "Center", value: "center" },
                        { label: "Right", value: "right" }
                    ],
                },
            },
        },
    },
    defaultProps: {
        content: {
            image: ""
        },
        alignment: {
            width: 300,
            height: 200
        }
    },
    render: ({ content: { image }, alignment }) => {
        return (
            <ImageComponent image={image} alignment={alignment} />
        )
    }
};
