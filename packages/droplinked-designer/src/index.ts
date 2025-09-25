import { blogPostsCategory, blogPostsComponents } from "configured-components/blog-posts";
import { buttonCategoryConfig, buttonComponents } from "configured-components/button";
import { designLayoutCategory, designLayoutComponents } from "configured-components/design-layout";
import { layoutCategoryConfig, layoutComponents } from "configured-components/layout";
import { mediaCategoryConfig, mediaComponents } from "configured-components/media";
import { multiColumnCategory, multiColumnComponents } from "configured-components/multicolumn";
import { productsCategory, productsComponents } from "configured-components/products";
import { textCategoryConfig, textComponents } from "configured-components/text";
import { Config } from "puck-editor";

export { default as Editor } from "./Editor";
export * from "puck-editor";
export type { Config } from "puck-editor";

export const EditorMainConfig: Config = {
    root: {
        fields: {
            title: {
                type: "text",
                label: "Shop Title",
                placeholder: "The title of your shop",
            }
        }
    },
    categories: {
        ...designLayoutCategory,
        ...mediaCategoryConfig,
        ...buttonCategoryConfig,
        ...textCategoryConfig,
        ...layoutCategoryConfig,
        ...productsCategory,
        ...blogPostsCategory,
        ...multiColumnCategory,
    },
    components: {
        ...designLayoutComponents,
        ...mediaComponents,
        ...buttonComponents,
        ...textComponents,
        ...layoutComponents,
        ...productsComponents,
        ...blogPostsComponents,
        ...multiColumnComponents,
    }
};