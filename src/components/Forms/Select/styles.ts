import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 17px 16px;
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  border: 2px solid ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.text};
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 5px;
  margin-bottom: 8px; 
`;
