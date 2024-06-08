export const valueExists = (arr, id) => {
  return arr.some(function (el) {
    return el.id === id;
  });
};

export const valueExistsAnyField = (arr, field, id) => {
  return arr.some(function (el) {
    return el[field] === id;
  });
};
