export interface HorizontalAlignment {
    columns: Array<{ content: any }>;
    numZones: number;
    position: "left" | "center" | "right";
    wrap: "nowrap" | "wrap";
}

export interface HorizontalGap {
    amount: number;
}

export interface HorizontalPadding {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface HorizontalContainerProps {
    alignment: HorizontalAlignment;
    gap: HorizontalGap;
    padding: HorizontalPadding;
}
