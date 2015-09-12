import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

class FluxStore extends EventEmitter {
  constructor() {
    super();
  }

  dispatchToken: string;

  _cleanState: () => void;
  _dispatcherHandler: (action: any) => void;

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default FluxStore;
