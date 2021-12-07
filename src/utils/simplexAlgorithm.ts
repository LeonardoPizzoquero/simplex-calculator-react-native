import {DefaultVariable, TVariable} from '../screens/FunctionDefinition';
import {normalCases} from './normalCases';

export function simplexAlgorithm(
    objectiveFunction: DefaultVariable[],
    restrictions: TVariable[],
) {
  try {
    const initialMatrix = [];

    const objectiveFunctionMax = objectiveFunction.map((variable) =>
      !variable.value ? 0 : Number(variable.value) * -1);

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

    const algorithmMatrix = [...initialMatrix];

    const result = normalCases(algorithmMatrix);

    return result;
  } catch (err) {
    console.log(err);
  }
}
