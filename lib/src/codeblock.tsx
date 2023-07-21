import "server-only";
import { Theme, highlight as lighterHighlight } from "@code-hike/lighter";
import { Fragment, cache } from "react";

export interface CodeBlockProps {
  code: string;
  lang: string;
  theme: Theme;
  className?: string;
}

export async function CodeBlock({
  code,
  lang,
  theme,
  className,
}: CodeBlockProps) {
  const { lines, colors } = await highlight(code, lang, theme);

  return (
    <pre
      className={[lang, className].filter(Boolean).join(" ")}
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
            {i < lines.length - 1 && "\n"}
          </Fragment>
        ))}
      </code>
    </pre>
  );
}

const highlight = cache(lighterHighlight);
