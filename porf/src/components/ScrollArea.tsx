import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode
  className?: string
  style?: CSSProperties
};

export function ScrollArea({ children, className, style }: Props) {
  return (
    <div className={className ? `scroll-area ${className}` : "scroll-area"} style={style}>
      {children}
    </div>
  );
}
