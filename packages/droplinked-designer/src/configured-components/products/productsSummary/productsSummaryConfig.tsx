import { ComponentMd } from "assets/icon/StyleDesigner/Component/ComponentMd";
import { Config } from "puck-editor";
import ProductsSummary from "./ProductsSummary";

export const productsSummaryConfig: Config["components"][string] = {
    label: "Products Summary",
    hideLabel: true,
    labelIcon: <ComponentMd color="#fff" />,
    visualExample: "https://upload-file-droplinked.s3.amazonaws.com/f375609d4d0f539ec3adaac4864adbdf38dacb029159d04bedd9bbc98aa792ec_or.png",
    fields: {
        title: {
            type: "object",
            label: "Title",
            objectFields: {
                text: {
                    type: "textarea",
                }
            }
        }
    },
    defaultProps: {
        title: {
            text: "Products"
        }
    },
    render: ({ title: { text } }) => {
        return <ProductsSummary title={text} />;
    },
}; 