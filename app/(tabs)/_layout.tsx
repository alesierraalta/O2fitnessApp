import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const smallLogoSource = require('@/assets/images/Logos-14.png');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            height: 88,
            paddingBottom: 34,
          },
          default: {
            height: 60,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              opacity: focused ? 1 : 0.7,
              width: 24, 
              height: 24, 
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
              <Image 
                source={smallLogoSource}
                style={{ width: focused ? 24 : 22, height: focused ? 24 : 22 }}
                contentFit="contain"
              />
            </View>
          ),
          tabBarLabelStyle: { fontSize: 11 },
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: 'Routines',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={22} name={focused ? "list.bullet.rectangle.fill" : "list.bullet.rectangle"} color={color} />,
          tabBarLabelStyle: { fontSize: 11 },
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercises',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={22} name={focused ? "figure.step.training" : "figure.walk"} color={color} />,
          tabBarLabelStyle: { fontSize: 11 },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={22} name={focused ? "person.fill" : "person"} color={color} />,
          tabBarLabelStyle: { fontSize: 11 },
        }}
      />
    </Tabs>
  );
}
