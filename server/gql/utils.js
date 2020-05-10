const filterUpdates = inputs => (
  Object.entries(inputs).reduce(
    (acc, [key, val]) => (val == null ? { ...acc } : { ...acc, [key]: val }),
    {}
  )
);

module.exports = {
  filterUpdates
};
