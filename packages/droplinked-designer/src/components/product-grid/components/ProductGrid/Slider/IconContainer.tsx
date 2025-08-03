import { cn } from "lib/utils/cn";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    className?: string
    onClick?: (event: React.MouseEvent) => void
}

function IconContainer({ className, onClick, children }: Props) {
    return (
        <div
            className={cn(
                "p-[6px] border-[0.5px] border-[#DEDEDE] rounded bg-[rgba(255,255,255,0.75)] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] backdrop-blur-[4px]",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default IconContainer