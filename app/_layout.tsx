import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, Platform } from 'react-native';
import 'react-native-reanimated';

import { useTheme } from '@/hooks/useTheme';

export default function RootLayout() {
  // Verificar directamente el tema del sistema
  const systemTheme = Appearance.getColorScheme();
  console.log('RootLayout - Direct system theme check:', systemTheme);
  
  // Make sure we're not forcing any theme - let user preference take precedence
  const forceTheme = undefined;
  
  const [colorScheme, setAppTheme] = useTheme(forceTheme as 'light' | 'dark' | undefined);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  // Estado visual para aplicar independientemente del estado interno
  const [visualTheme, setVisualTheme] = useState<'light' | 'dark'>(
    colorScheme === 'dark' ? 'dark' : 'light'
  );
  
  // Logging for theme debugging
  useEffect(() => {
    console.log('Root layout rendered with theme state:', colorScheme);
    console.log('Root layout using visual theme:', visualTheme);
    
    // Actualizar el tema visual cuando cambia el colorScheme
    setVisualTheme(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme]);
  
  // Also add a listener for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      console.log('RootLayout - System theme changed:', colorScheme);
      // Update visual theme immediately for better responsiveness
      if (colorScheme === 'dark' || colorScheme === 'light') {
        setVisualTheme(colorScheme);
      }
    });
    
    return () => subscription.remove();
  }, []);
  
  // Set status bar colors appropriately for the theme
  useEffect(() => {
    if (Platform.OS === 'android') {
      // On Android, we may need additional status bar configuration
      // This would be implemented using native modules if needed
    }
    
    console.log('Setting StatusBar style for theme:', visualTheme);
  }, [visualTheme]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  // Ensure the correct theme is visually applied
  const theme = visualTheme === 'dark' ? DarkTheme : DefaultTheme;
  console.log('Applied navigation theme:', theme.dark ? 'dark' : 'light');

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar 
        style={visualTheme === 'dark' ? 'light' : 'dark'} 
        backgroundColor="transparent"
        translucent={true}
      />
    </ThemeProvider>
  );
}
