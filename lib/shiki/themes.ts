import nord from "shiki/themes/nord.json";
import githubDark from "shiki/themes/github-dark.json";
import githubLight from "shiki/themes/github-light.json";
import { IShikiTheme } from "shiki";

export const NEXT_BUNDLED_THEMES = [
  mapTheme(nord),
  mapTheme(githubDark),
  mapTheme(githubLight),
];

function mapTheme(theme: any): IShikiTheme {
  return {
    ...theme,
    fg: theme.colors.foreground,
    bg: theme.colors.background,
    settings: theme.tokenColors,
  };
}
