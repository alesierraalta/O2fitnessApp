import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View, Animated, RefreshControl, StatusBar, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';

// Logo de O2 Fitness
const logoSource = require('@/assets/images/Logos-15.png');
const smallLogoSource = require('@/assets/images/Logos-14.png');

const { width, height: screenHeight } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isTablet = width > 768;

export default function HomeScreen() {
  const [colorScheme] = useTheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const getPersonalizedGreeting = useCallback(() => {
    const hour = new Date().getHours();
    const name = 'Fitness Enthusiast';
    if (hour < 12) return `Good Morning, ${name}`;
    if (hour < 18) return `Good Afternoon, ${name}`;
    return `Good Evening, ${name}`;
  }, []);

  const motivationalQuotes = useMemo(() => [
    "Every workout is progress!",
    "Your only limit is you!",
    "Strong is the new beautiful!",
    "Push yourself, no one else will!",
    "Success starts with self-discipline!"
  ], []);

  const getMotivationalQuote = useCallback(() => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  }, [motivationalQuotes]);

  useEffect(() => {
    setGreeting(getPersonalizedGreeting());
    setMotivationalQuote(getMotivationalQuote());
    setCurrentStreak(Math.floor(Math.random() * 30) + 1);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [getPersonalizedGreeting, getMotivationalQuote, fadeAnim, slideAnim]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setMotivationalQuote(getMotivationalQuote());
    setTimeout(() => setRefreshing(false), 1000);
  }, [getMotivationalQuote]);

  const accentColors = useMemo(() => ({
    primary: isDark ? '#4A90E2' : '#007AFF',
    secondary: isDark ? '#50C878' : '#34C759',
    tertiary: isDark ? '#FF6B6B' : '#FF3B30',
    suggestions: {
      primary: isDark ? '#4A90E2' : '#007AFF'
    }
  }), [isDark]);

  const quickActions = useMemo(() => [
    { 
      title: 'Start Workout', 
      icon: 'play.fill', 
      color: accentColors.primary,
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    },
    { 
      title: 'Track Progress', 
      icon: 'chart.line.uptrend.xyaxis', 
      color: accentColors.secondary,
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    },
    { 
      title: 'Set Goals', 
      icon: 'target', 
      color: accentColors.tertiary,
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  ], [accentColors]);

  const workoutSuggestions = useMemo(() => [
    {
      title: 'Morning Cardio',
      duration: '20 min',
      difficulty: 'Beginner',
      calories: '150-200',
      description: 'Perfect way to start your day with energy'
    },
    {
      title: 'Strength Training',
      duration: '45 min', 
      difficulty: 'Intermediate',
      calories: '300-400',
      description: 'Build muscle and increase metabolism'
    },
    {
      title: 'HIIT Session',
      duration: '15 min',
      difficulty: 'Advanced', 
      calories: '200-300',
      description: 'High intensity for maximum results'
    }
  ], []);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background}
      />
      
      <LinearGradient
        colors={[
          isDark ? 'rgba(74, 144, 226, 0.1)' : 'rgba(0, 122, 255, 0.05)',
          'transparent'
        ]}
        style={styles.headerGradient}
      >
        <Animated.View 
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.headerContent}>
            <View style={styles.greetingSection}>
              <ThemedText type="title" style={styles.greeting}>
                {greeting}
              </ThemedText>
            </View>
            <View style={styles.logoSection}>
              <Image
                source={logoSource}
                style={styles.headerLogo}
                contentFit="contain"
                cachePolicy="memory-disk"
              />
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      <ThemedView style={styles.motivationCard}>
        <LinearGradient
          colors={[
            isDark ? 'rgba(74, 144, 226, 0.15)' : 'rgba(0, 122, 255, 0.1)',
            isDark ? 'rgba(80, 200, 120, 0.15)' : 'rgba(52, 199, 89, 0.1)'
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.motivationGradient}
        >
          <ThemedText type="subtitle" style={styles.motivationText}>
            {motivationalQuote}
          </ThemedText>
          <View style={styles.streakContainer}>
            <ThemedText style={styles.streakText}>
              {currentStreak} day streak!
            </ThemedText>
          </View>
        </LinearGradient>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Quick Actions
        </ThemedText>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.quickActionCard,
                {
                  backgroundColor: pressed 
                    ? (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')
                    : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)'),
                  borderColor: colors.cardBorder,
                  transform: [{ scale: pressed ? 0.98 : 1 }]
                }
              ]}
              onPress={action.action}
            >
              <View style={[
                styles.actionIconContainer,
                { backgroundColor: action.color + '20' }
              ]}>
                <IconSymbol 
                  name={action.icon} 
                  size={24} 
                  color={action.color} 
                />
              </View>
              <ThemedText type="defaultSemiBold" style={styles.actionTitle}>
                {action.title}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Workout Suggestions
        </ThemedText>
        <View style={styles.suggestionsContainer}>
          {workoutSuggestions.map((workout, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.suggestionCard,
                {
                  backgroundColor: pressed 
                    ? (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.02)')
                    : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)'),
                  borderColor: colors.cardBorder,
                  transform: [{ scale: pressed ? 0.99 : 1 }]
                }
              ]}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            >
              <View style={styles.suggestionHeader}>
                <ThemedText type="defaultSemiBold" style={styles.suggestionTitle}>
                  {workout.title}
                </ThemedText>
                <View style={[
                  styles.difficultyBadge,
                  { 
                    backgroundColor: workout.difficulty === 'Beginner' 
                      ? accentColors.secondary + '20'
                      : workout.difficulty === 'Intermediate'
                      ? accentColors.primary + '20'
                      : accentColors.tertiary + '20'
                  }
                ]}>
                  <ThemedText style={[
                    styles.difficultyText,
                    {
                      color: workout.difficulty === 'Beginner' 
                        ? accentColors.secondary
                        : workout.difficulty === 'Intermediate'
                        ? accentColors.primary
                        : accentColors.tertiary
                    }
                  ]}>
                    {workout.difficulty}
                  </ThemedText>
                </View>
              </View>
              
              <ThemedText style={styles.suggestionDescription}>
                {workout.description}
              </ThemedText>
              
              <View style={styles.suggestionStats}>
                <View style={styles.statItem}>
                  <IconSymbol name="clock" size={16} color={colors.icon} />
                  <ThemedText style={styles.statText}>{workout.duration}</ThemedText>
                </View>
                <View style={styles.statItem}>
                  <IconSymbol name="flame" size={16} color={colors.icon} />
                  <ThemedText style={styles.statText}>{workout.calories} cal</ThemedText>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <View style={[
          styles.tipCard, 
          { 
            backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: colors.cardBorder
          }
        ]}>
          <View style={styles.tipHeader}>
            <IconSymbol name="lightbulb.fill" size={24} color={accentColors.primary} />
            <ThemedText type="defaultSemiBold" style={styles.tipTitle}>
              Daily Fitness Tip
            </ThemedText>
          </View>
          <ThemedText style={styles.tipText}>
            Stay hydrated! Drink water before, during, and after your workout. 
            Proper hydration improves performance and aids recovery.
          </ThemedText>
        </View>
      </ThemedView>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: isTablet ? 32 : (isSmallScreen ? 24 : 28),
    fontWeight: '700',
  },
  motivationCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  motivationGradient: {
    padding: 20,
  },
  motivationText: {
    fontSize: isTablet ? 20 : (isSmallScreen ? 16 : 18),
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  streakText: {
    fontSize: isTablet ? 16 : (isSmallScreen ? 14 : 15),
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: isTablet ? 22 : (isSmallScreen ? 18 : 20),
    fontWeight: '700',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    alignItems: 'center',
    padding: isTablet ? 20 : (isSmallScreen ? 12 : 16),
    borderRadius: 12,
    borderWidth: 1,
  },
  actionIconContainer: {
    width: isTablet ? 56 : (isSmallScreen ? 40 : 48),
    height: isTablet ? 56 : (isSmallScreen ? 40 : 48),
    borderRadius: isTablet ? 28 : (isSmallScreen ? 20 : 24),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: isTablet ? 14 : (isSmallScreen ? 11 : 12),
    textAlign: 'center',
  },
  suggestionsContainer: {
    gap: 12,
  },
  suggestionCard: {
    padding: isTablet ? 20 : (isSmallScreen ? 14 : 16),
    borderRadius: 12,
    borderWidth: 1,
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionTitle: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 15 : 16),
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: isTablet ? 12 : (isSmallScreen ? 10 : 11),
    fontWeight: '600',
  },
  suggestionDescription: {
    fontSize: isTablet ? 15 : (isSmallScreen ? 13 : 14),
    marginBottom: 12,
    opacity: 0.8,
  },
  suggestionStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: isTablet ? 13 : (isSmallScreen ? 11 : 12),
    opacity: 0.7,
  },
  tipCard: {
    padding: isTablet ? 20 : (isSmallScreen ? 14 : 16),
    borderRadius: 12,
    borderWidth: 1,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: isTablet ? 16 : (isSmallScreen ? 14 : 15),
  },
  tipText: {
    fontSize: isTablet ? 15 : (isSmallScreen ? 13 : 14),
    lineHeight: isTablet ? 22 : (isSmallScreen ? 18 : 20),
    opacity: 0.8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  greetingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    width: isTablet ? 180 : (isSmallScreen ? 120 : 150),
    height: isTablet ? 180 : (isSmallScreen ? 120 : 150),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSpacing: {
    height: 40,
  },
});