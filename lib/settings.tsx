"use client";

import { startTransition, useState, useTransition } from "react";
import { Textarea } from "./text-area";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

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

interface CodeInputProps {
  initialCode: string;
}

export function CodeInput({ initialCode }: CodeInputProps) {
  const [code, setCode] = useState(initialCode);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <Textarea
      value={code}
      onChange={(e) => {
        const value = e.target.value;
        setCode(value);

        startTransition(() => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("code", value);
          router.replace(`${pathname}?${newSearchParams.toString()}`);
        });
      }}
    />
  );
}
