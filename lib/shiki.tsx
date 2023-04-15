"use server";
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
