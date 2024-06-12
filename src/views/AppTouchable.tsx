import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

interface AppTouchableProps extends TouchableOpacityProps {
  children: any;
}
const AppTouchable: React.FC<AppTouchableProps> = ({children, ...props}) => {
  return (
    <Touchable activeOpacity={0.5} {...props}>
      {children}
    </Touchable>
  );
};

const Touchable = styled.TouchableOpacity``;

export default AppTouchable;
