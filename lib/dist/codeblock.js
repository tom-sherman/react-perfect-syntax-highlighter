import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "server-only";
import { highlight as lighterHighlight } from "@code-hike/lighter";
import { Fragment, cache } from "react";
export async function CodeBlock({ code, lang, theme, className, }) {
    const { lines, colors } = await highlight(code, lang, theme);
    return (_jsx("pre", { className: [lang, className].filter(Boolean).join(" "), style: { backgroundColor: colors.background }, tabIndex: 0, children: _jsx("code", { children: lines.map((tokenLine, i) => (_jsxs(Fragment, { children: [_jsx("span", { className: "line", children: tokenLine.map((token, j) => {
                            return (_jsx("span", { style: token.style, children: token.content }, j));
                        }) }), i < lines.length - 1 && "\n"] }, i))) }) }));
}
export async function tokenizeCode(code, lang, theme) {
    "use server";
    return _jsx(CodeBlock, { code: code, lang: lang, theme: theme });
}
const highlight = cache(lighterHighlight);
//# sourceMappingURL=codeblock.js.map