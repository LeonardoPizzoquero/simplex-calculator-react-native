import {RFValue} from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${RFValue(135)}px;
`;


export const InputWrapper = styled.View`
  width: ${RFValue(80)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.secondary};
`;


export const Title = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  margin: 0 8px;
  align-self: center;
`;
