import { ComponentMd } from "assets/icon/StyleDesigner/Component/ComponentMd";
import Footer from "components/footer/Footer";
import { Config } from "puck-editor";

export const footerConfig: Config["components"][string] = {
    label: "Footer",
    labelIcon: <ComponentMd color="#fff" />,
    visualExample: <div></div>,
    permissions: {
        delete: false,
        drag: false,
        duplicate: false,
        insert: false,
    },
    fields: {
        description: {
            type: "object",
            label: "Description",
            objectFields: {
                text: {
                    type: "textarea",
                    placeholder: "Footer description text",
                }
            }
        },
        socialChannels: {
            type: "array",
            label: "Social Channels",
            max: 8,
            getItemSummary(item, index) {
                return `Link ${index + 1}`
            },
            arrayFields: {
                links: {
                    type: "socialChannels",
                }
            }
        },
        linkManagement: {
            type: "object",
            label: "Link Management",
            objectFields: {
                firstColumn: {
                    type: "object",
                    label: "First Column",
                    objectFields: {
                        name: {
                            type: "text",
                            label: "Name",
                            placeholder: "Column Name",
                        },
                        links: {
                            type: "array",
                            label: "noLabel",
                            getItemSummary(item, index) {
                                return `Link ${index + 1}`
                            },
                            arrayFields: {
                                list: {
                                    type: "link",
                                }
                            }
                        }
                    }
                },
                secondColumn: {
                    type: "object",
                    label: "Second Column",
                    objectFields: {
                        name: {
                            type: "text",
                            label: "Name",
                            placeholder: "Column Name",
                        },
                        links: {
                            type: "array",
                            label: "noLabel",
                            getItemSummary(item, index) {
                                return `Link ${index + 1}`
                            },
                            arrayFields: {
                                list: {
                                    type: "link",
                                }
                            }
                        }
                    }
                },
            }
        }
    },
    render: ({ description, socialChannels, linkManagement }) => {
        return (
            <Footer description={description} socialChannels={socialChannels} linkManagement={linkManagement} />
        )
    }
};
