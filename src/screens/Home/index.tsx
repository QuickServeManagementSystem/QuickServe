import AppHeader from '@views/AppHeader';
import React from 'react';
import styled, {DefaultTheme, useTheme} from 'styled-components/native';

function App(): React.JSX.Element {
  const appTheme = useTheme();

  return (
    <Wrapp>
      <AppHeader
        title="Home Page"
        colorIconLeft={appTheme.colors.primary}
        onPressIconLeft={() => {
          console.log('Pressed');
        }}
      />
    </Wrapp>
  );
}

const Wrapp = styled.View`
  flex: 1;
`;

export default App;
