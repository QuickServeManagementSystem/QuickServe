import React from 'react';
import {View} from 'react-native';

import {ViewStyles} from './style';

export const AppView: React.FunctionComponent<any> = ({children}) => {
  return <View style={[ViewStyles.container]}>{children}</View>;
};
