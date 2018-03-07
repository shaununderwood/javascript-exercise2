
getNewId = () => {
  return Math.floor(Math.random() * 10000000);
};

const CATEGORY = 'CATEGORY';
const ITEM = 'ITEM';
const ONLINE = 'ONLINE';
const OFFLINE = 'OFFLINE';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';
const NEW = 'NEW';

class Item {
  constructor(config) {
    this.id = getNewId();
    this.text = config.text || defaults.text;
    this.position = config.position || defaults.position;
    this.type = config.type || defaults.type;
    if (this.type === CATEGORY) {
      this.list = [];
    }
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
  hydrateFromPOJO(raw) {
    Object.keys(raw).forEach(key => this[key] = raw[key]);
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

class ItemList {
  constructor() {
    this.map = {};
    this.top = new Item({ text: 'top most item', type: CATEGORY });
    this.mapItem(this.top);
  }
  setNetworkAdapter(networkAdapter) {
    this.networkAdapter = networkAdapter;
  }
  mapItem(item) {
    this.map[item.id] = item;
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
  updateItem(item, fromNetwork) {
    this.map[item.id].updateItem(item);

    if (!fromNetwork)
      this.send('UPDATE', item);
    return this.map[item.id];
  }
  send(action, item) {
    this.networkAdapter.send(...arguments);
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

class NetworkAdapter {
  constructor(config) {
    this.clientId = Math.floor(Math.random() * 10000);
    this.config = config || {
      addess: 'ws://' + window.location.hostname + ':6502'
    };

    this.setupWebSocket()
  }
  setItemList(itemList) {
    this.itemList = itemList;
  }
  setupWebSocket() {
    this.status = OFFLINE;
    this.ws = new WebSocket(this.config.addess);
    this.ws.onopen = (e) => { this.onopen() };
    this.ws.onmessage = (e) => { this.receive(e.data) };
    this.ws.onerror = (e) => {
      this.lastError = e;
      console.error('NetworkAdapter', 'WebSocket', 'Error', e, this);
    };
  }
  onopen() {
    this.status = ONLINE;
    console.log('NetworkAdapter', 'WebSocket', 'onopen', this.status);
  }
  send(action, item, parentItemId) {
    if (this.status !== ONLINE) {
      console.error('NetworkAdapter', 'Send', 'Attempted to send data but no connection was established', this);
      return;
    }
    let msg = {
      type: 'APP',
      clientId: this.clientId,
      action: action,
      item: item,
      parentItemId: parentItemId
    }
    this.ws.send(JSON.stringify(msg));
  }
  receive(_msg) {
    let msg = JSON.parse(_msg);
    console.log('NetworkAdapter', 'received data', msg);

    if (msg.type === 'id') {
      this.clientId = msg.id;
      console.log('NetworkAdapter', 'received new clientId:' + msg.id);
      return;
    }
    if (msg.type === 'userlist') {
      console.log('NetworkAdapter', 'received new user list:' + msg.users);
      return;
    }

    const { clientId, item, action, parentItemId } = msg;

    if (clientId === this.clientId) return;

    if (item.type === CATEGORY) {
      debugger;
      if (action === DELETE) {
        return this.itemList.removeItem(item, true);
      }

      if (action === UPDATE) {
        return this.itemList.updateItem(item, true);
      }

      if (action === NEW) {
        return this.itemList.newItem(item.text, item.type, parentItemId, true);
      }

    } else {
      console.log('UNKNOWN ACTION RECEIVED:', action, item);
    }
  }
}

net = new NetworkAdapter();
list = new ItemList();

net.setItemList(list);
list.setNetworkAdapter(net);

