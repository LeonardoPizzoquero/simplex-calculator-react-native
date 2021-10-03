import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'styled-components';

import {Calculator} from '../../screens/Calculator';
import {FunctionDefinition} from '../../screens/FunctionDefinition';
import {Iterations} from '../../screens/Iterations';

const Stack = createNativeStackNavigator();

export type StackParamList = {
  FunctionDefinition: {
    variablesNumber: string;
    restrictionsNumber: string;
  };
  Calculator: undefined;
  Iterations: {
    iterations: number[][][];
    restrictionsNumber: number;
    variablesNumber: number;
  }
};

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calculator"
        component={Calculator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FunctionDefinition"
        component={FunctionDefinition}
        options={{
          title: 'Definições do problema',
          headerTitleStyle: {
            fontFamily: theme.fonts.bold,
          },
          headerTintColor: theme.colors.white,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="Iterations"
        component={Iterations}
        options={{
          title: 'Soluções',
          headerTitleStyle: {
            fontFamily: theme.fonts.bold,
          },
          headerTintColor: theme.colors.white,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
}
