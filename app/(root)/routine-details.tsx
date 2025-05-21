import { Image } from 'expo-image';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { Exercise, getOwnerRoutineById } from '@/data/routines';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

export default function RoutineDetailsScreen() {
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const params = useLocalSearchParams();
  const routineId = params.id as string;
  const routine = getOwnerRoutineById(routineId);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  
  const toggleExercise = (exerciseId: string) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId);
  };
  
  if (!routine) {
    return (
      <ThemedView style={[styles.container, { paddingTop: insets.top + 20 }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <ThemedView style={styles.centerView}>
          <IconSymbol name="exclamationmark.triangle" size={60} color={colors.icon} style={{ marginBottom: 16 }} />
          <ThemedText type="subtitle" style={styles.errorTitle}>Rutina no encontrada</ThemedText>
          <ThemedText style={styles.errorMessage}>No pudimos encontrar la rutina que estás buscando.</ThemedText>
          <Pressable 
            onPress={() => router.back()} 
            style={[styles.backButton, { backgroundColor: colors.tint }]}
          >
            <ThemedText style={{ color: '#FFFFFF', fontWeight: '600' }}>Volver</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header - with back button */}
        <ThemedView style={[styles.header, { paddingTop: insets.top }]}>
          <Pressable onPress={() => router.back()} style={styles.backButtonIcon}>
            <IconSymbol name="chevron.left" size={28} color={colors.icon} />
          </Pressable>
          <ThemedView style={styles.headerActions}>
            <Pressable style={styles.iconButton}>
              <IconSymbol name="heart" size={22} color={colors.icon} />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <IconSymbol name="bookmark" size={22} color={colors.icon} />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <IconSymbol name="square.and.arrow.up" size={22} color={colors.icon} />
            </Pressable>
          </ThemedView>
        </ThemedView>
        
        {/* Routine Header */}
        <ThemedView style={styles.routineHeader}>
          <ThemedView style={styles.routineHeaderRow}>
            <View style={[styles.routineIconCircle, { 
              backgroundColor: 
                routine.category === 'Cardio' ? '#FF5252' :
                routine.category === 'Core' ? '#9C27B0' : '#2196F3'
            }]}>
              <IconSymbol 
                name={routine.category === 'Cardio' ? 'heart' : 
                     routine.category === 'Core' ? 'figure.core.training' : 'dumbbell'} 
                size={28} 
                color="#FFFFFF" 
              />
            </View>
            <ThemedView style={styles.routineHeaderInfo}>
              <ThemedText type="title" style={styles.routineTitle}>{routine.name}</ThemedText>
              <ThemedView style={styles.authorRow}>
                <Image 
                  source={require('@/assets/images/Logos-14.png')} 
                  style={styles.authorLogo}
                  contentFit="contain"
                />
                <ThemedText style={styles.authorText}>O2 Fitness</ThemedText>
                <View style={styles.verifiedBadgeContainer}>
                  <ThemedText style={styles.verifiedBadge}>✓</ThemedText>
                </View>
              </ThemedView>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={[styles.statsContainer, { backgroundColor: colors.tertiaryBackground }]}>
            <ThemedView style={styles.statItem}>
              <ThemedText type="defaultSemiBold" style={styles.statNumber}>{routine.exercises.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Ejercicios</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.statDivider, { backgroundColor: colorScheme === 'dark' ? '#444444' : '#E0E0E0' }]} />
            <ThemedView style={styles.statItem}>
              <ThemedText type="defaultSemiBold" style={styles.statNumber}>{routine.duration}</ThemedText>
              <ThemedText style={styles.statLabel}>Minutos</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.statDivider, { backgroundColor: colorScheme === 'dark' ? '#444444' : '#E0E0E0' }]} />
            <ThemedView style={styles.statItem}>
              <ThemedView style={[styles.difficultyTag, {
                backgroundColor: 
                  routine.difficulty === 'Principiante' ? '#4CAF50' :
                  routine.difficulty === 'Intermedio' ? '#FF9800' : 
                  '#F44336'
              }]}>
                <ThemedText style={styles.difficultyText}>{routine.difficulty}</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
          
          <ThemedText style={styles.description}>{routine.description}</ThemedText>
          
          {/* Social stats - Instagram style */}
          <ThemedView style={styles.socialStatsContainer}>
            <ThemedView style={styles.socialStat}>
              <IconSymbol name="eye" size={14} color={colors.icon} />
              <ThemedText style={styles.socialStatText}>3.2k vistas</ThemedText>
            </ThemedView>
            <ThemedView style={styles.socialStat}>
              <IconSymbol name="heart" size={14} color={colors.icon} />
              <ThemedText style={styles.socialStatText}>428 me gusta</ThemedText>
            </ThemedView>
            <ThemedView style={styles.socialStat}>
              <IconSymbol name="message" size={14} color={colors.icon} />
              <ThemedText style={styles.socialStatText}>32 comentarios</ThemedText>
            </ThemedView>
          </ThemedView>
          
          <Pressable style={[styles.startButton, { backgroundColor: colors.tint }]}>
            <IconSymbol name="play" size={18} color="#FFFFFF" style={{ marginRight: 10 }} />
            <ThemedText style={styles.startButtonText}>Comenzar Rutina</ThemedText>
          </Pressable>
        </ThemedView>
        
        {/* Exercise List */}
        <ThemedView style={styles.exercisesContainer}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Ejercicios ({routine.exercises.length})</ThemedText>
            <ThemedView style={styles.exerciseFilters}>
              <Pressable style={[styles.filterButton, { backgroundColor: colors.tint }]}>
                <ThemedText style={styles.filterText}>Todos</ThemedText>
              </Pressable>
              <Pressable style={[styles.filterButton, { backgroundColor: colors.tertiaryBackground }]}>
                <ThemedText>Por grupo muscular</ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>
          
          {routine.exercises.map((exercise: Exercise, index: number) => (
            <TouchableOpacity 
              key={exercise.id}
              onPress={() => toggleExercise(exercise.id)}
              activeOpacity={0.7}
            >
              <ThemedView 
                style={[styles.exerciseCard, { 
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.cardBorder
                }]}
              >
                <ThemedView style={styles.exerciseHeader}>
                  <ThemedView style={styles.exerciseHeaderLeft}>
                    <ThemedView style={[styles.exerciseNumberContainer, { 
                      backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' 
                    }]}>
                      <ThemedText style={styles.exerciseNumber}>{index + 1}</ThemedText>
                    </ThemedView>
                    <ThemedView>
                      <ThemedText type="defaultSemiBold" style={styles.exerciseName}>
                        {exercise.name}
                      </ThemedText>
                      <ThemedView style={styles.muscleGroupContainer}>
                        <ThemedText style={styles.muscleGroup}>{exercise.muscleGroup}</ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </ThemedView>
                  <ThemedView style={styles.exerciseHeaderRight}>
                    <Pressable style={styles.videoButton}>
                      <IconSymbol name="play.rectangle" size={20} color={colors.tint} />
                    </Pressable>
                    <IconSymbol 
                      name={expandedExercise === exercise.id ? "chevron.up" : "chevron.down"} 
                      size={16} 
                      color={colors.icon} 
                    />
                  </ThemedView>
                </ThemedView>
                
                {expandedExercise === exercise.id && (
                  <ThemedView style={styles.exerciseContent}>
                    <ThemedText style={styles.exerciseDescription}>
                      {exercise.description}
                    </ThemedText>
                    
                    <ThemedView style={styles.exerciseStats}>
                      <ThemedView style={[styles.statBox, { backgroundColor: colors.tertiaryBackground }]}>
                        <ThemedText style={styles.statTitle}>Series</ThemedText>
                        <ThemedText type="defaultSemiBold" style={styles.statValue}>{exercise.sets}</ThemedText>
                      </ThemedView>
                      
                      <ThemedView style={[styles.statBox, { backgroundColor: colors.tertiaryBackground }]}>
                        <ThemedText style={styles.statTitle}>Reps</ThemedText>
                        <ThemedText type="defaultSemiBold" style={styles.statValue}>{exercise.reps}</ThemedText>
                      </ThemedView>
                      
                      <ThemedView style={[styles.statBox, { backgroundColor: colors.tertiaryBackground }]}>
                        <ThemedText style={styles.statTitle}>Descanso</ThemedText>
                        <ThemedText type="defaultSemiBold" style={styles.statValue}>{exercise.restTime}s</ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </ThemedView>
                )}
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ThemedView>
        
        {/* Recommended Routines */}
        <ThemedView style={styles.recommendedSection}>
          <ThemedText type="subtitle" style={styles.recommendedTitle}>Rutinas relacionadas</ThemedText>
          <FlatList
            data={[1, 2, 3]}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedList}
            renderItem={() => (
              <Pressable>
                <ThemedView style={[styles.recommendedCard, { 
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.cardBorder
                }]}>
                  <ThemedView style={[styles.recommendedImagePlaceholder, {
                    backgroundColor: colorScheme === 'dark' ? '#333333' : '#F5F5F5'
                  }]}>
                    <IconSymbol name="figure.step.training" size={32} color={colors.icon} />
                  </ThemedView>
                  <ThemedText numberOfLines={1} style={styles.recommendedName}>Entrenamiento HIIT</ThemedText>
                  <ThemedText style={styles.recommendedInfo}>30 min • 6 ejercicios</ThemedText>
                </ThemedView>
              </Pressable>
            )}
            keyExtractor={(item) => item.toString()}
          />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  errorMessage: {
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.7,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backButtonIcon: {
    padding: 4,
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 22,
    marginTop: 20,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10,
    marginLeft: 6,
  },
  routineHeader: {
    padding: 20,
  },
  routineHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  routineIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  routineHeaderInfo: {
    flex: 1,
  },
  routineTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  authorText: {
    fontWeight: '500',
    fontSize: 16,
  },
  verifiedBadgeContainer: {
    backgroundColor: '#1DA1F2',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  verifiedBadge: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 36,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  difficultyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  difficultyText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  description: {
    marginBottom: 24,
    lineHeight: 24,
    fontSize: 16,
  },
  socialStatsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  socialStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  socialStatText: {
    fontSize: 14,
    marginLeft: 6,
    opacity: 0.7,
  },
  startButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  exercisesContainer: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  exerciseFilters: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginRight: 12,
  },
  filterText: {
    color: 'white',
    fontWeight: '500',
  },
  exerciseCard: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  exerciseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exerciseHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseNumberContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  exerciseNumber: {
    fontWeight: '600',
    fontSize: 16,
  },
  exerciseName: {
    fontSize: 17,
    marginBottom: 4,
  },
  muscleGroupContainer: {
    flexDirection: 'row',
  },
  muscleGroup: {
    fontSize: 14,
    opacity: 0.6,
  },
  videoButton: {
    marginRight: 12,
  },
  exerciseContent: {
    padding: 20,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  exerciseDescription: {
    marginBottom: 20,
    lineHeight: 22,
    fontSize: 15,
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    margin: 4,
  },
  statTitle: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  recommendedSection: {
    padding: 20,
  },
  recommendedTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  recommendedList: {
    paddingRight: 20,
  },
  recommendedCard: {
    width: 160,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginRight: 16,
    alignItems: 'center',
  },
  recommendedImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendedName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  recommendedInfo: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },
}); 