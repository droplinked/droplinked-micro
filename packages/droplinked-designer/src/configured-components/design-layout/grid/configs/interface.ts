export interface GridAlignment {
    columns: Array<{ content: any }>;
    numZones: number;
}

export interface GridGap {
    horizontal: number;
    vertical: number;
}

export interface GridPadding {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface GridContainerProps {
    alignment: GridAlignment;
    gap: GridGap;
    padding: GridPadding;
}
