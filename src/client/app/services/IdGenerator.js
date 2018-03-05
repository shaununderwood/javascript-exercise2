
export let idMap = {};

function simpleindex(_config) {

  let config = _config || {
    startValue: 1
  };
  function* idGenerator(startValue) {
    while (true) yield startValue++;
  }

  let idGen = idGenerator(startValue);

  let getNewId = (ptr = null) => {
    let id = idGen.next().value;
    if (ptr !== null) idMap[id] = ptr;
    return id;
  };
};

/**
 * Will create a new index with value starting from 1 or config.startValue
 * When getNewId is called with a value getNewId(ptr) ptr is added to index[newId]
 */
export default function IndexedIdFactory(config) {
  config = config || {};
  config.startValue = config.startValue || 1;
  config.mapToField = config.mapToField || 'id';

  let index = {};
  let mapToField = {};
  let fieldToMap = {};

  function* idGenerator(startValue) {
    while (true) yield startValue++;
  }
  let idGen = idGenerator(config.startValue);

  function getNewId(ptr = null) {
    let id = idGen.next().value;
    if (ptr !== null) {
      index[id] = ptr;
      // mapToField[id] = ptr[config.mapToField];
      // fieldToMap[ptr[config.mapToField]] = id;
    }
    return id;
  };
  return {
    index: index,
    mapToField: mapToField,
    fieldToMap: fieldToMap,
    getNewId: getNewId,
  };
};
