import Item from './Items';

class ItemList {
  constructor(initialState = null) {
    // clients will need initialState from the server
    if (initialState) {
      this.map = initialState.map;
      this.top = initialState.top;
    } else {
      this.map = {};
      this.top = new Item({ text: 'top most item', type: CATEGORY });
      this.mapItem(this.top);
    }
  }
  setNetworkAdapter(networkAdapter) {
    this.networkAdapter = networkAdapter;
  }
  mapItem(item) {
    this.map[item.id] = item;
  }
  addItem(raw) {

    if (this.map[raw.id]) {
      this.updateItem(raw, true);
      return;
    }

    let item = Item.hydrateFromPOJO(raw);
    this.map[item.id] = item;
    if (!!item.parentId) {
      this.map[item.parentId].addItem(item);
    }

  }
  newItem(text, type, parentItemId, fromNetwork) {
    parentItemId = parentItemId || this.top.id;
    let item = new Item({ text: text, type: type });
    let position = this.map[parentItemId].list.length;
    let parentItem = this.map[parentItemId];

    parentItem.addItem(item);
    item.updateItem({ position: position });
    this.mapItem(item);

    if (!fromNetwork)
      this.send('NEW', item, parentItemId);
    return item;
  }
  deleteItem(item, fromNetwork) {
    Object.keys(this.map).forEach(id => this.map[id].removeItem(item)); // TODO just give the data needed for the operation another else
    delete this.map[item.id];

    if (!fromNetwork)
      this.send('DELETE', item);
    return item.id;
  }
  updateItem(item) {
    this.map[item.id].updateItem(item);

    if (!fromNetwork)
      this.send('UPDATE', item);
    return this.map[item.id];
  }
  send(action, item) {
    this.networkAdapter.send(...arguments);
  }
  getAllData() {
    return {
      map: this.map,
      top: this.top
    };
  }
  sync() {
    this.send('SYNC', {});
  }
}
function testItemList() {
  a = new ItemList();
  b = a.newItem('test item'); // Category
  c = a.newItem('test with parent ' + b.id, ITEM, b.id)
  d = a.newItem('test with parent ' + b.id, ITEM, b.id)
  e = a.newItem('test with parent ' + b.id, CATEGORY, b.id)

  a.deleteItem(c);

  f = { id: d.id, text: 'chrome is funny', position: 2 };
  a.updateItem(f);
  console.assert(a.map[f.id].text === f.text, 'text should get updated');

  f.id = e.id;
  a.updateItem(f);
  console.assert(a.map[f.id].text === f.text, 'text should get updated');
}
