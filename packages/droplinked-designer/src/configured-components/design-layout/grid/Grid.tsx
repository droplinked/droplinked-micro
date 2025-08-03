import { GridContainerProps } from "./configs/interface";

const Grid: React.FC<GridContainerProps> = ({ alignment, gap, padding }) => {
    const style = {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        gap: `${gap.vertical}px ${gap.horizontal}px`,
        padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
    };

    return (
        <div className="grid-container" style={style}>
            {alignment.columns.map(({ content: Content }, index) => (
                <div key={index} style={{ minHeight: "80px" }}>
                    <Content />
                </div>
            ))}
        </div>
    );
};

export default Grid;
