import {Picker, PickerProps} from '@react-native-picker/picker';
import React, {ReactNode} from 'react';
import {useTheme} from 'styled-components';

import {Container} from './styles';

interface SelectProps extends PickerProps {
  children: ReactNode;
  onValueChange: ((itemValue: unknown, itemIndex: number) => void) | undefined;
}

export function Select({
  selectedValue,
  onValueChange,
  children,
  ...rest
}: SelectProps) {
  const theme = useTheme();

  return (
    <Container>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{
          color: theme.colors.text,
          fontFamily: theme.fonts.regular,
          height: '100%',
          width: '100%',
        }}
        itemStyle={{
          backgroundColor: '#fff',
        }}
        {...rest}
      >
        {children}
      </Picker>
    </Container>
  );
}
