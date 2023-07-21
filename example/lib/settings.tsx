"use client";

import { ReactNode, useEffect, useRef, useState, useTransition } from "react";
import { Textarea } from "./text-area";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Stack } from "./stack";
import { cn, isValidTheme } from "./utils";

interface DropdownProps {
  options: string[];
  initialOption: string;
  name: string;
}

export function SettingsDropdown({
  options,
  name,
  initialOption,
}: DropdownProps) {
  const [option, setOption] = useState(initialOption);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <Select
      value={option}
      onValueChange={(value) => {
        setOption(value);
        startTransition(() => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set(name, value);
          router.replace(`${pathname}?${newSearchParams.toString()}`);
        });
      }}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={name} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface CodePreview {
  initialCode: ReactNode;
  initialCodeString: string;
  tokenizeCode: typeof import("react-perfect-syntax-highlighter").experimental_tokenizeCode;
}

export function CodePreview({
  initialCode,
  initialCodeString,
  tokenizeCode,
}: CodePreview) {
  const [code, setCode] = useState(initialCode);
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const theme = searchParams.get("theme") ?? "github-dark";
  const lang = searchParams.get("lang") ?? "tsx";
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!isValidTheme(theme)) {
    throw new Error(`Invalid theme: ${theme}`);
  }

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) {
      return;
    }
    tokenizeCode(textAreaRef.current.value, lang, theme).then((tokenized) => {
      startTransition(() => {
        setCode(tokenized);
      });
    });
  }, [lang, theme]);

  return (
    <Stack space={1}>
      <Textarea
        ref={textAreaRef}
        spellCheck={false}
        defaultValue={initialCodeString}
        onChange={async (e) => {
          const tokenized = await tokenizeCode(e.target.value, lang, theme);
          startTransition(() => {
            setCode(tokenized);
          });
        }}
      />

      <div
        className={cn(
          {
            "animate-pulse": isPending,
          },
          "[&>pre]:overflow-x-auto [&>pre]:p-4 [&>pre]:rounded"
        )}
      >
        {code}
      </div>
    </Stack>
  );
}
