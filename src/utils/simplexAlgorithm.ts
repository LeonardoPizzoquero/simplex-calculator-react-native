import {DefaultVariable, TVariable} from '../screens/FunctionDefinition';

export function simplexAlgorithm(
    objectiveFunction: DefaultVariable[],
    restrictions: TVariable[],
) {
  const objectiveFunctionMax = objectiveFunction.map((variable) =>
    !variable.value ? -1 : Number(variable.value) * -1);

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
      !variable.value ? newLine.push(1) : newLine.push(Number(variable.value)),
    );

    const slackVariables = Array.from({
      length: objectiveFunctionMax.length},
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

  while (solutionIsNotGood) {
    solutionIsNotGood = false;
  }

  console.log(initialMatrix);
}
