import Reactotron from 'reactotron-react-native';

const empty = (val) => {
  if (!val || (typeof val === 'object' && !Object.keys(val).length)) {
    return true;
  } else {
    return false;
  }
};

const wait = async (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const removeCommas = (x) => {
  return x.replaceAll(',', '');
};

class Console {
  log(value) {
    Reactotron.log(value);
  }
}

const ca = new Console();

export { empty, wait, numberWithCommas, removeCommas, ca };
