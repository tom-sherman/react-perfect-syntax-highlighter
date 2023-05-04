"use client";

import { ReactNode, startTransition, useState, useTransition } from "react";
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
import { tokenizeCode } from "./shiki";

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
}

export function CodePreview({ initialCode, initialCodeString }: CodePreview) {
  const [code, setCode] = useState(initialCode);
  const searchParams = useSearchParams();
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

      {code}
    </Stack>
  );
}
