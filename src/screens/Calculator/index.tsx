import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Container} from '../../components/Container';
import {Button} from '../../components/Forms/Button';
import {Input} from '../../components/Forms/Input';
import {Label} from '../../components/Forms/Label';

import {StackParamList} from '../routes/app.routes';

import {Image, InputWrapper, Form, ErrorMessage} from './styles';

type CalculatorProps = NativeStackScreenProps<StackParamList, 'Calculator'>;

export function Calculator({navigation}: CalculatorProps) {
  const [restrictionsNumber, setRestrictionsNumber] = useState('');
  const [variablesNumber, setVariablesNumber] = useState('');
  const [errors, setErrors] = useState({
    restrictionsNumber: '',
    variablesNumber: '',
  });

  function handleStartAlgorithm() {
    let hasErrors = false;

    if (!restrictionsNumber) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        restrictionsNumber: 'Digite o número de restrições.',
      }));

      hasErrors = true;
    }

    if (!variablesNumber) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        variablesNumber: 'Digite o número de variáveis.',
      }));

      hasErrors = true;
    }

    if (hasErrors) return;

    navigation.navigate('FunctionDefinition', {
      restrictionsNumber,
      variablesNumber,
    });
  }

  return (
    <Container>
      <Image source={require('../../assets/logo.png')} />

      <Form>
        <Label>Número de variáveis de decisão:</Label>
        <InputWrapper>
          <Input
            placeholder="0"
            value={variablesNumber}
            onBlur={() => setErrors({...errors, variablesNumber: ''})}
            onChangeText={setVariablesNumber}
            keyboardType="numeric"
          />
          <ErrorMessage>{errors.variablesNumber}</ErrorMessage>
        </InputWrapper>

        <Label>Número de restrições:</Label>
        <InputWrapper>
          <Input
            placeholder="0"
            value={restrictionsNumber}
            onBlur={() => setErrors({...errors, restrictionsNumber: ''})}
            onChangeText={setRestrictionsNumber}
            keyboardType="numeric"
          />
          <ErrorMessage>{errors.restrictionsNumber}</ErrorMessage>
        </InputWrapper>

        <Button
          title="CONTINUAR"
          onPress={handleStartAlgorithm}
        />
      </Form>
    </Container>
  );
}

