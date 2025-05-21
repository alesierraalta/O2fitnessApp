import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { Routine } from '@/data/routines';
import { useColorScheme } from '@/hooks/useColorScheme';

export type RoutineCardProps = {
  routine: Routine;
  variant: 'featured' | 'standard';
  onPress?: () => void;
  onStartPress?: () => void;
  showActions?: boolean;
  style?: ViewStyle;
};

export function RoutineCard({
  routine,
  variant = 'standard',
  onPress,
  onStartPress,
  showActions = true,
  style,
}: RoutineCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Estado para la expansión de ejercicios (solo en featured)
  const [showExercises, setShowExercises] = useState(false);
  
  // Helper functions for determining colors and icons
  const getCategoryColor = (category: string): { primary: string, secondary: string } => {
    switch (category) {
      case 'Cardio':
        return { primary: '#FF5252', secondary: '#FF8A80' };
      case 'Core':
        return { primary: '#9C27B0', secondary: '#CE93D8' };
      case 'Flexibilidad':
        return { primary: '#00C853', secondary: '#69F0AE' };
      case 'HIIT':
        return { primary: '#FF9800', secondary: '#FFCC80' };
      default:
        return { primary: '#2196F3', secondary: '#90CAF9' }; // Default for Fuerza and others
    }
  };
  
  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'Cardio':
        return 'heart';
      case 'Core':
        return 'figure.core.training';
      case 'Flexibilidad':
        return 'figure.walk';
      case 'HIIT':
        return 'timer';
      default:
        return 'dumbbell'; // Default for Fuerza and others
    }
  };
  
  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante':
        return {
          color: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)'
        };
      case 'Intermedio':
        return {
          color: '#FF9800',
          backgroundColor: 'rgba(255, 152, 0, 0.2)'
        };
      case 'Avanzado':
        return {
          color: '#F44336',
          backgroundColor: 'rgba(244, 67, 54, 0.2)'
        };
      default:
        return {
          color: '#FF9800',
          backgroundColor: 'rgba(255, 152, 0, 0.2)'
        };
    }
  };

  const categoryColors = getCategoryColor(routine.category);
  const categoryIcon = getCategoryIcon(routine.category);
  const difficultyStyles = getDifficultyStyles(routine.difficulty);

  const toggleExercises = () => {
    if (variant === 'featured') {
      setShowExercises(!showExercises);
    }
  };

  // Featured Card Renderer - Modern Design
  if (variant === 'featured') {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.featuredCard,
          {
            backgroundColor: colorScheme === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }]
          },
          style
        ]}
      >
        {/* Modern Gradient Header */}
        <View style={styles.featuredHeader}>
          {/* Gradient Background */}
          <View style={[styles.gradientBackground, {
            backgroundColor: categoryColors.primary,
          }]}>
            {/* Blur Elements - Decorative circles */}
            <View style={[styles.blurCircle, { top: -20, right: -20, backgroundColor: `${categoryColors.secondary}50` }]} />
            <View style={[styles.blurCircle, { top: 40, left: -40, backgroundColor: `${categoryColors.secondary}40` }]} />
            <View style={[styles.blurCircle, { bottom: 10, right: 40, backgroundColor: `${categoryColors.secondary}60` }]} />
          </View>

          {/* Header Content */}
          <View style={styles.headerContent}>
            {/* Difficulty Badge */}
            <View style={styles.badgeContainer}>
              <View style={styles.difficultyBadge}>
                <ThemedText style={styles.difficultyText}>{routine.difficulty}</ThemedText>
              </View>
            </View>

            {/* Title with Icon */}
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                <IconSymbol name={categoryIcon} size={28} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.routineTitle} numberOfLines={2}>{routine.name}</ThemedText>
            </View>

            {/* Stats Row */}
            <View style={styles.statsContainer}>
              <View style={styles.statBadge}>
                <IconSymbol name="clock" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                <ThemedText style={styles.statText}>{routine.duration} min</ThemedText>
              </View>
              <View style={styles.statBadge}>
                <IconSymbol name="flame" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                <ThemedText style={styles.statText}>{routine.duration * 10} kcal</ThemedText>
              </View>
              <View style={styles.statBadge}>
                <IconSymbol name="figure.step.training" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                <ThemedText style={styles.statText}>{routine.exercises.length}</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <ThemedText style={styles.sectionTitle}>Sobre esta rutina</ThemedText>
          <ThemedText style={styles.descriptionText} numberOfLines={3}>
            {routine.description}
          </ThemedText>

          <View style={styles.benefitsContainer}>
            <View style={styles.benefitRow}>
              <View style={[styles.benefitIcon, { backgroundColor: `${categoryColors.primary}20` }]}>
                <IconSymbol name="flame" size={14} color={categoryColors.primary} />
              </View>
              <ThemedText style={styles.benefitText}>
                Quema hasta <ThemedText style={styles.boldText}>{routine.duration * 10} calorías</ThemedText> por sesión
              </ThemedText>
            </View>

            <View style={styles.benefitRow}>
              <View style={[styles.benefitIcon, { backgroundColor: `${categoryColors.primary}20` }]}>
                <IconSymbol name="bolt" size={14} color={categoryColors.primary} />
              </View>
              <ThemedText style={styles.benefitText}>
                Mejora tu <ThemedText style={styles.boldText}>resistencia y fuerza</ThemedText> general
              </ThemedText>
            </View>

            <View style={styles.benefitRow}>
              <View style={[styles.benefitIcon, { backgroundColor: `${categoryColors.primary}20` }]}>
                <IconSymbol name="clock" size={14} color={categoryColors.primary} />
              </View>
              <ThemedText style={styles.benefitText}>
                Completa en <ThemedText style={styles.boldText}>{routine.duration} minutos</ThemedText>, 3 veces por semana
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Exercises Section */}
        <View style={styles.exercisesContainer}>
          <Pressable 
            style={styles.exercisesHeader} 
            onPress={toggleExercises}
          >
            <ThemedText style={styles.exercisesTitle}>
              EJERCICIOS ({routine.exercises.length})
            </ThemedText>
            <IconSymbol 
              name={showExercises ? "chevron.up" : "chevron.down"} 
              size={16} 
              color={colors.icon} 
            />
          </Pressable>

          {showExercises && (
            <View style={styles.exercisesList}>
              {routine.exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseItem}>
                  <View style={styles.exerciseLeft}>
                    <View style={[styles.exerciseNumber, { backgroundColor: `${categoryColors.primary}15` }]}>
                      <ThemedText style={[styles.exerciseNumberText, { color: categoryColors.primary }]}>
                        {index + 1}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.exerciseName}>{exercise.name}</ThemedText>
                  </View>
                  <View style={styles.exerciseTime}>
                    <ThemedText style={styles.exerciseTimeText}>{exercise.restTime}s</ThemedText>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Start Button */}
        <View style={styles.cardFooter}>
          <Pressable
            onPress={onStartPress}
            style={({ pressed }) => [
              styles.startButton,
              { 
                backgroundColor: categoryColors.primary,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }]
              }
            ]}
          >
            <ThemedText style={styles.startButtonText}>Comenzar Rutina</ThemedText>
          </Pressable>
        </View>
      </Pressable>
    );
  }

  // Standard Card Renderer (default) - Simplified Modern Design
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.standardCard,
        {
          backgroundColor: colorScheme === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }]
        },
        style
      ]}
    >
      {/* Header */}
      <View style={styles.standardHeader}>
        {/* Category Badge & Title */}
        <View style={styles.standardTopRow}>
          <View style={[styles.categoryBadge, { backgroundColor: `${categoryColors.primary}20` }]}>
            <IconSymbol name={categoryIcon} size={16} color={categoryColors.primary} />
            <ThemedText style={[styles.categoryText, { color: categoryColors.primary }]}>
              {routine.category}
            </ThemedText>
          </View>
          <View style={[styles.miniDifficultyBadge, { backgroundColor: difficultyStyles.backgroundColor }]}>
            <ThemedText style={[styles.miniDifficultyText, { color: difficultyStyles.color }]}>
              {routine.difficulty}
            </ThemedText>
          </View>
        </View>
        
        {/* Title */}
        <ThemedText type="defaultSemiBold" numberOfLines={1} style={styles.standardTitle}>
          {routine.name}
        </ThemedText>
        
        {/* Author & Stats */}
        <View style={styles.standardInfoRow}>
          <View style={styles.authorInfo}>
            <Image
              source={require('@/assets/images/Logos-14.png')}
              style={styles.miniLogo}
              contentFit="contain"
            />
            <ThemedText style={styles.authorText}>O2 Fitness</ThemedText>
          </View>
          
          <View style={styles.standardStats}>
            <View style={styles.miniStat}>
              <IconSymbol name="clock" size={12} color={colors.icon} />
              <ThemedText style={styles.miniStatText}>{routine.duration}m</ThemedText>
            </View>
            <ThemedText style={styles.statDivider}>•</ThemedText>
            <View style={styles.miniStat}>
              <IconSymbol name="figure.step.training" size={12} color={colors.icon} />
              <ThemedText style={styles.miniStatText}>{routine.exercises.length}</ThemedText>
            </View>
          </View>
        </View>
      </View>
      
      {/* Description */}
      <ThemedText style={styles.standardDescription} numberOfLines={2}>
        {routine.description}
      </ThemedText>
      
      {/* Action Button */}
      {showActions && (
        <View style={styles.standardFooter}>
          <Pressable
            onPress={onStartPress}
            style={({ pressed }) => [
              styles.standardStartButton,
              { 
                backgroundColor: categoryColors.primary,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }]
              }
            ]}
          >
            <IconSymbol name="play" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
            <ThemedText style={styles.standardStartText}>Comenzar</ThemedText>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Featured Card Styles - Modern Design
  featuredCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 24,
  },
  featuredHeader: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  blurCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.8,
  },
  headerContent: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  routineTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    marginRight: 8,
    marginBottom: 4,
  },
  statText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
    marginBottom: 16,
  },
  benefitsContainer: {
    marginTop: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  benefitText: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.9,
  },
  boldText: {
    fontWeight: '600',
  },
  exercisesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  exercisesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  exercisesTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    opacity: 0.7,
  },
  exercisesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  exerciseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  exerciseNumberText: {
    fontSize: 11,
    fontWeight: '600',
  },
  exerciseName: {
    fontSize: 13,
    opacity: 0.9,
  },
  exerciseTime: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  exerciseTimeText: {
    fontSize: 11,
    opacity: 0.7,
  },
  cardFooter: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  startButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Standard Card Styles - Modern Design
  standardCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  standardHeader: {
    padding: 16,
    paddingBottom: 12,
  },
  standardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  miniDifficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  miniDifficultyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  standardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  standardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniLogo: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 6,
  },
  authorText: {
    fontSize: 12,
    opacity: 0.8,
  },
  standardStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniStatText: {
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.7,
  },
  statDivider: {
    fontSize: 12,
    marginHorizontal: 6,
    opacity: 0.5,
  },
  standardDescription: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  standardFooter: {
    padding: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  standardStartButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  standardStartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
}); 