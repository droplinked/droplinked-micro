import React from "react";
import { fontWeightMap } from "./fontWeightMap";
import { SubtitleProps } from "./types";

const TextElement: React.FC<SubtitleProps> = ({ content, typography, color }) => {
    const style: React.CSSProperties = {
        textAlign: typography?.alignment,
        color: color?.text,
        fontSize: typography?.size
            ? `${typography.size}${typography.size.toString().includes("px") ? "" : "px"}`
            : undefined,
        fontWeight: typography?.fontWeight
            ? fontWeightMap[typography.fontWeight]
            : undefined,
        margin: 0,
    };

    return <p style={style}>{content?.text}</p>;
};

export default TextElement; 