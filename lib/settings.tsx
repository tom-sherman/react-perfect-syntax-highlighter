"use client";

import { ReactNode, useState, useTransition } from "react";
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
  initialCode: ReactNode;
  initialCodeString: string;
  tokenizeCode: (
    code: string,
    lang: string,
    theme: string
  ) => Promise<JSX.Element>;
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

  return (
    <Stack space={1}>
      <Textarea
        defaultValue={initialCodeString}
        onChange={async (e) => {
          const tokenized = await tokenizeCode(e.target.value, lang, theme);
          startTransition(() => {
            setCode(tokenized);
          });
        }}
      />

      <div
        className={cn({
          "animate-pulse": isPending,
        })}
      >
        {code}
      </div>
    </Stack>
  );
}
