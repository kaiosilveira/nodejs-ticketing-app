const removePrivateValues = env => {
  env.logger.info('removing private values');
  return { ...env, ['_renfe']: undefined };
};

export default removePrivateValues;
