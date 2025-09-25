import { Config } from "../../puck-editor";

export const layoutCategoryConfig: Config["categories"] = {
    layout: {
        title: "Layout",
        visible: false,
        components: ["headerComponent", "footerComponent"],
    }
};
