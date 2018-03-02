class Router {
  constructor() {
    console.log('Router Created');

    // TOD: must be a nice simple router pattern
    this.currentPath = '/';
    this.listeners = [];
    this.routeToContainer = {
      '/': 'LoginContainer',
      '/home': 'DeviceListContainer'
    };

    this.next = this.next.bind(this);
    window.onhashchange = this.next;
  }
  next(e) {
    let route = e.target.location.hash.split('#')[1];
    // for anyone listening, tell them we've updated out state
    this.listeners.map(cb => cb(route));
  }
  subscribe(cb) {
    this.listeners.push(cb);
  }
  changeTo(route) {
    this.listeners.map(cb => cb(route));
  }
  getContainer(route) {
    return this.routeToContainer[route];
  }
}
let router = router || new Router();
export default router;