import {DefaultVariable, TVariable} from '../screens/FunctionDefinition';

export function simplexAlgorithm(
    objectiveFunction: DefaultVariable[],
    restrictions: TVariable[],
) {
  try {
    const allIterations = [];
    const objectiveFunctionMax = objectiveFunction.map((variable) =>
      !variable.value ? 0 : Number(variable.value) * -1);

    const initialMatrix = [];

    initialMatrix[0] = [
      1,
      ...objectiveFunctionMax,
      ...objectiveFunctionMax.map(() => 0),
      0,
    ];

    restrictions.map((restriction) => {
      let newLine = [0];

      restriction.restrictions.map((variable) =>
      !variable.value ? newLine.push(0) : newLine.push(Number(variable.value)),
      );

      const slackVariables = Array.from({
        length: restrictions.length},
      (_, index) => index + 1,
      ).map((number) => number === restriction.id ? 1 : 0);

      newLine = [
        ...newLine,
        ...slackVariables,
        Number(restriction.restrictionValue),
      ];

      initialMatrix.push(newLine);
    });

    let solutionIsNotGood = true;

    // const algorithmMatrix = [...initialMatrix];
    const algorithmMatrix = [
      [1, -4, -6, -2, -1, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 2, 1, 0, 0, 0, 480],
      [0, 2, 4, 2, -1, 0, 1, 0, 0, 720],
      [0, 3, 2, -1, 2, 0, 0, 1, 0, 830],
      [0, 1, 2, 2, 1, 0, 0, 0, 1, 606],
    ];

    allIterations.push([...algorithmMatrix]);

    while (solutionIsNotGood) {
      const columnInput = {
        value: 0,
        index: 0,
      };

      const rowOutput = {
        value: 0,
        index: 0,
      };

      // Verifica se há valores negativos na FO
      const foHasNegativeValues = algorithmMatrix[0].some((column) =>
        column < 0,
      );


      if (!foHasNegativeValues) {
        solutionIsNotGood = false;

        break;
      }


      // Escolhe a coluna input
      for (let j = 1; j <= algorithmMatrix[0].length - 2; j++) {
        if (algorithmMatrix[0][j] < columnInput.value) {
          columnInput.value = algorithmMatrix[0][j];
          columnInput.index = j;
        }
      }


      // Escolhe a linha output
      const rowOutputResults = [];

      for (let i = 1; i < algorithmMatrix.length; i++) {
        const columnValue = algorithmMatrix[i][columnInput.index];
        const bValue = algorithmMatrix[i][algorithmMatrix[i].length - 1];

        const result = bValue / columnValue;

        if (result > 0) {
          rowOutputResults.push({result, index: i});
        }
      }

      rowOutput.index = rowOutputResults[0]?.index;
      rowOutput.value = rowOutputResults[0]?.result;

      for (let i = 1; i < rowOutputResults.length; i++) {
        if (rowOutputResults[i]?.result < rowOutput?.value) {
          rowOutput.index = rowOutputResults[i]?.index;
          rowOutput.value = rowOutputResults[i]?.result;
        }
      }


      const pivotElement = algorithmMatrix[rowOutput.index][columnInput.index];
      const oldPivotLine = algorithmMatrix[rowOutput.index];
      const newPivotLine: number[] = [];

      // Verifica quais linhas da nova matriz foram preenchidas
      const finishedLines = Object.fromEntries(new Map(Array.from({
        length: algorithmMatrix.length,
      },
      (_, index) => {
        return [
          index,
            index === rowOutput.index ? true : false,
        ];
      })));

      for (let i = 0; i < oldPivotLine.length; i++) {
        newPivotLine.push(oldPivotLine[i] / pivotElement);
      }

      // Cria a nova linha pivot
      algorithmMatrix[rowOutput.index] = newPivotLine;
      const linesValues = Object.values(finishedLines);

      // Enquanto as linhas não forem preenchidas
      while (linesValues.some((line) => !line)) {
        const currentLine = linesValues.lastIndexOf(false);
        const currentInputValue =
          algorithmMatrix[currentLine][columnInput.index];

        const pivotLineResult = algorithmMatrix[currentLine].map(
            (_, index) => {
              return newPivotLine[index] * -currentInputValue;
            });

        const newLine = pivotLineResult.map((column, index) => {
          return column + algorithmMatrix[currentLine][index];
        });

        linesValues[currentLine] = true;
        algorithmMatrix[currentLine] = newLine;
      }

      allIterations.push([...algorithmMatrix]);
    }

    return allIterations;
  } catch (err) {
    console.log(err);
  }
}
