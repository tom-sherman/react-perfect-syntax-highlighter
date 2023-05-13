import { CodePreview, SettingsDropdown } from "@/lib/settings";
import { CodeBlock, tokenizeCode } from "@/lib/code-block";
import { Heading1 } from "@/lib/typography";
import { isValidTheme } from "@/lib/utils";

export default function Playground({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let { lang, theme, code } = searchParams;
  if (typeof lang !== "string") {
    lang = "tsx";
  }
  if (typeof theme !== "string") {
    theme = "github-dark";
  }

  if (typeof code !== "string") {
    code = sampleCode;
  }

  if (!isValidTheme(theme)) {
    throw new Error(`Invalid theme: ${theme}`);
  }

  return (
    <>
      <Heading1>Shiki Playground</Heading1>
      <SettingsDropdown
        initialOption={theme}
        options={["nord", "github-dark", "github-light"]}
        name="theme"
      />
      <SettingsDropdown
        initialOption={lang}
        options={["tsx", "html", "css"]}
        name="lang"
      />

      <CodePreview
        initialCode={
          // @ts-expect-error Server component
          <CodeBlock code={sampleCode} lang={lang} theme={theme} />
        }
        initialCodeString={sampleCode}
        tokenizeCode={tokenizeCode}
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
