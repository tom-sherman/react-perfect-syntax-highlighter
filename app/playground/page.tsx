import { CodePreview, ThemeDropdown } from "@/lib/code-preview";
import { Shiki } from "@/lib/shiki";
import { Heading1 } from "@/lib/typography";

export default function Playground({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let { lang, theme } = searchParams;
  if (typeof lang !== "string") {
    lang = "tsx";
  }
  if (typeof theme !== "string") {
    theme = "github-dark";
  }

  return (
    <>
      <Heading1>Shiki Playground</Heading1>
      <ThemeDropdown
        key={theme}
        initialTheme={theme}
        themes={["nord", "github-dark", "github-light"]}
      />

      <CodePreview
        key="hello"
        initialElement={<Shiki code={sampleCode} lang={lang} theme={theme} />}
        lang={lang}
        theme={theme}
      />
    </>
  );
}

const sampleCode = `// This is some example code
// Edit the text area and click the button to see it highlighted

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
}`;
