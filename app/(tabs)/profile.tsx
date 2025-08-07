import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeDebug } from '@/components/ui/ThemeDebug';
import { ThemeSelector } from '@/components/ui/ThemeSelector';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';

// Set to true to enable theme debugging
const SHOW_THEME_DEBUG = true;

export default function ProfileScreen() {
  const [colorScheme] = useTheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [showThemeModal, setShowThemeModal] = useState(false);
  
  // Usar la nueva imagen para el logo grande
  const logoSource = require('@/assets/images/Logos-15.png');

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      
      {/* Show theme debug panel if enabled */}
      {SHOW_THEME_DEBUG && <ThemeDebug />}
      
      <ThemedView style={styles.logoContainer}>
        <Image
          source={logoSource}
          style={[styles.appLogo, { transform: [{ scale: 1.05 }] }]}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
        <ThemedText type="subtitle" style={styles.appName}>O2 Fitness</ThemedText>
      </ThemedView>

      <ThemedView style={styles.profileSection}>
        <ThemedView style={[styles.profileImagePlaceholder, { backgroundColor: colors.tint }]}>
          <IconSymbol name="person.fill" size={36} color={colorScheme === 'dark' ? '#000000' : '#FFFFFF'} />
        </ThemedView>
        <ThemedView style={styles.profileInfo}>
          <ThemedText type="subtitle">Guest User</ThemedText>
          <ThemedText style={[styles.editProfileText, { color: colors.icon }]}>Tap to edit profile</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={[styles.statsContainer, { backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#F2F2F7' }]}>
        <ThemedView style={styles.statItem}>
          <ThemedText type="defaultSemiBold" style={styles.statNumber}>0</ThemedText>
          <ThemedText>Workouts</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.statDivider, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#E5E5EA' }]} />
        <ThemedView style={styles.statItem}>
          <ThemedText type="defaultSemiBold" style={styles.statNumber}>0</ThemedText>
          <ThemedText>Hours</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.statDivider, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#E5E5EA' }]} />
        <ThemedView style={styles.statItem}>
          <ThemedText type="defaultSemiBold" style={styles.statNumber}>0</ThemedText>
          <ThemedText>Exercises</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionHeader}>
        <ThemedText type="subtitle">Settings</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.settingsItem, { borderBottomColor: colorScheme === 'dark' ? '#333333' : '#E5E5EA' }]}>
        <IconSymbol name="gear" size={18} color={colors.icon} />
        <ThemedText style={styles.settingsText}>App Settings</ThemedText>
        <IconSymbol name="chevron.right" size={14} color={colors.icon} />
      </ThemedView>

      <ThemedView style={[styles.settingsItem, { borderBottomColor: colorScheme === 'dark' ? '#333333' : '#E5E5EA' }]}>
        <IconSymbol name="bell" size={18} color={colors.icon} />
        <ThemedText style={styles.settingsText}>Notifications</ThemedText>
        <IconSymbol name="chevron.right" size={14} color={colors.icon} />
      </ThemedView>

      {/* Theme selection button with improved visibility */}
      <Pressable
        onPress={() => setShowThemeModal(true)}
        style={({ pressed }) => [
          styles.settingsItem, 
          { 
            borderBottomColor: colorScheme === 'dark' ? '#333333' : '#E5E5EA',
            opacity: pressed ? 0.7 : 1,
            backgroundColor: pressed ? (colorScheme === 'dark' ? '#2C2C2E' : '#F2F2F7') : 'transparent'
          }
        ]}
        accessibilityLabel="Theme settings"
      >
        <IconSymbol name={colorScheme === 'dark' ? 'moon' : 'sun.max'} size={18} color={colors.tint} />
        <ThemedText style={styles.settingsText}>Theme</ThemedText>
        <ThemedText style={[styles.settingsValue, { color: colors.tint }]}>
          {colorScheme === 'light' ? 'Light' : colorScheme === 'dark' ? 'Dark' : 'System'}
        </ThemedText>
        <IconSymbol name="chevron.right" size={14} color={colors.icon} />
      </Pressable>

      <ThemedView style={[styles.settingsItem, { borderBottomColor: colorScheme === 'dark' ? '#333333' : '#E5E5EA' }]}>
        <IconSymbol name="questionmark.circle" size={18} color={colors.icon} />
        <ThemedText style={styles.settingsText}>Help & Support</ThemedText>
        <IconSymbol name="chevron.right" size={14} color={colors.icon} />
      </ThemedView>

      <ThemedView style={[styles.settingsItem, { borderBottomColor: colorScheme === 'dark' ? '#333333' : '#E5E5EA' }]}>
        <IconSymbol name="info.circle" size={18} color={colors.icon} />
        <ThemedText style={styles.settingsText}>About</ThemedText>
        <IconSymbol name="chevron.right" size={14} color={colors.icon} />
      </ThemedView>

      {/* Modal para seleccionar tema */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showThemeModal}
        onRequestClose={() => setShowThemeModal(false)}
        statusBarTranslucent={true}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowThemeModal(false)}
        >
          <Pressable 
            style={({ pressed }) => [{ opacity: pressed ? 0.98 : 1 }]} 
            onPress={(e) => e.stopPropagation()}
          >
            <View 
              style={[
                styles.modalContent,
                { 
                  shadowColor: colorScheme === 'dark' ? '#000000' : '#000000',
                  shadowOpacity: colorScheme === 'dark' ? 0.5 : 0.2,
                  borderColor: colorScheme === 'dark' ? '#333333' : '#DDDDDD',
                  backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
                }
              ]}
            >
              {/* Decorative top bar with brighter color */}
              <View 
                style={{
                  height: 6,
                  width: '100%',
                  backgroundColor: colorScheme === 'dark' ? '#3B82F6' : '#0066FF',
                  marginBottom: 16,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />
              
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>
                  Theme Settings
                </Text>
                <Pressable 
                  onPress={() => setShowThemeModal(false)}
                  style={({ pressed }) => ({ 
                    opacity: pressed ? 0.7 : 1,
                    padding: 4,
                    backgroundColor: pressed ? (colorScheme === 'dark' ? '#2C2C2E' : '#F2F2F7') : 'transparent',
                    borderRadius: 15,
                  })}
                  accessibilityLabel="Close theme settings"
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <IconSymbol name="xmark.circle.fill" size={28} color={colorScheme === 'dark' ? '#CCCCCC' : '#666666'} />
                </Pressable>
              </View>
              
              <Text style={{ 
                marginHorizontal: 16, 
                marginBottom: 16, 
                color: colorScheme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                fontSize: 14,
                lineHeight: 20,
              }}>
                Choose your preferred appearance. The app will follow the system settings by default.
              </Text>
              
              {/* Custom ThemeSelector with onThemeChange callback */}
              <View style={{paddingBottom: 24}}>
                <ThemeSelector />
              </View>
              
              {/* Add an explicit Apply button for better interaction */}
              <Pressable
                style={({ pressed }) => [
                  styles.applyButton,
                  {
                    backgroundColor: pressed 
                      ? (colorScheme === 'dark' ? '#2C2C2E' : '#E5E5EA') 
                      : (colorScheme === 'dark' ? '#3B82F6' : '#0066FF'),
                    opacity: pressed ? 0.8 : 1,
                  }
                ]}
                onPress={() => setShowThemeModal(false)}
              >
                <Text style={styles.applyButtonText}>Close</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appLogo: {
    width: 180,
    height: 180,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  appName: {
    fontWeight: '600',
    fontSize: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImagePlaceholder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  editProfileText: {
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    marginHorizontal: 8,
  },
  statNumber: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  settingsText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  // Estilos para el modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingsValue: {
    marginLeft: 'auto',
    marginRight: 8,
    color: '#8E8E93',
    fontSize: 14,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  applyButton: {
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 