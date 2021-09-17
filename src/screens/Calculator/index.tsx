import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Container} from '../../components/Container';
import {Button} from '../../components/Forms/Button';
import {Input} from '../../components/Forms/Input';
import {Label} from '../../components/Forms/Label';

import {StackParamList} from '../routes/app.routes';

import {Image, InputWrapper, Form} from './styles';

type CalculatorProps = NativeStackScreenProps<StackParamList, 'Calculator'>;

export function Calculator({navigation}: CalculatorProps) {
  const [restrictionsNumber, setRestrictionsNumber] = useState('');
  const [variablesNumber, setVariablesNumber] = useState('');

  return (
    <Container>
      <Image source={require('../../assets/logo.png')} />

      <Form>
        <Label>Número de variáveis de decisão:</Label>
        <InputWrapper>
          <Input
            placeholder="0"
            value={variablesNumber}
            onChangeText={setVariablesNumber}
            keyboardType="numeric"
          />
        </InputWrapper>

        <Label>Número de restrições:</Label>
        <InputWrapper>
          <Input
            placeholder="0"
            value={restrictionsNumber}
            onChangeText={setRestrictionsNumber}
            keyboardType="numeric"
          />
        </InputWrapper>

        <Button
          title="CONTINUAR"
          onPress={() => navigation.navigate('FunctionDefinition', {
            restrictionsNumber,
            variablesNumber,
          })}
        />
      </Form>
    </Container>
  );
}

