import { Theme } from "@code-hike/lighter";
import { CodeBlock } from "./codeblock.js";

export async function experimental_tokenizeCode(
  code: string,
  lang: string,
  theme: Theme
) {
  "use server";
  return <CodeBlock code={code} lang={lang} theme={theme} />;
}
