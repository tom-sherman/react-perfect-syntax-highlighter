import { ReactNode } from "react";

export function Stack({
  children,
  space,
}: {
  children: ReactNode;
  space: number;
}) {
  return (
    <div className="flex flex-col" style={{ gap: `${space}rem` }}>
      {children}
    </div>
  );
}
