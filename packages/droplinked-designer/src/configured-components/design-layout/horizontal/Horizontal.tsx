import { HorizontalContainerProps } from "./configs/interface";

const Horizontal: React.FC<HorizontalContainerProps> = ({ alignment, gap, padding }) => {
    // Use the props to style the component
    const style = {
        display: "flex",
        flexDirection: "row" as const,
        justifyContent: alignment.position === "center" ? "center" : alignment.position === "right" ? "flex-end" : "flex-start",
        flexWrap: alignment.wrap as "wrap" | "nowrap",
        gap: `${gap.amount}px`,
        padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
    };

    return (
        <div className="horizontal-container" style={style}>
            {alignment.columns.map(({ content: Content }, index) => (
                <div key={index} style={{ width: "min-content", minWidth: "200px" }}>
                    <Content />
                </div>
            ))}
        </div>
    );
};

export default Horizontal;