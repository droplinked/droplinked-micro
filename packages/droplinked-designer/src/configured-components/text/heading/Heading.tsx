import React from "react";
import { fontWeightMap } from "../fontWeightMap";
import { HeadingProps } from "../types";

const Heading: React.FC<HeadingProps> = ({ content, typography, color }) => {
    const Tag = typography?.tag ?? "h1";

    const headingStyle: React.CSSProperties = {
        textAlign: typography?.alignment,
        color: color?.text,
        fontSize: typography?.size ? `${typography.size}${typography.size.toString().includes("px") ? "" : "px"}` : undefined,
        fontWeight: typography?.fontWeight ? fontWeightMap[typography.fontWeight] : undefined,
        margin: 0,
    };

    return React.createElement(Tag, { style: headingStyle }, content?.text);
};

export default Heading;
