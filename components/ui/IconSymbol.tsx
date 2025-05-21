// Fallback for using MaterialIcons on Android and web.

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
  'questionmark.circle': 'help-outline',
  'info.circle': 'info',
  'timer': 'timer',
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
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  // Default to 'help-outline' if the icon is not mapped
  const materialIconName = MAPPING[name] || 'help-outline';
  return <MaterialIcons color={color} size={size} name={materialIconName as any} style={style} />;
}
