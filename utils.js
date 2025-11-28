const errorMessages = {
  operands: 'не хватает одного или нескольких операндов',
  operator: 'в выражении должны использоваться только операторы +, -, /, *',
  numbers: 'операнды могут быть только числами',
};

const operatorPattern = /[+\-/*]/;
const digitPattern = /^[0-9]$/;

const normalize = (equation) =>
  typeof equation === 'string' ? equation.replace(/\s+/g, '') : '';

export function validateEquation(equation) {
  const normalized = normalize(equation);

  if (!normalized || normalized.length < 3) {
    return errorMessages.operands;
  }

  const operatorMatch = normalized.match(operatorPattern);

  if (!operatorMatch) {
    return errorMessages.operator;
  }

  const operatorIndex = operatorMatch.index ?? -1;

  if (normalized.length !== 3 || operatorIndex !== 1) {
    return errorMessages.operands;
  }

  const leftOperand = normalized[0];
  const rightOperand = normalized[2];

  if (!digitPattern.test(leftOperand) || !digitPattern.test(rightOperand)) {
    return errorMessages.numbers;
  }

  return '';
}

export function calcEquation(equation) {
  const normalized = normalize(equation);

  if (validateEquation(normalized)) {
    return '';
  }

  const operator = normalized[1];
  const leftOperand = Number(normalized[0]);
  const rightOperand = Number(normalized[2]);
  let result = '';

  switch (operator) {
    case '+':
      result = leftOperand + rightOperand;
      break;
    case '-':
      result = leftOperand - rightOperand;
      break;
    case '*':
      result = leftOperand * rightOperand;
      break;
    case '/':
      result = leftOperand / rightOperand;
      break;
    default:
      return '';
  }

  return String(result);
}
