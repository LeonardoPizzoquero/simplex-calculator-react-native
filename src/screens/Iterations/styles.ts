import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 40,
  },
})`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  width: 100%;
  padding: 40px 8px;
`;


export const Header = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${({theme}) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
`;

export const VariableText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
