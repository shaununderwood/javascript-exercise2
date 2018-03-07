
// really, most or all of this should be done on the server
// facing lots of client-side potential issues

getNewId = () => { // TODO poor mans unique id
  return Math.floor(Math.random() * 10000000);
};

const CATEGORY = 'CATEGORY';
const ITEM = 'ITEM';
const ONLINE = 'ONLINE';
const OFFLINE = 'OFFLINE';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';
const NEW = 'NEW';

const ITEM_DEFAULTS = {
  TEXT: 'New Item',
  POSITION: null,
  TYPE: CATEGORY,
  PARENT_ID: null,
};


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

  send(action, item) {
    if (this.status !== ONLINE) {
      console.error('NetworkAdapter', 'Send', 'Attempted to send data but no connection was established', this);
      return;
    }
    let msg = {
      type: 'APP',
      clientId: this.clientId,
      action: action,
      item: item
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

      if (action === DELETE) {
        return this.itemList.removeItem(item, true);
      }

      if (action === UPDATE) {
        return this.itemList.updateItem(item, true);
      }

      if (action === NEW) {
        return this.itemList.addItem(item, true);
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

list.sync();




