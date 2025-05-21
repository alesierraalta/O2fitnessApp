import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Usar las nuevas imágenes
  const smallLogoSource = require('@/assets/images/Logos-14.png');
  const largeLogoSource = require('@/assets/images/Logos-15.png');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F2F2F2', dark: '#0A0A0A' }}
      headerImage={
        <Image
          source={largeLogoSource}
          style={styles.appLogo}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to O2 Fitness</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedView style={styles.logoRow}>
          <Image 
            source={smallLogoSource}
            style={styles.smallLogo}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
          <ThemedText type="subtitle">Today's Summary</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.card, { 
          borderColor: colors.cardBorder,
          backgroundColor: colors.cardBackground 
        }]}>
          <ThemedText>You have no workouts scheduled for today.</ThemedText>
          <Pressable style={styles.logoButton}>
            <Image 
              source={smallLogoSource}
              style={styles.buttonLogo}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
            <ThemedText type="defaultSemiBold" style={[styles.actionText, { color: colors.actionText }]}>
              Tap to add a workout
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedView style={styles.logoRow}>
          <Image 
            source={smallLogoSource}
            style={styles.smallLogo}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
          <ThemedText type="subtitle">Recent Activity</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.card, { 
          borderColor: colors.cardBorder,
          backgroundColor: colors.cardBackground 
        }]}>
          <ThemedText>No recent activities found.</ThemedText>
          <ThemedText type="defaultSemiBold" style={[styles.actionText, { color: colors.actionText }]}>
            Start tracking your workouts
          </ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedView style={styles.logoRow}>
          <Image 
            source={smallLogoSource}
            style={styles.smallLogo}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
          <ThemedText type="subtitle">Weekly Progress</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.card, { 
          borderColor: colors.cardBorder,
          backgroundColor: colors.cardBackground 
        }]}>
          <ThemedText>No workout data available yet.</ThemedText>
          <ThemedText type="defaultSemiBold" style={[styles.actionText, { color: colors.actionText }]}>
            Complete workouts to see your progress
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  appLogo: {
    height: 240,
    width: 370,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    fontWeight: '500',
  },
  smallLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonLogo: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});
