/// <reference types="react" />
/// <reference types="react-native" />

declare module "*.png" { const src: number; export default src; }
declare module "*.jpg" { const src: number; export default src; }
declare module "*.jpeg" { const src: number; export default src; }
declare module "*.svg" {
  import * as React from "react";
  import { SvgProps } from "react-native-svg";
  const SvgComponent: React.FC<SvgProps>;
  export default SvgComponent;
}
