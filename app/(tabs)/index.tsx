import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [colorScheme] = useTheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  
  // Logos e imágenes
  const smallLogoSource = require('@/assets/images/Logos-14.png');
  const largeLogoSource = require('@/assets/images/Logos-15.png');

  // Colores de acento para las secciones
  const accentColors = {
    summary: { primary: '#2196F3', secondary: '#90CAF9' },
    activity: { primary: '#FF5252', secondary: '#FF8A80' },
    progress: { primary: '#9C27B0', secondary: '#CE93D8' },
    suggestions: { primary: '#4CAF50', secondary: '#A5D6A7' },
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header con logo y saludo */}
      <View style={styles.header}>
        <LinearGradient
          colors={isDark ? ['#121212', '#1E1E1E'] : ['#F8F9FA', '#FFFFFF']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.headerContent}>
          <Image
            source={largeLogoSource}
            style={[styles.appLogo, { transform: [{ scale: 1.05 }] }]}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
          <View style={styles.greetingContainer}>
            <ThemedText type="title" style={styles.greeting}>Welcome to O2 Fitness</ThemedText>
            <HelloWave />
          </View>
        </View>
      </View>

      {/* Contenido principal */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Sección de resumen diario */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.iconContainer, { backgroundColor: `${accentColors.summary.primary}15` }]}>
              <IconSymbol name="calendar" size={18} color={accentColors.summary.primary} />
            </View>
            <ThemedText type="subtitle">Today's Summary</ThemedText>
            <Pressable style={styles.viewAllButton}>
              <ThemedText style={{ color: accentColors.summary.primary, fontSize: 14 }}>View calendar</ThemedText>
              <IconSymbol name="chevron.right" size={14} color={accentColors.summary.primary} />
            </Pressable>
          </View>
          
          <View style={[styles.card, { 
            backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }]}>
            <View style={[styles.cardDecoration, { backgroundColor: accentColors.summary.primary }]}>
              <View style={[styles.blurCircle, { 
                top: -15, 
                right: -15, 
                backgroundColor: `${accentColors.summary.secondary}50` 
              }]} />
              <View style={[styles.blurCircle, { 
                bottom: 10, 
                left: 20, 
                backgroundColor: `${accentColors.summary.secondary}30`,
                width: 40,
                height: 40, 
              }]} />
            </View>
            
            <View style={styles.cardContent}>
              <ThemedText style={styles.cardTitle}>Ready for a workout?</ThemedText>
              <ThemedText style={styles.cardText}>You have no workouts scheduled for today.</ThemedText>
              
              <Pressable 
                style={({ pressed }) => [
                  styles.actionButton,
                  { 
                    backgroundColor: accentColors.summary.primary,
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <IconSymbol name="plus" size={16} color="#FFFFFF" />
                <ThemedText style={styles.actionButtonText}>Add Workout</ThemedText>
              </Pressable>
            </View>
          </View>
        </ThemedView>
        
        {/* Sección de actividad reciente */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.iconContainer, { backgroundColor: `${accentColors.activity.primary}15` }]}>
              <IconSymbol name="flame" size={18} color={accentColors.activity.primary} />
            </View>
            <ThemedText type="subtitle">Recent Activity</ThemedText>
            <Pressable style={styles.viewAllButton}>
              <ThemedText style={{ color: accentColors.activity.primary, fontSize: 14 }}>View history</ThemedText>
              <IconSymbol name="chevron.right" size={14} color={accentColors.activity.primary} />
            </Pressable>
          </View>
          
          <View style={[styles.card, { 
            backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }]}>
            <View style={[styles.cardDecoration, { backgroundColor: accentColors.activity.primary }]}>
              <View style={[styles.blurCircle, { 
                top: -20, 
                left: 20, 
                backgroundColor: `${accentColors.activity.secondary}40` 
              }]} />
              <View style={[styles.blurCircle, { 
                bottom: -10, 
                right: 30, 
                backgroundColor: `${accentColors.activity.secondary}30`,
                width: 30,
                height: 30, 
              }]} />
            </View>
            
            <View style={styles.cardContent}>
              <ThemedText style={styles.cardTitle}>Start tracking your fitness</ThemedText>
              <ThemedText style={styles.cardText}>No recent activities found. Complete workouts to see your history.</ThemedText>
              
              <View style={styles.statRow}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>0</ThemedText>
                  <ThemedText style={styles.statLabel}>Workouts</ThemedText>
                </View>
                <View style={[styles.statSeparator, { backgroundColor: isDark ? 'rgba(150, 150, 150, 0.2)' : 'rgba(0, 0, 0, 0.1)' }]} />
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>0</ThemedText>
                  <ThemedText style={styles.statLabel}>Minutes</ThemedText>
                </View>
                <View style={[styles.statSeparator, { backgroundColor: isDark ? 'rgba(150, 150, 150, 0.2)' : 'rgba(0, 0, 0, 0.1)' }]} />
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>0</ThemedText>
                  <ThemedText style={styles.statLabel}>Calories</ThemedText>
                </View>
              </View>
            </View>
          </View>
        </ThemedView>
        
        {/* Sección de progreso semanal */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.iconContainer, { backgroundColor: `${accentColors.progress.primary}15` }]}>
              <IconSymbol name="chart.bar" size={18} color={accentColors.progress.primary} />
            </View>
            <ThemedText type="subtitle">Weekly Progress</ThemedText>
            <Pressable style={styles.viewAllButton}>
              <ThemedText style={{ color: accentColors.progress.primary, fontSize: 14 }}>View stats</ThemedText>
              <IconSymbol name="chevron.right" size={14} color={accentColors.progress.primary} />
            </Pressable>
          </View>
          
          <View style={[styles.card, { 
            backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }]}>
            <View style={[styles.cardDecoration, { backgroundColor: accentColors.progress.primary }]}>
              <View style={[styles.blurCircle, { 
                top: 10, 
                right: 30, 
                backgroundColor: `${accentColors.progress.secondary}40` 
              }]} />
              <View style={[styles.blurCircle, { 
                bottom: -15, 
                left: 20, 
                backgroundColor: `${accentColors.progress.secondary}30`,
                width: 50,
                height: 50, 
              }]} />
            </View>
            
            <View style={styles.cardContent}>
              <ThemedText style={styles.cardTitle}>Track your improvement</ThemedText>
              <ThemedText style={styles.cardText}>Complete workouts to see your weekly progress and achievements.</ThemedText>
              
              <View style={styles.weekProgress}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                  <View key={index} style={styles.dayColumn}>
                    <View style={[styles.progressBar, { backgroundColor: `${accentColors.progress.primary}30` }]}>
                      <View style={[styles.progressFill, { backgroundColor: accentColors.progress.primary }]} />
                    </View>
                    <ThemedText style={styles.dayLabel}>{day}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ThemedView>

        {/* Nueva sección: Rutinas sugeridas */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.iconContainer, { backgroundColor: `${accentColors.suggestions.primary}15` }]}>
              <IconSymbol name="star" size={18} color={accentColors.suggestions.primary} />
            </View>
            <ThemedText type="subtitle">Suggested Routines</ThemedText>
            <Pressable style={styles.viewAllButton}>
              <ThemedText style={{ color: accentColors.suggestions.primary, fontSize: 14 }}>View all</ThemedText>
              <IconSymbol name="chevron.right" size={14} color={accentColors.suggestions.primary} />
            </Pressable>
          </View>
          
          <View style={styles.suggestionsGrid}>
            {[
              {
                title: 'Full Body Workout',
                duration: '45 min',
                level: 'Intermediate',
                calories: '320',
                icon: 'dumbbell',
              },
              {
                title: 'HIIT Cardio',
                duration: '30 min',
                level: 'Advanced',
                calories: '450',
                icon: 'flame',
              },
            ].map((workout, index) => (
              <Pressable 
                key={index}
                style={({ pressed }) => [
                  styles.routineCard,
                  { 
                    backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View style={styles.routineHeader}>
                  <View style={[styles.routineIcon, { backgroundColor: `${accentColors.suggestions.primary}15` }]}>
                    <IconSymbol name={workout.icon} size={18} color={accentColors.suggestions.primary} />
                  </View>
                  <View style={styles.routineInfo}>
                    <ThemedText style={styles.routineTitle}>{workout.title}</ThemedText>
                    <View style={styles.routineTags}>
                      <View style={[styles.tag, { backgroundColor: isDark ? '#333333' : '#F2F2F7' }]}>
                        <IconSymbol name="clock" size={12} color={colors.icon} />
                        <ThemedText style={styles.tagText}>{workout.duration}</ThemedText>
                      </View>
                      <View style={[styles.tag, { backgroundColor: isDark ? '#333333' : '#F2F2F7' }]}>
                        <IconSymbol name="flame" size={12} color={colors.icon} />
                        <ThemedText style={styles.tagText}>{workout.calories} cal</ThemedText>
                      </View>
                      <View style={[styles.tag, { backgroundColor: isDark ? '#333333' : '#F2F2F7' }]}>
                        <ThemedText style={styles.tagText}>{workout.level}</ThemedText>
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </ThemedView>

        {/* Nueva sección: Consejos de fitness */}
        <ThemedView style={styles.section}>
          <View style={[styles.tipCard, { 
            backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }]}>
            <ThemedText style={styles.tipTitle}>Tip of the Day</ThemedText>
            <ThemedText style={styles.tipText}>
              Stay hydrated during your workouts. Try to drink at least 500ml of water for each hour of intense physical activity.
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 220,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appLogo: {
    height: 130,
    width: 195,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  greeting: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
    height: 180,
  },
  cardDecoration: {
    height: 60,
    width: '100%',
    position: 'relative',
  },
  blurCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.6,
  },
  cardContent: {
    padding: 16,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  statSeparator: {
    height: 24,
    width: 1,
  },
  weekProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 16,
    height: 60,
  },
  dayColumn: {
    alignItems: 'center',
    width: (width - 84) / 7,
  },
  progressBar: {
    width: 8,
    height: 40,
    borderRadius: 4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  progressFill: {
    height: 0,
    width: '100%',
  },
  dayLabel: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  suggestionsGrid: {
    flexDirection: 'column',
    gap: 12,
  },
  routineCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routineIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routineInfo: {
    flex: 1,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  routineTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    marginLeft: 4,
  },
  tipCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    opacity: 0.8,
  },
});
