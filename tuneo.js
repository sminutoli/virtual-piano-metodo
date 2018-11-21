const tuneCalcs = {
  minorUp() {
    return createTune(this.value + 3);
  },
  majorUp() {
    return createTune(this.value + 4);
  },
  minorDown() {
    return createTune(this.value - 3);
  },
  majorDown() {
    return createTune(this.value - 4);
  }
};
const createTune = value => ({
  __proto__: tuneCalcs,
  value
});
const createSequence = (initialValue, ...instructions) => {
  const sequence = instructions.reduce(
    (acc, action) => {
      const last = acc[acc.length - 1].value;
      acc.push({
        action: action,
        value: createTune(last)[action]().value
      });
      return acc;
    },
    [{ value: initialValue, action: "base" }]
  );
  return sequence;
};
const initialTune = () => 48 + Math.floor(Math.random() * 12);

loweroctave();
higheroctave();
