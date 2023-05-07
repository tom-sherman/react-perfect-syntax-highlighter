"use server";
import {
  BUNDLED_LANGUAGES,
  FontStyle,
  getHighlighter as shikiGetHighlighter,
} from "shiki";
import { CSSProperties, Fragment, cache } from "react";
import clsx from "clsx";

export interface ShikiProps {
  code: string;
  lang: string;
  theme: string;
  className?: string;
}

export async function Shiki({ code, lang, theme, className }: ShikiProps) {
  const highlighter = await getHighlighter(lang, theme);
  const tokens = highlighter.codeToThemedTokens(code, lang, theme);
  const background = highlighter.getBackgroundColor(theme);

  return (
    <pre
      className={clsx("shiki overflow-x-auto p-4 rounded", lang, className)}
      style={{ backgroundColor: background }}
      tabIndex={0}
    >
      <code>
        {tokens.map((tokenLine, i) => (
          <Fragment key={i}>
            <span className="line">
              {tokenLine.map((token, j) => {
                const style: CSSProperties = {
                  color: token.color,
                };
                if (token.fontStyle) {
                  if (token.fontStyle & FontStyle.Italic) {
                    style["fontStyle"] = "italic";
                  }
                  if (token.fontStyle & FontStyle.Bold) {
                    style["fontWeight"] = "bold";
                  }
                  if (token.fontStyle & FontStyle.Underline) {
                    style["textDecoration"] = "underline";
                  }
                }

                return (
                  <span key={j} style={style}>
                    {token.content}
                  </span>
                );
              })}
            </span>
            {i < tokens.length - 1 && "\n"}
          </Fragment>
        ))}
      </code>
    </pre>
  );
}

export async function tokenizeCode(code: string, lang: string, theme: string) {
  return <Shiki code={code} lang={lang} theme={theme} />;
}

const highlighterPromise = shikiGetHighlighter({});

const getHighlighter = cache(async (language: string, theme: string) => {
  console.log("Loading highlighter", language, theme);
  const highlighter = await highlighterPromise;
  const loadedLanguages = highlighter.getLoadedLanguages();
  const loadedThemes = highlighter.getLoadedThemes();

  let promises = [];
  if (!loadedLanguages.includes(language as any)) {
    const languageRegistration = BUNDLED_LANGUAGES.find(
      (l) => l.id === language
    );
    if (!languageRegistration) {
      throw new Error(`Language not found: ${language}`);
    }
    promises.push(highlighter.loadLanguage(languageRegistration));
  }

  if (!loadedThemes.includes(theme as any)) {
    const themeRegistration = await import(`shiki/themes/${theme}.json`);
    promises.push(highlighter.loadTheme(themeRegistration));
  }

  await Promise.all(promises);

  return highlighter;
});
