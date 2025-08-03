import { GridMd } from "../../../../assets/icon/Navigation/Grid/GridMd";
import { Config } from "../../../../puck-editor";
import Horizontal from "../Horizontal";
import HorizontalVisualExample from "../HorizontalVisualExample";

export const horizontalContainerConfig: Config["components"][string] = {
    label: "Horizontal",
    labelIcon: <GridMd color="#fff" />,
    visualExample: <HorizontalVisualExample />,
    gridColumn: "span 1",
    fields: {
        alignment: {
            type: "object",
            label: "Alignment",
            objectFields: {
                columns: {
                    type: "array",
                    arrayFields: {
                        content: { type: "slot" },
                    },
                    visible: false,
                },
                numZones: {
                    type: "number",
                    label: "Columns",
                    min: 1,
                    max: 12,
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
                wrap: {
                    type: "radio",
                    label: "Wrap Content",
                    options: [
                        { label: "No", value: "nowrap" },
                        { label: "Yes", value: "wrap" }
                    ]
                },
            }
        },
        gap: {
            type: "object",
            label: "Gap",
            objectFields: {
                amount: {
                    type: "number",
                    labelIcon: <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>,
                    label: "Horizontal",
                }
            }
        },
        padding: {
            type: "object",
            label: "Padding",
            objectFields: {
                top: {
                    type: "number",
                    labelIcon: <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>,
                    label: "Top",
                },
                right: {
                    type: "number",
                    labelIcon: <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>,
                    label: "Right",
                },
                bottom: {
                    type: "number",
                    labelIcon: <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>,
                    label: "Bottom",
                },
                left: {
                    type: "number",
                    labelIcon: <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>,
                    label: "Left",
                }
            }
        },
    },
    defaultProps: {
        alignment: {
            columns: [],
            numZones: 2,
            position: "left",
            wrap: "wrap"
        },
        gap: {
            amount: 8
        },
        padding: {
            top: 8,
            right: 8,
            bottom: 8,
            left: 8
        }
    },
    resolveData: (data, params) => {
        if (!params.changed.alignment || data.props.alignment.numZones < 0) {
            return data;
        }
        const newData = { ...data, props: { ...data.props } };
        newData.props.alignment = { ...newData.props.alignment };
        newData.props.alignment.columns = [];
        for (let i = 0; i < newData.props.alignment.numZones; i++) {
            newData.props.alignment.columns.push(
                data.props.alignment.columns?.[i] ?? { content: [] }
            );
        }
        return newData;
    },
    render: ({ alignment, gap, padding }) => (
        <Horizontal
            alignment={alignment}
            gap={gap}
            padding={padding}
        />
    )
};
