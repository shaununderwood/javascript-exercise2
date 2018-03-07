
const ITEM_DEFAULTS = {
  TEXT: 'New Item',
  POSITION: null,
  TYPE: 'CATEGORY',
  PARENT_ID: null,
};

class Item {
  constructor(config) {
    config = config || {};
    this.id = getNewId();
    this.text = config.text || ITEM_DEFAULTS.text;
    this.position = config.position || ITEM_DEFAULTS.POSITION;
    this.type = config.type || ITEM_DEFAULTS.TYPE;
    if (this.type === CATEGORY) {
      this.list = [];
    }
    this.parentId = config.parentId || ITEM_DEFAULTS.PARENT_ID;
  }
  addItem(item) { // reducer
    if (this.type === CATEGORY)
      this.list.push(item.id);
  }
  removeItem(item) { // reducer
    if (this.type === CATEGORY)
      this.list = this.list.filter(n => n !== item.id);
  }
  updateItem(delta) { // reducer
    if (typeof (delta.type) !== 'undefined') delete delta.type;
    Object.keys(delta).forEach(key => this[key] = delta[key]);
  }
  static hydrateFromPOJO(raw) {
    let item = new Item();
    Object.keys(raw).forEach(key => item[key] = raw[key]);
    return item;
  }
}
function testItem() {
  a = new Item();
  b = new Item();
  c = new Item();

  a.addItem(b);
  a.addItem(c);
  console.assert(a.list[0] === b.id);
  console.assert(a.list[1] === c.id);

  a.removeItem(b);
  console.assert(a.list[0] === c.id);

  a.updateItem({ text: 'Shaun' });
  console.assert(a.text === 'Shaun');

  d = new Item({ type: null, text: null });
  console.assert(d.type !== null, 'must not be null');
  console.assert(d.text !== null, 'must not be null');
}