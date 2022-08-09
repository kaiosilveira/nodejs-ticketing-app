const ternaryFnExecution = (condition, trueExp, falseExp, args) => {
  return condition ? trueExp(args) : falseExp(args);
};

export default ternaryFnExecution;
