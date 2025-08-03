import { ComponentMd } from "assets/icon/StyleDesigner/Component/ComponentMd";
import Header from "components/header/Header";
import { Config } from "puck-editor";

export const headerConfig: Config["components"][string] = {
    label: "Header",
    labelIcon: <ComponentMd color="#fff" />,
    visualExample: <div></div>,
    permissions: {
        delete: false,
        drag: false,
        duplicate: false,
        insert: false,
    },
    fields: {
        linkManagement: {
            type: "array",
            label: "Link Management",
            min: 1,
            max: 10,
            getItemSummary(item, index) {
                return `Link ${index + 1}`;
            },
            arrayFields: {
                link: {
                    type: "link",
                    label: "Link",
                }
            }
        }
    },
    defaultProps: {
        linkManagement: [
            {
                link: {
                    label: "Home",
                    url: "droplinked.io/unstoppable"
                }
            },
            {
                link: {
                    label: "Blogs",
                    url: "droplinked.io/unstoppable/blogs"
                }
            },
            {
                link: {
                    label: "Collections",
                    url: "droplinked.io/unstoppable/collections"
                }
            }
        ]
    },
    render: ({ linkManagement }) => {
        return (
            <Header linkManagement={linkManagement} />
        )
    }
};
