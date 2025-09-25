import { ComponentMd } from "../../assets/icon/StyleDesigner/Component/ComponentMd";
import { Button } from "../../components/ui/button";
import { Config } from "../../puck-editor";
import ButtonComponent from "./ButtonComponent";

type ButtonVariants = "secondary" | "outline" | "default";

export const buttonConfig = (variant: ButtonVariants): Config["components"][string] => {
    return {
        label: "Button",
        hideLabel: true,
        labelIcon: <ComponentMd color="#fff" />,
        visualExample: (
            <Button variant={variant} className={`w-[100px] mx-auto flex`}>
                Button
            </Button>
        ),
        fields: {
            appearance: {
                type: "object",
                label: "Appearance",
                objectFields: {
                    variant: {
                        type: "select",
                        label: "Style",
                        options: [
                            { value: "default", label: "Default" },
                            { value: "outline", label: "Outline" },
                            { value: "secondary", label: "Secondary" }
                        ],
                    }
                }
            },
            linkTo: {
                type: "object",
                label: "Link to",
                objectFields: {
                    data: {
                        type: "buttonlink",
                    }
                }
            }
        },
        defaultProps: {
            appearance: {
                variant: variant
            },
            linkTo: {
                data: {
                    url: "example.com",
                    type: "url",
                    label: "Button"
                }
            }
        },
        render: ({ appearance, linkTo }) => {
            return <ButtonComponent appearance={appearance} linkTo={linkTo} />;
        },
    };
};
