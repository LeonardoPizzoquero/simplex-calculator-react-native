import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Image = styled.Image`
  margin-top: ${getStatusBarHeight() + RFValue(66)}px;
  margin-bottom: ${RFValue(104)}px;
`;

export const InputWrapper = styled.View`
  margin-bottom: 24px;
  margin-top: 9px; 
`;

export const Form = styled.View`
  padding: 0 20px;
  width: 100%; 
`;

export const ErrorMessage = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.error};
`;
