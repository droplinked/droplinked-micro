import { Text } from "@chakra-ui/react";
import { FontsizeMd } from "assets/icon/StyleDesigner/FontSize/FontsizeMd";
import { TextaligncenterSm } from "assets/icon/StyleDesigner/TextAlignCenter/TextaligncenterSm";
import { TextalignleftSm } from "assets/icon/StyleDesigner/TextAlignLeft/TextalignleftSm";
import { TextalignrightSm } from "assets/icon/StyleDesigner/TextAlignRight/TextalignrightSm";
import { Config } from "puck-editor";
import TextElement from "./TextElement";
import type { FontWeightOption } from "./types";

interface TextConfigOptions {
    label: string;
    visualExampleFontSize: number;
    visualExampleFontWeight?: string;
    defaultFontSize: string;
    defaultFontWeight: FontWeightOption;
}

export const createTextConfig = ({
    label,
    visualExampleFontSize,
    visualExampleFontWeight = "normal",
    defaultFontSize,
    defaultFontWeight,
}: TextConfigOptions): Config["components"][string] => {
    return {
        label,
        hideLabel: true,
        labelIcon: <FontsizeMd color="#fff" />,
        visualExample: (
            <Text
                textAlign="center"
                fontSize={visualExampleFontSize}
                fontWeight={visualExampleFontWeight}
                color="text.white"
            >
                {label}
            </Text>
        ),
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
                        labelIcon: (
                            <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>
                        ),
                    },
                    alignment: {
                        type: "radio",
                        label: "Alignment",
                        options: [
                            { label: <TextalignleftSm />, value: "left" },
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
                fontWeight: defaultFontWeight,
                size: defaultFontSize,
                alignment: "left",
            },
            color: {
                text: "#FFFFFF",
            },
        },
        render: ({ content, typography, color }) => {
            return (
                <TextElement content={content} typography={typography} color={color} />
            );
        },
    };
}; 