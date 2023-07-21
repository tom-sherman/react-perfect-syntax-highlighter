import "server-only";
import { Theme } from "@code-hike/lighter";
export interface CodeBlockProps {
    code: string;
    lang: string;
    theme: Theme;
    className?: string;
}
export declare function CodeBlock({ code, lang, theme, className, }: CodeBlockProps): Promise<import("react/jsx-runtime").JSX.Element>;
export declare function tokenizeCode(code: string, lang: string, theme: Theme): Promise<import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=codeblock.d.ts.map