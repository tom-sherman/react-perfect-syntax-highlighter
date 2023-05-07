import { Button } from "@/lib/button";
import { Shiki } from "@/lib/shiki/shiki";
import { Stack } from "@/lib/stack";
import { Heading1, Paragraph } from "@/lib/typography";

export const dynamic = "error";

export default function Home() {
  return (
    <Stack space={3}>
      <Stack space={1}>
        <Heading1>Shiki React Server Components</Heading1>
        <div>
          <Button asLink href="/playground">
            Playground
          </Button>
          <Button variant="link" asLink href="/explainer">
            How does it work?
          </Button>
        </div>
      </Stack>

      <Stack space={1}>
        <Paragraph>Here's an example:</Paragraph>
        <Shiki code={sampleCode} lang="tsx" theme="github-dark" />
      </Stack>
    </Stack>
  );
}

const sampleCode = `"use server";
import { getHighlighter as shikiGetHighlighter } from "shiki";
import { cache } from "react";
import { ShikiRenderer } from "./shiki-renderer";

interface ShikiProps {
  code: string;
  lang: string;
  theme: string;
  className?: string;
}

export async function Shiki({ code, lang, theme, className }: ShikiProps) {
  const { tokens, background } = await tokenizeCode(code, lang, theme);

  return (
    <ShikiRenderer
      tokens={tokens}
      background={background}
      lang={lang}
      className={className}
    />
  );
}

export async function tokenizeCode(code: string, lang: string, theme: string) {
  const highlighter = await getHighlighter(lang, theme);
  return {
    tokens: highlighter.codeToThemedTokens(code, lang, theme),
    background: highlighter.getBackgroundColor(),
  };
}

const highlighterPromise = shikiGetHighlighter({});

const getHighlighter = cache(async (language: string, theme: string) => {
  console.log("Loading highlighter", language, theme);
  const highlighter = await highlighterPromise;
  const loadedLanguages = highlighter.getLoadedLanguages();
  const loadedThemes = highlighter.getLoadedThemes();

  let promises = [];
  if (!loadedLanguages.includes(language as any)) {
    promises.push(highlighter.loadLanguage(language as any));
  }

  if (!loadedThemes.includes(theme as any)) {
    promises.push(highlighter.loadTheme(theme));
  }

  await Promise.all(promises);

  return highlighter;
});
`;
