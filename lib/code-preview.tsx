"use client";

import { ReactElement, useState, useTransition } from "react";
import { tokenizeCode } from "./shiki";
import { Textarea } from "./text-area";
import { ShikiRenderer } from "./shiki-renderer";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./select";
import { useRouter, useSearchParams } from "next/navigation";

interface CodePreviewProps {
  initialElement: ReactElement;
  theme: string;
  lang: string;
}

export function CodePreview({ initialElement, lang, theme }: CodePreviewProps) {
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
            const { tokens, background } = await tokenizeCode(
              code,
              lang,
              theme
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
        Highlight my {lang}!
      </Button>
      {element}
    </>
  );
}

interface ThemeDropdownProps {
  themes: string[];
  initialTheme: string;
}

export function ThemeDropdown({ themes, initialTheme }: ThemeDropdownProps) {
  const [theme, setTheme] = useState(initialTheme);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      value={theme}
      onValueChange={(value) => {
        setTheme(value);
        startTransition(() => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("theme", value);
          router.replace(`/?${newSearchParams.toString()}`);
        });
      }}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem key={theme} value={theme}>
            {theme}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
