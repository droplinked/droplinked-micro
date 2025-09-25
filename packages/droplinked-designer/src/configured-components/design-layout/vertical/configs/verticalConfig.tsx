import { GridMd } from "../../../../assets/icon/Navigation/Grid/GridMd";
import VerticalVisualExample from "../VerticalVisualExample";
import Vertical from "../Vertical";
import { Config } from "../../../../puck-editor";

export const verticalContainerConfig: Config["components"][string] = {
    label: "Vertical",
    labelIcon: <GridMd color="#fff" />,
    visualExample: <VerticalVisualExample />,
    gridColumn: "span 1",
    fields: {
        alignment: {
            type: "object",
            label: "Alignment",
            objectFields: {
                rows: {
                    type: "array",
                    arrayFields: {
                        content: { type: "slot" },
                    },
                    visible: false,
                },
                numZones: {
                    type: "number",
                    label: "Rows",
                    min: 1,
                    max: 12,
                },
                position: {
                    type: "select",
                    label: "Position",
                    options: [
                        { label: "Top", value: "top" },
                        { label: "Center", value: "center" },
                        { label: "Bottom", value: "bottom" }
                    ],
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
                    label: "Vertical",
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
            rows: [],
            numZones: 2,
            position: "top",
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
        newData.props.alignment.rows = [];
        for (let i = 0; i < newData.props.alignment.numZones; i++) {
            newData.props.alignment.rows.push(
                data.props.alignment.rows?.[i] ?? { content: [] }
            );
        }
        return newData;
    },
    render: ({ alignment, gap, padding }) => {
        return (
            <Vertical
                alignment={alignment}
                gap={gap}
                padding={padding}
            />
        )
    }
};
