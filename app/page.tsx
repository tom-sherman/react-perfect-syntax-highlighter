import { CodePreview } from "@/lib/code-preview";
import { Shiki } from "../lib/shiki";

export default function Home() {
  return (
    <main>
      <CodePreview
        initialElement={
          <Shiki code={sampleCode} lang="tsx" theme="github-dark" />
        }
      />
    </main>
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
