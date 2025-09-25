export interface VerticalAlignment {
    rows: Array<{ content: any }>;

    numZones: number;
    position: "top" | "center" | "bottom";
}

export interface VerticalGap {
    amount: number;
}

export interface VerticalPadding {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface VerticalContainerProps {
    alignment: VerticalAlignment;
    gap: VerticalGap;
    padding: VerticalPadding;
}
