import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Table,
  Row,
} from 'react-native-table-component';

import {StackParamList} from '../routes/app.routes';

import {
  Container,
  Title,
  Header,
  VariableText,

} from './styles';

type IterationsProps = NativeStackScreenProps<
    StackParamList, 'Iterations'
>;

export function Iterations({route}: IterationsProps) {
  const {iterations, restrictionsNumber, variablesNumber} = route.params;

  const variablesRange = Array.from({length: variablesNumber}, (_, i) => i + 1);
  const restrictionsRange = Array.from({
    length: restrictionsNumber},
  (_, i) => i + 1,
  );

  const variables = useMemo(() => {
    return variablesRange.map((variable) => `X${variable}`);
  }, [variablesRange]);

  const slackVariables = useMemo(() => {
    return restrictionsRange.map((restriction) => `XF${restriction}`);
  }, [restrictionsRange]);

  const tableContent = {
    tableHead: ['Z', ...variables, ...slackVariables, 'b'],
  };

  const columnsSize = useMemo(() => {
    return tableContent.tableHead.map(() => 100);
  }, [tableContent]);

  function getCol(matrix: number[][], col: number) {
    const column = [];

    for (let i = 0; i < matrix?.length; i++) {
      column.push(matrix[i][col]);
    }

    return column;
  }

  function checkIfIsBasic(columns: number[]) {
    let hasNonZeroOrOne = false;
    let foundOnes = 0;

    columns.forEach((element) => {
      if (element !== 0 && element !== 1) {
        hasNonZeroOrOne = true;
      }

      if (element === 1) {
        foundOnes++;
      }
    });

    if (hasNonZeroOrOne) {
      return false;
    }

    if (foundOnes !== 1) {
      return false;
    }

    return true;
  }

  const [basicVariables, notBasicVariables] = useMemo(() => {
    const basics: number[][] = [];
    const notBasics: number[][] = [];
    const original = [...iterations];

    for (let i = 0; i < original.length; i++) {
      for (let j = 0; j < original[0].length - 1; j++) {
        for (let k = 0; k < original[0][0].length; k++) {
          const column = getCol(original[j], k);

          if (checkIfIsBasic(column)) {
            const findBasic =
            basics.find((basic) =>
              basic[0] === j && basic[1] === k);

            if (!findBasic) {
              basics.push([j, k, column.findIndex((element) => element === 1)]);
            }
          } else {
            const findNotBasic =
            notBasics.find((notBasic) =>
              notBasic[0] === j && notBasic[1] === k);


            if (!findNotBasic) {
              notBasics.push([j, k, 0]);
            }
          }
        }
      }
    }

    return [basics, notBasics];
  }, []);

  return (
    <Container >
      {iterations.map((iteration, index) => (
        <View style={{marginBottom: 40}} key={index}>
          <Header>
            <Title>{
            index === iterations.length - 1 ?
            'Solução ótima' :
            `Algoritmo Simplex ${index + 1}`
            }</Title>
          </Header>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View>
              <Table borderStyle={{borderColor: '#222', borderWidth: 1}}>
                <Row
                  data={tableContent.tableHead}
                  widthArr={columnsSize}
                  style={styles.head}
                  textStyle={styles.headText}
                />
              </Table>

              <Table borderStyle={{borderColor: '#222', borderWidth: 1}}>
                {
                  iteration.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow.map((variable) => variable.toFixed(2))}
                      widthArr={columnsSize}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>

              <VariableText style={{marginTop: 8, marginBottom: 8}}>
                VZ (Valor de Z) = {' '}
                {iteration[0][iteration[0].length - 1].toFixed(2)}
              </VariableText>

              <VariableText style={{marginBottom: 8}}>
                VB (Variáveis básicas) =
              </VariableText>

              {basicVariables.filter((variable) => variable[0] === index)
                  .map((variable, idx) => {
                    if (variable[1] === 0 ||
                      variable[1] === columnsSize.length - 1
                    ) {
                      return null;
                    }

                    return (
                      <View key={idx}>
                        <VariableText >
                          {tableContent.tableHead[variable[1]]} = {' '}
                          {iteration[variable[2]][iteration[0].length - 1]
                              .toFixed(2)}
                        </VariableText>
                      </View>
                    );
                  })}

              <VariableText style={{marginTop: 10, marginBottom: 8}}>
                VNB (Variáveis não básicas) =
              </VariableText>

              {notBasicVariables.filter((variable) => variable[0] === index)
                  .map((variable, idx) => {
                    if (variable[1] === 0 ||
                      variable[1] === columnsSize.length - 1
                    ) {
                      return null;
                    }

                    return (
                      <View key={idx}>
                        <VariableText >
                          {tableContent.tableHead[variable[1]]}
                        </VariableText>
                      </View>
                    );
                  })}

            </View>
          </ScrollView>
        </View>
      ))}
    </Container>
  );
}


const styles = StyleSheet.create({
  head: {
    height: 40,
    backgroundColor: '#FFD600',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'normal',
  },
  headText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0d1321',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#F7F8FA',
  },
});
