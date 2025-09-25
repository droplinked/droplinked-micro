import { Config } from "../../puck-editor";

export const designLayoutCategory: Config["categories"] = {
    designLayout: {
        title: "Design Layout",
        templateColumns: "1fr 1fr",
        components: ["horizontalContainer", "verticalContainer", "gridContainer"],
    }
};
