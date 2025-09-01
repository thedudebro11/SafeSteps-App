declare module 'nativewind' {
  import * as React from 'react';
  export function styled<P>(
    component: React.ComponentType<P>
  ): React.ComponentType<P & { className?: string }>;
}
