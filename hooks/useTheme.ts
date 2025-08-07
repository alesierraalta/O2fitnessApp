import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { useColorScheme as _useColorScheme, Appearance, AppState } from 'react-native';

type ColorScheme = 'light' | 'dark' | null;
type ThemePreference = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = '@theme_preference';

// Simple direct check of system theme
const getCurrentSystemTheme = (): 'light' | 'dark' => {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === 'dark' ? 'dark' : 'light';
};

export function useTheme(forceTheme?: 'light' | 'dark'): [ColorScheme, (theme: ThemePreference) => Promise<void>] {
  // Use the forced theme if provided
  const systemColorScheme = _useColorScheme();
  const [theme, setTheme] = useState<ColorScheme>(forceTheme || systemColorScheme as ColorScheme);
  const [themePreference, setThemePreference] = useState<ThemePreference>(forceTheme ? forceTheme : 'system');
  
  // Simplified function to apply a theme directly
  const applyTheme = useCallback((newTheme: 'light' | 'dark') => {
    console.log('Applying theme:', newTheme);
    setTheme(newTheme);
  }, []);
  
  // Monitor app state changes to update theme when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active' && themePreference === 'system') {
        const currentSystemTheme = getCurrentSystemTheme();
        console.log('App became active, updating system theme:', currentSystemTheme);
        applyTheme(currentSystemTheme);
      }
    });
    
    return () => {
      subscription.remove();
    };
  }, [themePreference, applyTheme]);
  
  // Listen for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      console.log('System theme changed through listener:', colorScheme);
      if (themePreference === 'system') {
        const newTheme = colorScheme === 'dark' ? 'dark' : 'light';
        applyTheme(newTheme);
      }
    });
    
    return () => subscription.remove();
  }, [themePreference, applyTheme]);
  
  // Load saved theme preference on startup
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        // If there's a forced theme, use it directly
        if (forceTheme) {
          console.log('Using forced theme:', forceTheme);
          applyTheme(forceTheme);
          return;
        }
        
        const savedPreference = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        console.log('Loaded theme preference:', savedPreference);
        
        // Get current system theme for reference
        const directSystemTheme = getCurrentSystemTheme();
        console.log('Current system theme:', directSystemTheme);
        
        if (savedPreference) {
          setThemePreference(savedPreference as ThemePreference);
          if (savedPreference !== 'system') {
            applyTheme(savedPreference as 'light' | 'dark');
            console.log('Applied explicit theme from storage:', savedPreference);
          } else {
            // Use system theme
            applyTheme(directSystemTheme);
            console.log('Applied system theme:', directSystemTheme);
          }
        } else {
          // No saved preference, default to system theme
          console.log('No saved preference, using system theme:', directSystemTheme);
          applyTheme(directSystemTheme);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
        // Fallback to a safe default theme
        const fallbackTheme = forceTheme || 'light';
        applyTheme(fallbackTheme);
        console.log('Applied fallback theme due to error:', fallbackTheme);
      }
    };
    
    loadThemePreference();
  }, [forceTheme, applyTheme]);
  
  // Update theme when system theme changes and preference is 'system'
  useEffect(() => {
    if (themePreference === 'system' && !forceTheme) {
      const directSystemTheme = getCurrentSystemTheme();
      console.log('System theme updated to:', directSystemTheme);
      applyTheme(directSystemTheme);
    }
  }, [systemColorScheme, themePreference, forceTheme, applyTheme]);
  
  // Function to change theme with improved error handling
  const changeTheme = async (newTheme: ThemePreference) => {
    try {
      console.log('Changing theme to:', newTheme);
      
      // Save preference immediately
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemePreference(newTheme);
      
      // Apply theme visually
      if (newTheme === 'system') {
        const directSystemTheme = getCurrentSystemTheme();
        applyTheme(directSystemTheme);
        console.log('Applied system theme:', directSystemTheme);
      } else {
        applyTheme(newTheme);
        console.log('Applied explicit theme:', newTheme);
      }
      
      // Force an immediate re-render to ensure theme changes are visible
      setTimeout(() => {
        const refreshedTheme = newTheme === 'system' 
          ? getCurrentSystemTheme() 
          : newTheme;
        console.log('Refreshing theme application:', refreshedTheme);
        setTheme(refreshedTheme);
      }, 50);
      
    } catch (error) {
      console.error('Error saving theme preference:', error);
      // Continue with theme change in memory even if storage fails
      if (newTheme === 'system') {
        const directSystemTheme = getCurrentSystemTheme();
        applyTheme(directSystemTheme);
      } else {
        applyTheme(newTheme);
      }
    }
  };
  
  // Log current theme for debugging
  useEffect(() => {
    console.log('Current theme state:', theme);
    console.log('Current theme preference:', themePreference);
  }, [theme, themePreference]);
  
  return [theme, changeTheme];
} 