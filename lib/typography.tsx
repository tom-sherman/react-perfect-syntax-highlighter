import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Heading1({ children }: Props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

export function Paragraph({ children }: Props) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
