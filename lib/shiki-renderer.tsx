import clsx from "clsx";
import { CSSProperties, Fragment } from "react";
import { FontStyle, IThemedToken } from "shiki";

interface Props {
  tokens: IThemedToken[][];
  background: string;
  lang: string;
  className?: string;
}

export function ShikiRenderer({
  tokens: lines,
  background,
  lang,
  className,
}: Props) {
  return (
    <pre
      className={clsx("shiki", lang, className)}
      style={{ backgroundColor: background }}
      tabIndex={0}
    >
      <code>
        {lines.map((tokens, i) => (
          <Fragment key={i}>
            <span className="line">
              {tokens.map((token, j) => {
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
            {i < lines.length - 1 && "\n"}
          </Fragment>
        ))}
      </code>
    </pre>
  );
}
