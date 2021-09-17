import React from 'react';
import {Container} from './styles';

interface LabelProps {
  children: string;
}

export function Label({children}: LabelProps) {
  return (
    <Container>{children}</Container>
  );
}

