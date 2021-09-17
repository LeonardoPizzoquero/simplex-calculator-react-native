import React from 'react';
import {TextInputProps} from 'react-native';
import {Input} from '../Forms/Input';

import {Container, Icon, Title, InputWrapper} from './styles';

interface VariableProps extends TextInputProps {
  isLastVariable?: boolean;
  title: string;
}

export function Variable({isLastVariable, title, ...rest}: VariableProps) {
  return (
    <Container>
      <InputWrapper>
        <Input keyboardType="numeric" placeholder="0" {...rest} />
      </InputWrapper>

      <Title>{title}</Title>

      {!isLastVariable && (
        <Icon name="plus" />
      )}
    </Container>
  );
}
