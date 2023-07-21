# react-perfect-syntax-highlighter

🌈 Perfect syntax highlighter for React using server components.

## Usage

```tsx
import { CodeBlock } from "react-perfect-syntax-highlighter";

export default function Page() {
  return (
    <CodeBlock
      language="tsx"
      theme="dracula-soft"
      code="const meaning = 40 + 2;"
    />
  );
}
```

## API

### `CodeBlock`

A react component that will render a code block with syntax highlighting using the given `language` and `theme`.

#### Props

| Name        | Type                | Description                                       |
| ----------- | ------------------- | ------------------------------------------------- |
| `code`      | `string`            | The code to highlight.                            |
| `theme`     | `string`            | The theme to use. See [Themes](#themes).          |
| `lang`      | `string`            | The language to use. See [Languages](#languages). |
| `className` | `string` (optional) | A class to apply to the code block.               |

### `experimental_tokenizeCode`

A server action that will tokenize the given `code` using the given `language` and `theme`.

## Themes

A theme is a set of colors that will be used to highlight the code.

The list of themes is available [here](https://github.com/code-hike/lighter/tree/main/lib/grammars).

## Languages

A language is a set of rules that will be used to tokenize the code.

The list of languages is available [here](https://github.com/code-hike/lighter/tree/main/lib/grammars).
