import { GridMd } from "../../../../assets/icon/Navigation/Grid/GridMd";
import GridVisualExample from "../GridVisualExample";
import Grid from "../Grid";
import { Config } from "../../../../puck-editor";

export const gridContainerConfig: Config["components"][string] = {
    label: "Grid",
    labelIcon: <GridMd color="#fff" />,
    visualExample: <GridVisualExample />,
    gridColumn: "span 2",
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
                    label: "Cells",
                    min: 1,
                    max: 24,
                }
            }
        },
        gap: {
            type: "object",
            label: "Gap",
            objectFields: {
                horizontal: {
                    type: "number",
                    labelIcon: <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>,
                    label: "Horizontal",
                },
                vertical: {
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
            columns: [],
            numZones: 6
        },
        gap: {
            horizontal: 8,
            vertical: 8
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
    render: ({ alignment, gap, padding }) => {
        return (
            <Grid
                alignment={alignment}
                gap={gap}
                padding={padding}
            />
        )
    }
};
