export interface TextContent {
    text: string;
}

export type TextAlign = "left" | "center" | "right";

export type FontWeightOption =
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold";

export interface BaseTypography {
    fontWeight: FontWeightOption;
    size: string;
    alignment: TextAlign;
}

export interface ColorStyle {
    text: string;
}

// Subtitle / Caption / Body
export interface SubtitleProps {
    content: TextContent;
    typography: BaseTypography;
    color: ColorStyle;
}

export type CaptionProps = SubtitleProps;
export type BodyProps = SubtitleProps;

// Heading adds a tag
export interface HeadingTypography extends BaseTypography {
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface HeadingProps {
    content: TextContent;
    typography: HeadingTypography;
    color: ColorStyle;
} 