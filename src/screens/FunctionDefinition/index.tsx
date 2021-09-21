import React, {useState, Fragment, useCallback, useEffect} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Button} from '../../components/Forms/Button';
import {Container} from '../../components/Container';
import {Label} from '../../components/Forms/Label';
import {Select} from '../../components/Forms/Select';
import {Variable} from '../../components/Variable';
import {Input} from '../../components/Forms/Input';

import {StackParamList} from '../routes/app.routes';

import {
  Form,
  FunctionContainer,
  FieldsContainer,
  FunctionGoal,
  RestrictionValueContainer,
  ObjectiveFunctionContainer,
} from './styles';
import {simplexAlgorithm} from '../../utils/simplexAlgorithm';

export type DefaultVariable = {
  id: number;
  title: string;
  value: string;
}

export interface TVariable {
  id: number;
  restrictionValue: string,
  functionType: string
  restrictions: DefaultVariable[]
}

type FunctionDefinitionProps = NativeStackScreenProps<
    StackParamList, 'FunctionDefinition'
>;

export function FunctionDefinition({
  route,
}: FunctionDefinitionProps) {
  const [objectiveFunction, setObjectiveFunction] =
    useState<DefaultVariable[]>([]);
  const [restrictions, setRestrictions] = useState<TVariable[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const {restrictionsNumber, variablesNumber} = route.params;

  function handleChangeFunctionVariable(text: string, id: number) {
    setObjectiveFunction((oldState) => oldState.map((variable) => {
      if (variable.id === id) {
        variable.value = text;
      }

      return variable;
    }));
  }

  function handleChangeRestrictionTotal(text: string, id: number) {
    setRestrictions((oldState) => oldState.map((line) => {
      if (line.id === id) {
        line.restrictionValue = text;
      }

      return line;
    }));
  }

  function handleChangeRestrictionType(text: string, id: number) {
    setRestrictions((oldState) => oldState.map((line) => {
      if (line.id === id) {
        line.restrictionValue = text;
      }

      return line;
    }));
  }

  function handleChangeRestrictionValue(
      text: string,
      lineId: number,
      id: number,
  ) {
    setRestrictions((oldState) => oldState.map((line) => {
      if (line.id !== lineId) {
        return line;
      }

      return {
        ...line,
        restrictions: line.restrictions.map((variable) => {
          if (variable.id === id) {
            variable.value = text;
          }

          return variable;
        }),
      };
    }));
  }

  const getObjectiveFunctionVariables = useCallback(() => {
    const variablesArray = Array.from(
        {length: Number(variablesNumber)},
        (_, number) => number + 1);

    return variablesArray.map((number) => ({
      id: number,
      title: `X${number}`,
      value: '',
    }));
  }, []);

  const getRestrictions = useCallback(() => {
    const objectiveFunctionVariables = Array.from(
        {length: Number(variablesNumber)},
        (_, number) => number + 1);

    const variablesArray = Array.from(
        {length: Number(restrictionsNumber)},
        (_, number) => number + 1);

    return variablesArray.map((number) => ({
      id: number,
      restrictionValue: '',
      functionType: '>=',
      restrictions: objectiveFunctionVariables.map((variable) => ({
        id: variable,
        title: `X${variable}`,
        value: '',
      })),
    }));
  }, []);

  useEffect(() => {
    setObjectiveFunction(getObjectiveFunctionVariables());
    setRestrictions(getRestrictions());
  }, []);

  function handleSubmit() {
    console.log('Aqui');
    simplexAlgorithm(objectiveFunction, restrictions);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}
    >
      <Container>
        <Form>
          <Label>Qual o objetivo da função?</Label>

          <FunctionGoal>
            <Select
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) =>
                setSelectedLanguage(String(itemValue))
              }
            >
              <Picker.Item
                style={{
                  fontSize: RFValue(18),
                }}
                label="Maximizar"
                value="max"
              />
              <Picker.Item
                style={{
                  fontSize: RFValue(18),
                }}
                label="Minimizar"
                value="min"
              />
            </Select>
          </FunctionGoal>

          <FieldsContainer>
            <ObjectiveFunctionContainer>
              <Label>Função objetiva (FO):</Label>
              <FunctionContainer>
                {objectiveFunction.map((variable, index, arr) => (
                  <Variable
                    key={variable.id}
                    isLastVariable={arr.length - 1 === index}
                    title={variable.title}
                    value={variable.value}
                    onChangeText={(text) =>
                      handleChangeFunctionVariable(text, variable.id)
                    }
                  />
                ))}
              </FunctionContainer>
            </ObjectiveFunctionContainer>

            <Label>Restrições:</Label>

            {restrictions.map((line, idx) => (
              <FunctionContainer key={line.id}>
                {line.restrictions.map((restriction, index) => (
                  <Fragment key={restriction.id}>
                    <Variable
                      title={restriction.title}
                      isLastVariable={
                        restrictions[idx].restrictions.length - 1 === index
                      }
                      value={restriction.value}
                      onChangeText={(text) =>
                        handleChangeRestrictionValue(
                            text,
                            line.id,
                            restriction.id,
                        )
                      }
                    />

                    {restrictions[idx].restrictions.length - 1 === index && (
                      <RestrictionValueContainer>
                        <View style={{
                          width: 130,
                          marginRight: 18,
                        }}>
                          <Select
                            selectedValue={line.functionType}
                            onValueChange={(itemValue) =>
                              handleChangeRestrictionType(
                                  String(itemValue),
                                  line.id,
                              )
                            }
                          >
                            <Picker.Item
                              style={{
                                fontSize: RFValue(18),
                              }}
                              label="="
                              value="="
                            />
                            <Picker.Item
                              style={{
                                fontSize: RFValue(18),
                              }}
                              label=">="
                              value=">="
                            />
                            <Picker.Item
                              style={{
                                fontSize: RFValue(18),
                              }}
                              label="<="
                              value="<="
                            />
                          </Select>
                        </View>

                        <View style={{
                          width: 80,
                          marginRight: 18,
                        }}>
                          <Input
                            keyboardType="numeric"
                            placeholder="0"
                            value={line.restrictionValue}
                            onChangeText={(text) =>
                              handleChangeRestrictionTotal(text, line.id)
                            }
                          />
                        </View>
                      </RestrictionValueContainer>
                    )}
                  </Fragment>
                ))}
              </FunctionContainer>
            ))}
          </FieldsContainer>
          <Button title="CONTINUAR" onPress={handleSubmit} />
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
}
