import { bodyConfig } from "./body/bodyConfig";
import { captionConfig } from "./caption/captionConfig";
import { headingConfig } from "./heading/headingConfig";
import { subtitleConfig } from "./subtitle/subtitleConfig";

export { textCategoryConfig } from "./categoryConfig";

export const textComponents = {
    heading: headingConfig,
    subtitle: subtitleConfig,
    caption: captionConfig,
    body: bodyConfig,
};
