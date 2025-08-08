import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from 'expo-image';
import { StyleSheet, ScrollView, Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';

export default function ExercisesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Logo de O2 Fitness
  const smallLogoSource = require('@/assets/images/Logos-14.png');

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
        <ThemedText type="subtitle">Gym Machines</ThemedText>
      </ThemedView>

      <ThemedView style={styles.machinesGrid}>
        <Pressable 
           style={[styles.machineCard, { 
             borderColor: colors.cardBorder,
             backgroundColor: colors.cardBackground 
           }]}
           onPress={() => router.push('/machine-details?machine=bench-press')}
         >
           <ThemedView style={[styles.machineIcon, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
             <IconSymbol name="dumbbell" size={22} color={colors.tint} />
           </ThemedView>
           <ThemedText type="defaultSemiBold" style={styles.machineName}>Bench Press</ThemedText>
           <ThemedText style={styles.machineType}>Chest • Strength</ThemedText>
         </Pressable>

         <Pressable 
           style={[styles.machineCard, { 
             borderColor: colors.cardBorder,
             backgroundColor: colors.cardBackground 
           }]}
           onPress={() => router.push('/machine-details?machine=treadmill')}
         >
           <ThemedView style={[styles.machineIcon, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
             <IconSymbol name="figure.walk" size={22} color={colors.tint} />
           </ThemedView>
           <ThemedText type="defaultSemiBold" style={styles.machineName}>Treadmill</ThemedText>
           <ThemedText style={styles.machineType}>Cardio • Running</ThemedText>
         </Pressable>

         <Pressable 
           style={[styles.machineCard, { 
             borderColor: colors.cardBorder,
             backgroundColor: colors.cardBackground 
           }]}
           onPress={() => router.push('/machine-details?machine=leg-press')}
         >
           <ThemedView style={[styles.machineIcon, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
             <IconSymbol name="figure.strengthtraining.traditional" size={22} color={colors.tint} />
           </ThemedView>
           <ThemedText type="defaultSemiBold" style={styles.machineName}>Leg Press</ThemedText>
           <ThemedText style={styles.machineType}>Legs • Strength</ThemedText>
         </Pressable>

         <Pressable 
           style={[styles.machineCard, { 
             borderColor: colors.cardBorder,
             backgroundColor: colors.cardBackground 
           }]}
           onPress={() => router.push('/machine-details?machine=rowing-machine')}
         >
           <ThemedView style={[styles.machineIcon, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
             <IconSymbol name="figure.rowing" size={22} color={colors.tint} />
           </ThemedView>
           <ThemedText type="defaultSemiBold" style={styles.machineName}>Rowing Machine</ThemedText>
           <ThemedText style={styles.machineType}>Cardio • Full Body</ThemedText>
         </Pressable>

         <Pressable 
           style={[styles.machineCard, { 
             borderColor: colors.cardBorder,
             backgroundColor: colors.cardBackground 
           }]}
           onPress={() => router.push('/machine-details?machine=cable-machine')}
         >
           <ThemedView style={[styles.machineIcon, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
             <IconSymbol name="figure.core.training" size={22} color={colors.tint} />
           </ThemedView>
           <ThemedText type="defaultSemiBold" style={styles.machineName}>Cable Machine</ThemedText>
           <ThemedText style={styles.machineType}>Full Body • Strength</ThemedText>
         </Pressable>

         <Pressable 
           style={[styles.machineCard, { 
             borderColor: colors.cardBorder,
             backgroundColor: colors.cardBackground 
           }]}
           onPress={() => router.push('/machine-details?machine=stationary-bike')}
         >
           <ThemedView style={[styles.machineIcon, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
             <IconSymbol name="bicycle" size={22} color={colors.tint} />
           </ThemedView>
           <ThemedText type="defaultSemiBold" style={styles.machineName}>Stationary Bike</ThemedText>
           <ThemedText style={styles.machineType}>Cardio • Cycling</ThemedText>
         </Pressable>
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
        <ThemedText>Chest • Strength</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.exerciseItem, { 
        borderColor: colors.cardBorder,
        backgroundColor: colors.cardBackground 
      }]}>
        <ThemedText type="defaultSemiBold">Squats</ThemedText>
        <ThemedText>Legs • Strength</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.exerciseItem, { 
        borderColor: colors.cardBorder,
        backgroundColor: colors.cardBackground 
      }]}>
        <ThemedText type="defaultSemiBold">Deadlift</ThemedText>
        <ThemedText>Back • Strength</ThemedText>
      </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
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
  machinesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  machineCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    minHeight: 120,
  },
  machineIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  machineName: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  machineType: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
});