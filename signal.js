let currentEffect = null;

function signal(initialValue) {
  let value = initialValue;
  let subscribers = [];
  return {
    get: () => {
      if (currentEffect) {
        subscribers.push(currentEffect);
      }
      return value;
    },
    set: (newValue) => {
      value = newValue;
      subscribers.forEach((subscriber) => subscriber());
    },
  };
}

function computed(fn) {
  return {
    get: () => fn(),
  };
}

function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

export { signal, computed, effect };