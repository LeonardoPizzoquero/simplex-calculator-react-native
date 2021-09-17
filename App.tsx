import React from 'react';

import AppLoading from 'expo-app-loading';
import {ThemeProvider} from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import theme from './src/global/styles/theme';

import {CalculatorProvider} from './src/contexts/calculator';
import {AppRoutes} from './src/screens/routes/app.routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CalculatorProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </CalculatorProvider>
    </ThemeProvider>
  );
}
