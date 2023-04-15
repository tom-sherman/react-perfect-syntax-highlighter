"use client";

import { ReactElement, useState, useTransition } from "react";
import { tokenizeCode } from "./shiki";
import { Textarea } from "./text-area";
import { ShikiRenderer } from "./shiki-renderer";
import { Button } from "./button";

interface Props {
  initialElement: ReactElement;
}

export function CodePreview({ initialElement }: Props) {
  const [isPending, startTransition] = useTransition();
  const [code, setCode] = useState("");
  const [element, setElement] = useState(initialElement);

  return (
    <>
      <Textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <Button
        disabled={isPending}
        onClick={async () => {
          try {
            const lang = "tsx";
            const { tokens, background } = await tokenizeCode(
              code,
              lang,
              "github-dark"
            );
            startTransition(() => {
              setElement(
                <ShikiRenderer
                  tokens={tokens}
                  lang={lang}
                  background={background}
                />
              );
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Highlight my typescript!
      </Button>
      {element}
    </>
  );
}
