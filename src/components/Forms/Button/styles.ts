import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: 8px; 
  padding: 20px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.white};
`;
