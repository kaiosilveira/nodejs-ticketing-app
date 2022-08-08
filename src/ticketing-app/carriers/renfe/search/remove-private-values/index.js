const removePrivateValues = env => {
  return { ...env, ['_renfe']: undefined };
};

export default removePrivateValues;
