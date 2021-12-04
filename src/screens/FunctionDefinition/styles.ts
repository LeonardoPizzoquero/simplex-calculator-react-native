import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Form = styled.View`
  margin-top: 35px;
  width: 100%;
  padding: 0 20px;
  padding-bottom: 20px;
  justify-content: space-between;
  flex: 1;
`;

export const FunctionContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 24,
  },
})`
  width: 100%;
  margin-top: 14px;
`;

export const FieldsContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
  margin-top: 14px; 
  height: ${RFValue(250)}px;
  margin-bottom: 40px;
`;

export const RestrictionValueContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 220px;
`;

export const ObjectiveFunctionContainer = styled.View`
  height: 150px;
`;
