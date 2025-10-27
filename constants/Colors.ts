/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    // App palette
    white: "#ffffff",
    primary: "#7eade5",
    accent: "#3885de",
    background: "#EFF6FF",
    secondaryBackground: "#e3f2fd",
  },
  dark: {
    text: "#ECEDEE",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,

    white: "#ffffff",
    primary: "#90caf9",
    accent: "#42a5f5",
    background: "#0d1117",
    secondaryBackground: "#161b22",
  },
};
