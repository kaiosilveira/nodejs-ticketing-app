const reserve = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ reservationCode: parseInt(Math.random() * 9999, 10) });
    }, 1000);
  });
};

module.exports = { reserve };
