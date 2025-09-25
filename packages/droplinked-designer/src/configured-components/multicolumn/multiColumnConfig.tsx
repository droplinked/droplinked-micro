import { Box, Image } from "@chakra-ui/react";
import { ComponentMd } from "assets/icon/StyleDesigner/Component/ComponentMd";
import { Config } from "puck-editor";
import MultiColumn from "./MultiColumn";

export const multiColumnConfig: Config["components"][string] = {
    label: "Features",
    hideLabel: true,
    labelIcon: <ComponentMd color="#fff" />,
    visualExample: "https://upload-file-droplinked.s3.amazonaws.com/9cf3148598409340c043a046652f922284bd92c9330eb9387fb333eba7320a10_or.png",
    fields: {
        card1: {
            type: "object",
            label: "Card 1",
            objectFields: {
                title: { type: "textarea", label: "Title" },
                subtitle: { type: "textarea", label: "Subtitle" },
            },
        },
        card2: {
            type: "object",
            label: "Card 2",
            objectFields: {
                title: { type: "textarea", label: "Title" },
                subtitle: { type: "textarea", label: "Subtitle" },
            },
        },
        card3: {
            type: "object",
            label: "Card 3",
            objectFields: {
                title: { type: "textarea", label: "Title" },
                subtitle: { type: "textarea", label: "Subtitle" },
            },
        },
        card4: {
            type: "object",
            label: "Card 4",
            objectFields: {
                title: { type: "textarea", label: "Title" },
                subtitle: { type: "textarea", label: "Subtitle" },
            },
        },
    },
    defaultProps: {
        card1: { title: "Title 1", subtitle: "Subtitle 1" },
        card2: { title: "Title 2", subtitle: "Subtitle 2" },
        card3: { title: "Title 3", subtitle: "Subtitle 3" },
        card4: { title: "Title 4", subtitle: "Subtitle 4" },
    },
    render: ({ card1, card2, card3, card4 }) => {
        return <MultiColumn card1={card1} card2={card2} card3={card3} card4={card4} />;
    },
}; 