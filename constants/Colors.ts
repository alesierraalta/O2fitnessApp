/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0066FF';
const tintColorDark = '#3B82F6';

export const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: tintColorLight,
    tintTransparent: 'rgba(0, 102, 255, 0.1)',
    icon: '#333333',
    tabIconDefault: '#999999',
    tabIconSelected: tintColorLight,
    cardBorder: '#EEEEEE',
    cardBackground: '#FFFFFF',
    actionText: '#000000',
    searchBackground: '#F2F2F7',
    secondaryText: '#8E8E93',
    tertiaryBackground: '#EFEFF4',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: tintColorDark,
    tintTransparent: 'rgba(59, 130, 246, 0.15)',
    icon: '#CCCCCC',
    tabIconDefault: '#777777',
    tabIconSelected: tintColorDark,
    cardBorder: '#333333',
    cardBackground: '#111111',
    actionText: '#FFFFFF',
    searchBackground: '#1C1C1E',
    secondaryText: '#8E8E93',
    tertiaryBackground: '#2C2C2E',
  },
};
