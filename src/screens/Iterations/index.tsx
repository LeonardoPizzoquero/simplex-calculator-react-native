import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
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

              <Text>
                Z = {iteration[0][iteration[0].length - 1].toFixed(2)}
              </Text>
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
