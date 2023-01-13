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

export default { empty, wait, numberWithCommas, removeCommas };
