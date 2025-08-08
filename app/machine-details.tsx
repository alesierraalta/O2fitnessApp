import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

interface MachineData {
  name: string;
  type: string;
  description: string;
  instructions: string[];
  targetMuscles: string[];
  difficulty: string;
  icon: string;
  videoUrl?: string;
  imageUrl?: string;
}

const machinesData: Record<string, MachineData> = {
  'bench-press': {
    name: 'Bench Press',
    type: 'Chest • Strength',
    description: 'The bench press is a compound exercise that primarily targets the chest muscles, along with the shoulders and triceps. It\'s one of the most effective exercises for building upper body strength and muscle mass.',
    instructions: [
      'Lie flat on the bench with your feet firmly on the ground',
      'Grip the barbell with hands slightly wider than shoulder-width',
      'Lower the bar to your chest in a controlled motion',
      'Press the bar back up to the starting position',
      'Keep your core engaged throughout the movement'
    ],
    targetMuscles: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    difficulty: 'Intermediate',
    icon: 'dumbbell'
  },
  'treadmill': {
    name: 'Treadmill',
    type: 'Cardio • Running',
    description: 'The treadmill is a versatile cardio machine that allows you to walk, jog, or run indoors. It\'s excellent for cardiovascular health, weight loss, and endurance training.',
    instructions: [
      'Start with a slow walking pace to warm up',
      'Gradually increase speed as you feel comfortable',
      'Maintain good posture with arms swinging naturally',
      'Use the handrails only for balance, not support',
      'Cool down with a slow walk before stopping'
    ],
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes'],
    difficulty: 'Beginner',
    icon: 'figure.walk'
  },
  'leg-press': {
    name: 'Leg Press',
    type: 'Legs • Strength',
    description: 'The leg press is a compound lower body exercise that targets multiple muscle groups in the legs. It\'s safer than squats for beginners and allows for heavy weight training.',
    instructions: [
      'Sit on the leg press machine with back flat against the pad',
      'Place feet shoulder-width apart on the platform',
      'Lower the weight by bending your knees to 90 degrees',
      'Press through your heels to return to starting position',
      'Keep your knees aligned with your toes'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    difficulty: 'Beginner',
    icon: 'figure.strengthtraining.traditional'
  },
  'rowing-machine': {
    name: 'Rowing Machine',
    type: 'Cardio • Full Body',
    description: 'The rowing machine provides a full-body, low-impact cardiovascular workout. It engages both upper and lower body muscles while improving cardiovascular endurance.',
    instructions: [
      'Sit on the seat with feet secured in the footrests',
      'Grab the handle with both hands, arms extended',
      'Push with your legs first, then lean back slightly',
      'Pull the handle to your lower chest',
      'Reverse the motion: arms, body, then legs'
    ],
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Quadriceps', 'Glutes'],
    difficulty: 'Intermediate',
    icon: 'figure.rowing'
  },
  'cable-machine': {
    name: 'Cable Machine',
    type: 'Full Body • Strength',
    description: 'The cable machine is a versatile piece of equipment that allows for a wide variety of exercises targeting different muscle groups with constant tension throughout the movement.',
    instructions: [
      'Select appropriate weight and attachment',
      'Position yourself according to the exercise',
      'Maintain proper form throughout the movement',
      'Control both the lifting and lowering phases',
      'Keep core engaged for stability'
    ],
    targetMuscles: ['Various (depends on exercise)'],
    difficulty: 'Intermediate',
    icon: 'figure.core.training'
  },
  'stationary-bike': {
    name: 'Stationary Bike',
    type: 'Cardio • Cycling',
    description: 'The stationary bike is a low-impact cardio machine that\'s easy on the joints while providing an excellent cardiovascular workout. Great for all fitness levels.',
    instructions: [
      'Adjust seat height so your leg is slightly bent at full extension',
      'Start with a comfortable resistance level',
      'Maintain an upright posture',
      'Keep a steady, controlled pace',
      'Gradually increase intensity as you warm up'
    ],
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes'],
    difficulty: 'Beginner',
    icon: 'bicycle'
  }
};

export default function MachineDetailsScreen() {
  const { machine } = useLocalSearchParams<{ machine: string }>();
  const colorScheme = useColorScheme();
  const colors = {
    background: useThemeColor({}, 'background'),
    text: useThemeColor({}, 'text'),
    tint: useThemeColor({}, 'tint'),
    cardBackground: useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background'),
    cardBorder: useThemeColor({ light: '#E5E5EA', dark: '#38383A' }, 'text'),
    secondaryText: useThemeColor({ light: '#8E8E93', dark: '#8E8E93' }, 'text'),
  };

  const machineData = machine ? machinesData[machine] : null;

  if (!machineData) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: 'Machine Not Found' }} />
        <ThemedText>Machine details not found.</ThemedText>
      </ThemedView>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return '#34C759';
      case 'intermediate': return '#FF9500';
      case 'advanced': return '#FF3B30';
      default: return colors.tint;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: machineData.name }} />
      
      {/* Header Section */}
      <ThemedView style={[styles.header, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
        <ThemedView style={[styles.iconContainer, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
          <IconSymbol name={machineData.icon as any} size={32} color={colors.tint} />
        </ThemedView>
        <ThemedView style={[styles.headerInfo, { backgroundColor: 'transparent' }]}>
          <ThemedText type="title" style={styles.machineName}>{machineData.name}</ThemedText>
          <ThemedText style={[styles.machineType, { color: colors.secondaryText }]}>{machineData.type}</ThemedText>
          <ThemedView style={[styles.difficultyContainer, { backgroundColor: 'transparent' }]}>
            <ThemedView style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(machineData.difficulty) }]}>
              <ThemedText style={styles.difficultyText}>{machineData.difficulty}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Video/Image Placeholder */}
      <ThemedView style={[styles.mediaContainer, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
        <ThemedView style={[styles.videoPlaceholder, { backgroundColor: colorScheme === 'dark' ? '#2C2C2E' : '#F2F2F7' }]}>
          <IconSymbol name="play.circle" size={48} color={colors.tint} />
          <ThemedText style={[styles.videoText, { color: colors.secondaryText }]}>Video Tutorial</ThemedText>
          <ThemedText style={[styles.videoSubtext, { color: colors.secondaryText }]}>Tap to play demonstration</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Description */}
      <ThemedView style={[styles.section, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Description</ThemedText>
        <ThemedText style={[styles.description, { color: colors.text }]}>{machineData.description}</ThemedText>
      </ThemedView>

      {/* Instructions */}
      <ThemedView style={[styles.section, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>How to Use</ThemedText>
        {machineData.instructions.map((instruction, index) => (
          <ThemedView key={index} style={[styles.instructionItem, { backgroundColor: 'transparent' }]}>
            <ThemedView style={[styles.stepNumber, { backgroundColor: colors.tint }]}>
              <ThemedText style={styles.stepText}>{index + 1}</ThemedText>
            </ThemedView>
            <ThemedText style={[styles.instructionText, { color: colors.text }]}>{instruction}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      {/* Target Muscles */}
      <ThemedView style={[styles.section, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Target Muscles</ThemedText>
        <ThemedView style={[styles.musclesContainer, { backgroundColor: 'transparent' }]}>
          {machineData.targetMuscles.map((muscle, index) => (
            <ThemedView key={index} style={[styles.muscleTag, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#F2F2F7' }]}>
              <ThemedText style={[styles.muscleText, { color: colors.text }]}>{muscle}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  machineName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  machineType: {
    fontSize: 16,
    marginBottom: 8,
  },
  difficultyContainer: {
    flexDirection: 'row',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  mediaContainer: {
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  videoPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  videoSubtext: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  musclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  muscleText: {
    fontSize: 14,
    fontWeight: '500',
  },
});