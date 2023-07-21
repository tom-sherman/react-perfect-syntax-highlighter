import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  id?: string;
}

export function Heading1({ children, id }: Props) {
  return (
    <h1
      id={id}
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
    >
      {children}
    </h1>
  );
}

export function Heading2({ children, id }: Props) {
  return (
    <h2
      id={id}
      className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl"
    >
      {children}
    </h2>
  );
}

export function Paragraph({ children, id }: Props) {
  return (
    <p id={id} className="leading-7 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  );
}
