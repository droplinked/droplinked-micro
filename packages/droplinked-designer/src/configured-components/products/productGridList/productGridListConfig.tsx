import { ComponentMd } from "assets/icon/StyleDesigner/Component/ComponentMd";
import ProductGridList from "components/product-grid/ProductGridList";
import { Config } from "puck-editor";

export const productGridListConfig: Config["components"][string] = {
    label: "Product Grid List",
    hideLabel: true,
    labelIcon: <ComponentMd color="#fff" />,
    visualExample: "https://upload-file-droplinked.s3.amazonaws.com/48e22076fa6101d2090d496c476cbe362d3de8c4db9c5be0bb00ec23b45585c4_or.png",
    fields: {
        filters: {
            type: "object",
            label: "Filters",
            objectFields: {
                visibility: {
                    type: "radio",
                    options: [
                        { label: "Visible", value: "visible" },
                        { label: "Hidden", value: "hidden" },
                    ]
                }
            }
        },
        searchBar: {
            type: "object",
            label: "Search Bar",
            objectFields: {
                visibility: {
                    type: "radio",
                    options: [
                        { label: "Visible", value: "visible" },
                        { label: "Hidden", value: "hidden" },
                    ]
                }
            }
        },
        sort: {
            type: "object",
            label: "Sort",
            objectFields: {
                visibility: {
                    type: "radio",
                    options: [
                        { label: "Visible", value: "visible" },
                        { label: "Hidden", value: "hidden" },
                    ]
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
                bottom: {
                    type: "number",
                    labelIcon: <p className="text-sm text-text-subtextPlaceholder-Dark"> px </p>,
                    label: "Bottom",
                }
            }
        }
    },
    defaultProps: {
        filters: {
            visibility: "visible",
        },
        searchBar: {
            visibility: "visible",
        },
        sort: {
            visibility: "visible",
        },
        padding: {
            top: 32,
            bottom: 32,
        }
    },
    render: ({ filters, searchBar, sort, padding: { top, bottom } }) => {
        return <ProductGridList filters={filters} searchBar={searchBar} sort={sort} top={top} bottom={bottom} />;
    },
}; 