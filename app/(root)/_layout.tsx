import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="routine-details" options={{ headerShown: true }} />
    </Stack>
  );
} 