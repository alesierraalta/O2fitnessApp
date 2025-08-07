/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { useEffect } from 'react';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const [theme] = useTheme();
  const actualTheme = theme ?? 'light';
  
  // Add debug logging for key color applications
  useEffect(() => {
    if (colorName === 'background' || colorName === 'text') {
      console.log(`useThemeColor for ${colorName}: using theme ${actualTheme}`);
      console.log(`Color will be: ${props[actualTheme] || Colors[actualTheme][colorName]}`);
    }
  }, [actualTheme, colorName, props]);
  
  // Get color from props if specified, otherwise from theme
  const colorFromProps = props[actualTheme];

  // Use explicit color handling with proper fallbacks
  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Ensure we're getting a valid color from the theme
    const themeColor = Colors[actualTheme][colorName];
    if (!themeColor) {
      console.warn(`Missing color for ${colorName} in ${actualTheme} theme`);
      // Fallback to a safe default
      return actualTheme === 'dark' ? '#FFFFFF' : '#000000';
    }
    return themeColor;
  }
}
