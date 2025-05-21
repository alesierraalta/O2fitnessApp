import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ExercisesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Logo de O2 Fitness
  const smallLogoSource = require('@/assets/images/Logos-14.png');

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Exercise Library</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.searchBar, { 
        backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#F2F2F7' 
      }]}>
        <IconSymbol name="magnifyingglass" size={16} color={colors.icon} />
        <ThemedText style={styles.searchText}>Search exercises...</ThemedText>
      </ThemedView>

      <ThemedView style={styles.sectionHeader}>
        <Image 
          source={smallLogoSource}
          style={styles.smallLogo}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
        <ThemedText type="subtitle">Categories</ThemedText>
      </ThemedView>

      <ThemedView style={styles.categoriesContainer}>
        <ThemedView style={[styles.categoryCard, { 
          borderColor: colors.cardBorder,
          backgroundColor: colors.cardBackground 
        }]}>
          <ThemedView style={[styles.categoryIcon, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
            <IconSymbol name="figure.arms.open" size={22} color={colors.tint} />
          </ThemedView>
          <ThemedText type="defaultSemiBold">Upper Body</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.categoryCard, { 
          borderColor: colors.cardBorder,
          backgroundColor: colors.cardBackground 
        }]}>
          <ThemedView style={[styles.categoryIcon, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
            <IconSymbol name="figure.walk" size={22} color={colors.tint} />
          </ThemedView>
          <ThemedText type="defaultSemiBold">Lower Body</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.categoryCard, { 
          borderColor: colors.cardBorder,
          backgroundColor: colors.cardBackground 
        }]}>
          <ThemedView style={[styles.categoryIcon, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
            <IconSymbol name="figure.core.training" size={22} color={colors.tint} />
          </ThemedView>
          <ThemedText type="defaultSemiBold">Core</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.categoryCard, { 
          borderColor: colors.cardBorder,
          backgroundColor: colors.cardBackground 
        }]}>
          <ThemedView style={[styles.categoryIcon, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
            <IconSymbol name="heart.fill" size={22} color={colors.tint} />
          </ThemedView>
          <ThemedText type="defaultSemiBold">Cardio</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionHeader}>
        <Image 
          source={smallLogoSource}
          style={styles.smallLogo}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
        <ThemedText type="subtitle">Popular Exercises</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.exerciseItem, { 
        borderColor: colors.cardBorder,
        backgroundColor: colors.cardBackground 
      }]}>
        <ThemedText type="defaultSemiBold">Bench Press</ThemedText>
        <ThemedText>Chest · Strength</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.exerciseItem, { 
        borderColor: colors.cardBorder,
        backgroundColor: colors.cardBackground 
      }]}>
        <ThemedText type="defaultSemiBold">Squats</ThemedText>
        <ThemedText>Legs · Strength</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.exerciseItem, { 
        borderColor: colors.cardBorder,
        backgroundColor: colors.cardBackground 
      }]}>
        <ThemedText type="defaultSemiBold">Deadlift</ThemedText>
        <ThemedText>Back · Strength</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginTop: 60,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 24,
  },
  searchText: {
    marginLeft: 8,
    fontSize: 15,
    opacity: 0.6,
  },
  sectionHeader: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
}); 