/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Improved color constants with better contrast
const tintColorLight = '#0066FF'; // Brighter blue for light mode
const tintColorDark = '#3B82F6';  // Standard blue for dark mode

export const Colors = {
  light: {
    text: '#000000',               // Black text for maximum contrast
    background: '#FFFFFF',         // Pure white background
    tint: tintColorLight,
    tintTransparent: 'rgba(0, 102, 255, 0.1)',
    icon: '#333333',               // Dark gray icons
    tabIconDefault: '#8E8E93',     // Slightly darker for better visibility
    tabIconSelected: tintColorLight,
    cardBorder: '#E5E5EA',         // Slightly darker border for better definition
    cardBackground: '#FFFFFF',
    actionText: '#000000',
    searchBackground: '#F2F2F7',
    secondaryText: '#666666',      // Darker secondary text for better readability
    tertiaryBackground: '#F5F5F7', // Slightly adjusted for consistency
    border: '#E5E5EA',             // Border color for dividers and separators
    buttonBackground: '#F2F2F7',   // Light gray background for buttons
    buttonText: '#000000',         // Black text for buttons
    headerBackground: '#FFFFFF',   // White header background
    success: '#34C759',            // Green for success states
    error: '#FF3B30',              // Red for error states
    warning: '#FF9500',            // Orange for warning states
  },
  dark: {
    text: '#FFFFFF',               // White text for maximum contrast
    background: '#000000',         // Pure black background
    tint: tintColorDark,
    tintTransparent: 'rgba(59, 130, 246, 0.15)',
    icon: '#CCCCCC',               // Light gray icons
    tabIconDefault: '#8E8E93',     // Gray for inactive tabs
    tabIconSelected: tintColorDark,
    cardBorder: '#333333',
    cardBackground: '#1C1C1E',     // Slightly lighter than black for cards
    actionText: '#FFFFFF',
    searchBackground: '#1C1C1E',
    secondaryText: '#AEAEB2',      // Lighter secondary text for better visibility
    tertiaryBackground: '#2C2C2E',
    border: '#38383A',             // Border color for dividers and separators
    buttonBackground: '#2C2C2E',   // Dark gray background for buttons
    buttonText: '#FFFFFF',         // White text for buttons
    headerBackground: '#1C1C1E',   // Slightly lighter than black for headers
    success: '#30D158',            // Green for success states
    error: '#FF453A',              // Red for error states
    warning: '#FF9F0A',            // Orange for warning states
  },
};
