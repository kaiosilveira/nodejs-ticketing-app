const removePrivateValues = env => {
  env._logger.info('removing private values');
  return { ...env, _renfe: undefined, _logger: undefined };
};

export default removePrivateValues;
