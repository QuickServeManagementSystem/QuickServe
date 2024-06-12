// import original module declarations
import 'styled-components/native';
import AppTheme from '@views/theme';

type ApplicationTheme = typeof AppTheme;
// and extend them!
declare module 'styled-components/native' {
  export interface DefaultTheme extends ApplicationTheme {}
}

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
