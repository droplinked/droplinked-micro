import { FontsizeMd } from "assets/icon/StyleDesigner/FontSize/FontsizeMd";
import { TextaligncenterSm } from "assets/icon/StyleDesigner/TextAlignCenter/TextaligncenterSm";
import { TextalignleftSm } from "assets/icon/StyleDesigner/TextAlignLeft/TextalignleftSm";
import { TextalignrightSm } from "assets/icon/StyleDesigner/TextAlignRight/TextalignrightSm";
import { Config } from "puck-editor";
import Heading from "./Heading";
import HeadingVisualExample from "./HeadingVisualExample";

export const headingConfig: Config["components"][string] = {
    label: "Heading",
    hideLabel: true,
    labelIcon: <FontsizeMd color="#fff" />,
    visualExample: <HeadingVisualExample />,
    fields: {
        content: {
            type: "object",
            label: "Content",
            objectFields: {
                text: { type: "textarea", label: "Text" },
            },
        },
        typography: {
            type: "object",
            label: "Typography",
            objectFields: {
                tag: {
                    type: "select",
                    label: "Tag",
                    options: [
                        { label: "H1", value: "h1" },
                        { label: "H2", value: "h2" },
                        { label: "H3", value: "h3" },
                        { label: "H4", value: "h4" },
                        { label: "H5", value: "h5" },
                        { label: "H6", value: "h6" },
                    ],
                },
                fontWeight: {
                    type: "select",
                    label: "Font Weight",
                    options: [
                        { label: "Thin", value: "thin" },
                        { label: "Extra Light", value: "extralight" },
                        { label: "Light", value: "light" },
                        { label: "Normal", value: "normal" },
                        { label: "Medium", value: "medium" },
                        { label: "Semi Bold", value: "semibold" },
                        { label: "Bold", value: "bold" },
                        { label: "Extra Bold", value: "extrabold" },
                    ],
                },
                size: {
                    type: "text",
                    label: "Size",
                    labelIcon: <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>,
                },
                alignment: {
                    type: "radio",
                    label: "Alignment",
                    options: [
                        { label: <TextalignleftSm />, value: "left", },
                        { label: <TextaligncenterSm />, value: "center" },
                        { label: <TextalignrightSm />, value: "right" },
                    ],
                },
            },
        },
        color: {
            type: "object",
            label: "Color",
            objectFields: {
                text: { type: "color", label: "Style" },
            },
        },
    },
    defaultProps: {
        content: {
            text: "Your favorite finds, all in one cart.",
        },
        typography: {
            tag: "h1",
            fontWeight: "bold",
            size: "36",
            alignment: "left",
        },
        color: {
            text: "#FFFFFF",
        },
    },
    render: ({ content, typography, color }) => {
        return (
            <Heading
                content={content}
                typography={typography}
                color={color}
            />
        );
    },
}; 