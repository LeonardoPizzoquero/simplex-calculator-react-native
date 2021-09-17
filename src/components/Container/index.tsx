import React, {ReactNode} from 'react';

import {Content} from './styles';

interface ContainerProps {
  children: ReactNode;
}

export function Container({children}: ContainerProps) {
  return (
    <Content>
      {children}
    </Content>
  );
}
