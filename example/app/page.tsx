import { Button } from "@/lib/button";
import { CodeBlock } from "react-perfect-syntax";
import { Stack } from "@/lib/stack";
import { Heading1, Heading2, Paragraph } from "@/lib/typography";

export default function Home() {
  return (
    <Stack space={3}>
      <Stack space={1}>
        <Heading1>
          Perfect syntax highlighting using the same tech as VS Code
        </Heading1>
        <div>
          <Button asLink href="/playground">
            Playground
          </Button>
          <Button variant="link" asLink href="#explainer">
            How does it work?
          </Button>
        </div>
      </Stack>

      <Stack space={1}>
        <Paragraph>Here's an example:</Paragraph>
        {/* @ts-expect-error Server component */}
        <CodeBlock
          code={sampleCode}
          lang="tsx"
          theme="github-dark"
          className="overflow-x-auto p-4 rounded"
        />
      </Stack>

      <section>
        <Heading2 id="explainer">How does it work?</Heading2>
        <Paragraph>
          This website uses React Server components to do syntax highlighting
          with the same technology as VS Code - giving you the most accurate
          syntax highlighting.
        </Paragraph>
        <Paragraph>
          Because it uses React Server components, the code is highlighted on
          the server, and the resulting output is sent to the browser. This
          means that we send 0kB of JS to the browser to do syntax highlighting.
        </Paragraph>
      </section>
    </Stack>
  );
}

const sampleCode = `import "server-only";
import { Theme, highlight as lighterHighlight } from "@code-hike/lighter";
import { Fragment, cache } from "react";
import clsx from "clsx";

export interface CodeBlockProps {
  code: string;
  lang: string;
  theme: Theme;
  className?: string;
}

export async function CodeBlock({ code, lang, theme, className }: CodeBlockProps) {
  const { lines, colors } = await highlight(code, lang, theme);

  return (
    <pre
      className={clsx("codeblock overflow-x-auto p-4 rounded", lang, className)}
      style={{ backgroundColor: colors.background }}
      tabIndex={0}
    >
      <code>
        {lines.map((tokenLine, i) => (
          <Fragment key={i}>
            <span className="line">
              {tokenLine.map((token, j) => {
                return (
                  <span key={j} style={token.style}>
                    {token.content}
                  </span>
                );
              })}
            </span>
            {i < lines.length - 1 && "\\n"}
          </Fragment>
        ))}
      </code>
    </pre>
  );
}

export async function tokenizeCode(code: string, lang: string, theme: Theme) {
  "use server";
  // @ts-expect-error Server component
  return <CodeBlock code={code} lang={lang} theme={theme} />;
}

const highlight = cache(lighterHighlight);`;
