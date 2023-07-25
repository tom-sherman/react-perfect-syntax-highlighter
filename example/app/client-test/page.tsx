"use client";
import { Textarea } from "@/lib/text-area";
import { Suspense, startTransition, useState } from "react";
import { CodeBlock } from "react-perfect-syntax-highlighter";

export default function Page() {
  const [code, setCode] = useState("const x = 40 + 2;");
  return (
    <>
      <Textarea
        value={code}
        onChange={(e) => {
          startTransition(() => {
            setCode(e.currentTarget.value);
          });
        }}
      />
      <Suspense>
        <CodeBlock lang="tsx" theme="github-dark" code={code} />
      </Suspense>
    </>
  );
}
