import { designLayoutCategory } from "./categoryConfig";
import { horizontalContainerConfig } from "./horizontal/configs/horizontalConfig";
import { verticalContainerConfig } from "./vertical/configs/verticalConfig";
import { gridContainerConfig } from "./grid/configs/gridConfig";

export { designLayoutCategory };

export const designLayoutComponents = {
    horizontalContainer: horizontalContainerConfig,
    verticalContainer: verticalContainerConfig,
    gridContainer: gridContainerConfig,
};