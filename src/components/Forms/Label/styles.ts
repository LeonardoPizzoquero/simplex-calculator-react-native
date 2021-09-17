import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.white};
  font-size: ${RFValue(14)}px;
`;
