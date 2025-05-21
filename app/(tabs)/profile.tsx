import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Usar la nueva imagen para el logo grande
  const logoSource = require('@/assets/images/Logos-15.png');

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.logoContainer}>
        <Image
          source={logoSource}
          style={styles.appLogo}
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

      <ThemedView style={[styles.settingsItem, { borderBottomColor: colorScheme === 'dark' ? '#333333' : '#E5E5EA' }]}>
        <IconSymbol name="moon" size={18} color={colors.icon} />
        <ThemedText style={styles.settingsText}>Theme</ThemedText>
        <IconSymbol name="chevron.right" size={14} color={colors.icon} />
      </ThemedView>

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
    width: 150,
    height: 150,
    marginBottom: 8,
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
}); 