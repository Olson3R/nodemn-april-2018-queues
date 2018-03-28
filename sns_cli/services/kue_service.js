const kue = require('kue');

class KueService {
  static get kue() {
    return kue;
  }

  constructor() {
    this.queue = this.kue.createQueue();
  }

  get queue() {
    return this.queue;
  }
}
