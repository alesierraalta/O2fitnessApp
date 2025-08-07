import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Appearance, StyleSheet, Text, View } from 'react-native';

/**
 * A component for debugging theme issues
 * Only intended for development use
 */
export function ThemeDebug() {
  const [theme] = useTheme();
  const systemTheme = Appearance.getColorScheme();
  const actualTheme = theme ?? 'light';
  const colors = Colors[actualTheme];
  
  return (
    <ThemedView 
      style={styles.container} 
      darkColor="#222222"
      lightColor="#F5F5F7"
    >
      <ThemedText type="subtitle" style={styles.title}>Theme Debug</ThemedText>
      
      <View style={styles.row}>
        <ThemedText>Current Theme:</ThemedText>
        <Text style={[
          styles.value, 
          {color: theme === 'dark' ? '#3B82F6' : '#0066FF'}
        ]}>
          {theme || 'system'}
        </Text>
      </View>
      
      <View style={styles.row}>
        <ThemedText>System Theme:</ThemedText>
        <Text style={[
          styles.value, 
          {color: systemTheme === 'dark' ? '#3B82F6' : '#0066FF'}
        ]}>
          {systemTheme || 'unknown'}
        </Text>
      </View>
      
      <View style={styles.row}>
        <ThemedText>Visual Theme:</ThemedText>
        <Text style={[
          styles.value, 
          {color: actualTheme === 'dark' ? '#3B82F6' : '#0066FF'}
        ]}>
          {actualTheme}
        </Text>
      </View>
      
      <View style={styles.colorSamples}>
        <ThemedText style={styles.sampleLabel}>Theme Colors:</ThemedText>
        <View style={styles.samples}>
          {Object.entries(colors).map(([name, color]) => (
            <View key={name} style={styles.sampleContainer}>
              <View 
                style={[
                  styles.colorSample, 
                  {backgroundColor: color as string}
                ]} 
              />
              <ThemedText style={styles.colorName}>{name}</ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  value: {
    fontWeight: 'bold',
  },
  colorSamples: {
    marginTop: 16,
  },
  sampleLabel: {
    marginBottom: 8,
  },
  samples: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sampleContainer: {
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
    width: 70,
  },
  colorSample: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  colorName: {
    fontSize: 10,
    textAlign: 'center',
  },
}); 