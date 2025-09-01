import 'react-native';

declare module 'react-native' {
  interface ViewProps { className?: string }
  interface TextProps { className?: string }
  interface TextInputProps { className?: string }
  interface ImagePropsBase { className?: string }
  interface ScrollViewProps { className?: string }
  interface PressableProps { className?: string }
  interface TouchableOpacityProps { className?: string }
}

/** Backstops for any wrapper components */
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      className?: string;
    }
  }
  namespace React {
    interface Attributes {
      className?: string;
    }
  }
}
