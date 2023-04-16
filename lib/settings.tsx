"use client";

import { cache, use, useDeferredValue, useState, useTransition } from "react";
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
import { ShikiProps, tokenizeCode } from "./shiki";
import { ShikiRenderer } from "./shiki-renderer";
import { cn } from "./utils";

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
  initialCode: string;
}

export function CodePreview({ initialCode }: CodePreview) {
  const [code, setCode] = useState(initialCode);
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") ?? "github-dark";
  const lang = searchParams.get("lang") ?? "tsx";

  return (
    <Stack space={1}>
      <Textarea
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />

      <ShikiClient code={code} lang={lang} theme={theme} />
    </Stack>
  );
}

// This code is really not ideal as it sends a request for every keystroke...
// Probably because use() and cache() aren't properly supported yet.
// The UX is mostly correct though.
const cachedTokenizeCode = cache((code: string, lang: string, theme: string) =>
  tokenizeCode(code, lang, theme)
);

function ShikiClient({ code, lang, theme }: ShikiProps) {
  const deferredCode = useDeferredValue(code);
  const { tokens, background } = use(
    cachedTokenizeCode(deferredCode, lang, theme)
  );
  const isPending = deferredCode !== code;

  return (
    <div
      className={cn({
        "animate-pulse": isPending,
      })}
    >
      <ShikiRenderer tokens={tokens} background={background} lang={lang} />
    </div>
  );
}
