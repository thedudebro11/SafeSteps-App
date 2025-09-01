// src/ui/nativewind.ts
import type * as React from 'react';
import * as RN from 'react-native';
import { styled } from 'nativewind';

// Re-export RN APIs (Platform, Dimensions, etc.)
export * from 'react-native';

// Add className to any prop bag
type WithClassName<P> = P & { className?: string };

// Styled, typed building blocks
export const View             = styled(RN.View)             as unknown as React.ComponentType<WithClassName<RN.ViewProps>>;
export const Text             = styled(RN.Text)             as unknown as React.ComponentType<WithClassName<RN.TextProps>>;
export const ScrollView       = styled(RN.ScrollView)       as unknown as React.ComponentType<WithClassName<RN.ScrollViewProps>>;
export const TextInput        = styled(RN.TextInput)        as unknown as React.ComponentType<WithClassName<RN.TextInputProps>>;
export const Image            = styled(RN.Image)            as unknown as React.ComponentType<WithClassName<RN.ImagePropsBase>>;
export const TouchableOpacity = styled(RN.TouchableOpacity) as unknown as React.ComponentType<WithClassName<RN.TouchableOpacityProps>>;
export const Pressable        = styled(RN.Pressable)        as unknown as React.ComponentType<WithClassName<RN.PressableProps>>;
