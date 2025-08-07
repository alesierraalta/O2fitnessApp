import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Appearance, Pressable, StyleSheet, Text, View } from 'react-native';

type ThemeOption = {
  label: string;
  value: 'light' | 'dark' | 'system';
  icon: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
};

export function ThemeSelector() {
  // Direct system theme check
  const systemTheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  console.log("ThemeSelector - Direct system theme check:", systemTheme);
  
  const [currentTheme, setTheme] = useTheme();
  const [visualTheme, setVisualTheme] = useState<'light' | 'dark'>(
    currentTheme === 'dark' ? 'dark' : 'light'
  );
  
  // Ref to prevent rapid theme changes
  const isChangingTheme = useRef(false);
  
  // Determine the actual theme being used
  const activeTheme = currentTheme === null ? 'system' : currentTheme;
  // Get the colors for the current theme
  const colors = Colors[visualTheme];
  
  console.log('ThemeSelector rendering with theme state:', currentTheme);
  console.log('ThemeSelector using visual theme:', visualTheme);
  
  // Update visual theme whenever the actual theme changes
  useEffect(() => {
    console.log("Theme effect triggered with currentTheme:", currentTheme);
    if (currentTheme === 'dark' || currentTheme === 'light') {
      setVisualTheme(currentTheme);
    } else if (currentTheme === null && systemTheme) {
      // If theme is null (system), use system theme
      setVisualTheme(systemTheme);
    }
  }, [currentTheme, systemTheme]);
  
  // Animation value for selection indicator
  const animatedScale = new Animated.Value(1);
  
  // Animate when theme changes
  useEffect(() => {
    Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentTheme]);
  
  // Improved theme options with better contrast for light mode
  const themeOptions: ThemeOption[] = [
    {
      label: 'Light',
      value: 'light',
      icon: 'sun.max',
      accentColor: '#0066FF', // Brighter blue for better visibility
      backgroundColor: '#F5F5F7', // Light gray background
      textColor: '#000000', // Black text for contrast
    },
    {
      label: 'Dark',
      value: 'dark',
      icon: 'moon',
      accentColor: '#3B82F6', // Blue
      backgroundColor: '#1C1C1E', // Dark background
      textColor: '#FFFFFF', // White text
    },
    {
      label: 'System',
      value: 'system',
      icon: 'gear',
      accentColor: '#4CAF50', // Green
      backgroundColor: '#E8F5E9', // Light green background for light mode
      textColor: '#000000', // Black text for contrast
    },
  ];
  
  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    // Prevent rapid theme changes
    if (isChangingTheme.current) return;
    isChangingTheme.current = true;
    
    console.log('ThemeSelector - Changing theme to:', newTheme);
    
    try {
      // Show a small indicator that the theme is changing
      Alert.alert('Changing theme to ' + newTheme, '', [{ text: 'OK' }], { cancelable: true });
      
      // Update visual theme immediately for instant feedback
      if (newTheme === 'system') {
        setVisualTheme(systemTheme);
      } else {
        setVisualTheme(newTheme);
      }
      
      // Call the hook to change theme throughout the app
      await setTheme(newTheme);
      
      console.log('Theme change complete:', newTheme);
    } catch (error) {
      console.error('Error changing theme:', error);
    } finally {
      // Allow theme changes again after a short delay
      setTimeout(() => {
        isChangingTheme.current = false;
      }, 300);
    }
  };
  
  // Container with explicit color based on visual theme
  const containerStyle = {
    ...styles.container,
    backgroundColor: visualTheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
    borderColor: visualTheme === 'dark' ? '#333333' : '#E5E5EA',
    borderWidth: 1,
    borderRadius: 16,
  };
  
  return (
    <View style={containerStyle}>
      <Text style={[styles.title, { color: visualTheme === 'dark' ? '#FFFFFF' : '#000000' }]}>
        Theme
      </Text>
      <View style={styles.optionsContainer}>
        {themeOptions.map((option) => {
          const isSelected = option.value === activeTheme;
          
          // Improved button styling with better light mode contrast
          const buttonStyle = {
            ...styles.optionButton,
            backgroundColor: isSelected 
              ? option.accentColor 
              : (visualTheme === 'dark' ? '#333333' : option.backgroundColor),
            borderColor: isSelected 
              ? option.accentColor 
              : (visualTheme === 'dark' ? '#444444' : '#DDDDDD'),
            shadowOpacity: isSelected ? 0.3 : 0,
          };
          
          // Improved text color for better visibility
          const textColor = isSelected 
            ? '#FFFFFF' // White text on colored button
            : (visualTheme === 'dark' ? '#FFFFFF' : option.textColor);
          
          return (
            <Animated.View 
              key={option.value}
              style={[
                isSelected && { transform: [{ scale: animatedScale }] }
              ]}
            >
              <Pressable
                style={({ pressed }) => [
                  buttonStyle,
                  { opacity: pressed ? 0.7 : 1 }
                ]}
                onPress={() => {
                  console.log('Button pressed for theme:', option.value);
                  handleThemeChange(option.value);
                }}
                accessibilityLabel={`${option.label} theme`}
                accessibilityState={{ selected: isSelected }}
                testID={`theme-option-${option.value}`}
              >
                <View 
                  style={[
                    styles.iconContainer, 
                    { 
                      backgroundColor: isSelected 
                        ? '#FFFFFF20' // Translucent white for icon background when selected
                        : (visualTheme === 'dark' ? '#FFFFFF20' : `${option.accentColor}20`)
                    }
                  ]}
                >
                  <IconSymbol 
                    name={option.icon} 
                    size={24} 
                    color={isSelected 
                      ? '#FFFFFF' // White icon when selected 
                      : option.accentColor} // Accent color when not selected
                  />
                </View>
                <Text 
                  style={[
                    styles.optionLabel,
                    { color: textColor }
                  ]}
                >
                  {option.label}
                </Text>
                {isSelected && (
                  <View style={styles.selectedIndicator}>
                    <View style={styles.indicatorDot} />
                  </View>
                )}
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
      <Text style={[styles.debugText, { color: visualTheme === 'dark' ? '#888888' : '#666666' }]}>
        Current theme: {activeTheme} (Visual: {visualTheme}, System: {systemTheme})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 8,
    width: 100,
    height: 110,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  debugText: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
  },
}); 