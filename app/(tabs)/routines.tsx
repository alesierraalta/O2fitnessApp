import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RoutineCard } from '@/components/routine/RoutineCard';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { ownerRoutines } from '@/data/routines';
import { useColorScheme } from '@/hooks/useColorScheme';

const CATEGORIES = [
  { id: 'all', name: 'Todo', icon: 'square.grid.2x2', color: '#5E65ED' },
  { id: 'strength', name: 'Fuerza', icon: 'dumbbell', color: '#2196F3' },
  { id: 'cardio', name: 'Cardio', icon: 'heart', color: '#FF5252' },
  { id: 'flexibility', name: 'Flexibilidad', icon: 'figure.walk', color: '#00C853' },
  { id: 'core', name: 'Core', icon: 'figure.core.training', color: '#9C27B0' },
  { id: 'hiit', name: 'HIIT', icon: 'timer', color: '#FF9800' },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // Full width minus padding

export default function RoutinesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  // Logo images
  const smallLogoSource = require('@/assets/images/Logos-14.png');
  
  // Handlers
  const handleStartRoutine = (routineId: string) => {
    console.log(`Starting routine: ${routineId}`);
    // Implementar la lógica para comenzar la rutina
  };
  
  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header with search - YouTube style */}
      <ThemedView style={styles.header}>
        <Image 
          source={smallLogoSource}
          style={styles.headerLogo}
          contentFit="contain"
        />
        <ThemedText type="title" style={styles.headerTitle}>Rutinas</ThemedText>
        <ThemedView style={styles.headerIconsContainer}>
          <Pressable style={styles.iconButton}>
            <IconSymbol name="bell" size={22} color={colors.icon} />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <IconSymbol name="person.crop.circle" size={22} color={colors.icon} />
          </Pressable>
        </ThemedView>
      </ThemedView>
      
      {/* Search bar */}
      <ThemedView style={[styles.searchContainer, { backgroundColor: colors.searchBackground }]}>
        <IconSymbol name="magnifyingglass" size={16} color={colors.icon} style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar rutinas"
          placeholderTextColor={colors.secondaryText}
          style={[styles.searchInput, { color: colors.text }]}
        />
        <IconSymbol name="mic" size={16} color={colors.icon} />
      </ThemedView>
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Categories Horizontal Scroll */}
        <View style={styles.categoriesWrapper}>
          <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
            renderItem={({ item }) => (
              <Pressable style={styles.categoryItem}>
                <ThemedView 
                  style={[
                    styles.categoryIconContainer, 
                    { 
                      backgroundColor: `${item.color}15`, // 15% opacity version of the color
                      borderColor: item.color,
                    }
                  ]}
                >
                  <IconSymbol name={item.icon} size={22} color={item.color} />
                </ThemedView>
                <ThemedText style={[styles.categoryText, { color: item.color }]}>{item.name}</ThemedText>
              </Pressable>
            )}
            keyExtractor={item => item.id}
          />
        </View>
        
        {/* Featured Section */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedView style={styles.sectionHeaderRow}>
            <ThemedText type="subtitle">Destacados para ti</ThemedText>
            <Pressable>
              <ThemedText style={{ color: colors.tint }}>Ver todos</ThemedText>
            </Pressable>
          </ThemedView>
          
          {/* Featured Routine Card */}
          <View style={styles.featuredCardContainer}>
            <Link 
              href={`/(root)/routine-details?id=${ownerRoutines[0].id}`}
              asChild
            >
              <Pressable>
                <RoutineCard 
                  routine={ownerRoutines[0]} 
                  variant="featured"
                  onStartPress={() => handleStartRoutine(ownerRoutines[0].id)}
                />
              </Pressable>
            </Link>
          </View>
        </ThemedView>
          
        {/* Popular Routines */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedView style={styles.sectionHeaderRow}>
            <ThemedText type="subtitle">Rutinas populares</ThemedText>
            <Pressable>
              <ThemedText style={{ color: colors.tint }}>Ver todos</ThemedText>
            </Pressable>
          </ThemedView>
          
          <View style={styles.routinesGrid}>
            {ownerRoutines.map((routine) => (
              <Link 
                key={routine.id} 
                href={`/(root)/routine-details?id=${routine.id}`}
                asChild
              >
                <Pressable>
                  <RoutineCard 
                    routine={routine} 
                    variant="standard"
                    onStartPress={() => handleStartRoutine(routine.id)}
                  />
                </Pressable>
              </Link>
            ))}
          </View>
        </ThemedView>
      </ScrollView>
      
      {/* Create Routine Button */}
      <Pressable 
        style={({ pressed }) => [
          styles.createButton, 
          { 
            backgroundColor: colors.tint,
            transform: [{ scale: pressed ? 0.96 : 1 }],
          }
        ]}
      >
        <ThemedView style={styles.createButtonInner}>
          <IconSymbol name="plus" size={24} color="#FFFFFF" />
          <ThemedText style={styles.createButtonText}>Crear rutina</ThemedText>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding at bottom for FAB
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  headerLogo: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  categoriesWrapper: {
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  categoryIconContainer: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1.5,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 28,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  featuredCardContainer: {
    paddingHorizontal: 20,
  },
  routinesGrid: {
    paddingHorizontal: 20,
  },
  createButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  createButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
}); 