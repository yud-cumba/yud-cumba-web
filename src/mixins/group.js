/* eslint-disable no-return-assign */
export default {
  methods: {
    groupBy(array, key) {
      const newObject = {};
      array.forEach((x) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!newObject.hasOwnProperty(x[key])) {
          newObject[x[key]] = [];
        }
        newObject[x[key]].push(x);
      });
      return newObject;
    },
  },
};
