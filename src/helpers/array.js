const arrayHelper = {
  deepCopy: (a) => {
    return JSON.parse(JSON.stringify(a));
  },
};

export default arrayHelper;
