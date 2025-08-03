import { DropZone } from "../../../puck-editor";
import { VerticalContainerProps } from "./configs/interface";

const Vertical: React.FC<VerticalContainerProps> = ({ alignment, gap, padding }) => {
    const style = {
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: alignment.position === "center" ? "center" : alignment.position === "bottom" ? "flex-end" : "flex-start",
        gap: `${gap.amount}px`,
        padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
    };

    return (
        <div className="vertical-container" style={style}>
            {alignment.rows.map(({ content: Content }, index) => (
                <div key={index} style={{ height: "min-content", minHeight: "80px" }}>
                    <Content />
                </div>
            ))}
        </div>
    );
};

export default Vertical;