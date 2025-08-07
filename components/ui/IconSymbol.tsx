// Fallback for using MaterialIcons on Android and web.

import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Map SF Symbols names to Material Icons names
const MAPPING: Record<string, string> = {
  'house.fill': 'home',
  'house': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'chevron.up': 'expand-less',
  'chevron.down': 'expand-more',
  'person.fill': 'person',
  'person': 'person-outline',
  'person.crop.circle': 'account-circle',
  'bell': 'notifications',
  'heart': 'favorite-outline',
  'heart.fill': 'favorite',
  'bookmark': 'bookmark-outline',
  'square.and.arrow.up': 'share',
  'dumbbell': 'fitness-center',
  'figure.core.training': 'fitness-center',
  'figure.step.training': 'directions-walk',
  'figure.walk': 'directions-walk',
  'figure.arms.open': 'accessibility',
  'magnifyingglass': 'search',
  'mic': 'mic',
  'list.bullet.rectangle': 'list',
  'list.bullet.rectangle.fill': 'list-alt',
  'exclamationmark.triangle': 'warning',
  'eye': 'visibility',
  'message': 'chat-bubble-outline',
  'play': 'play-arrow',
  'play.rectangle': 'smart-display',
  'clock': 'access-time',
  'ellipsis': 'more-horiz',
  'plus': 'add',
  'gear': 'settings',
  'moon': 'nights-stay',
  'sun.max': 'light-mode',
  'questionmark.circle': 'help-outline',
  'info.circle': 'info',
  'timer': 'timer',
  'xmark.circle.fill': 'cancel',
  'star': 'star',
  'chart.bar': 'bar-chart',
  'calendar': 'calendar-today',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  themeAware = false,
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  themeAware?: boolean;
}) {
  const [theme] = useTheme();
  let iconColor = color;
  
  // If themeAware is true, and no specific color is provided, use theme colors
  if (themeAware && typeof color === 'undefined') {
    const colors = Colors[theme ?? 'light'];
    iconColor = colors.icon;
  }
  
  // Default to 'help-outline' if the icon is not mapped
  const materialIconName = MAPPING[name] || 'help-outline';
  return <MaterialIcons color={iconColor} size={size} name={materialIconName as any} style={style} />;
}
