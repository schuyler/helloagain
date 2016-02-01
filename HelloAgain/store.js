'use strict';

import { InteractionManager } from 'react-native';
let Store = require('react-native-simple-store');

export class Model {
  constructor(name, key, eventHandler, syncPeriod) {
    this.name = name;
    this.key = key;
    this.needsSync = false;
    this.eventHandler = eventHandler || (() => {});
    this.data = null;
    this.loading = Store.get(this.name).then((data) => {
      this.data = data || {};
      this.eventHandler(this.name, "ready");
    });
    this.syncHandlerID = setInterval(() => {
      if (this.needsSync) {
        InteractionManager.runAfterInteractions(() => {
          this.sync();
        });
      }
    }, syncPeriod || 5.0);
  }

  save(item) {
    this.data[item[this.key]] = Object.assign({}, item);
    this.needsSync = true;
    this.eventHandler(this.name, "save", item);
  }

  _copy(key) {
    // Make a shallow copy of a stored value
    return Object.assign({}, this.data[key]);
  }

  load(key) {
    if (this.data) {
      this.eventHandler(this.name, "load", key);
      return this._copy(key);
    } else {
      this.eventHandler(this.name, "race");
      return null;
    }
  }

  find(filter) {
    if (!this.data) {
      this.eventHandler(this.name, "race");
      return null;
    }
    let items = [];
    for (let key in this.data) {
      add_item: {
        for (let field in filter) {
          if (this.data[key][field] !== filter[field]) {
            break add_item;
          }
        }
        items.push(this._copy(key));
      }
    }
    this.eventHandler(this.name, "all", items.length);
    return items;
  }

  all() {
    // find() sans filter
    return this.find();
  }

  remove(key) {
    if (key in this.data) {
      delete this.data[key];
      this.needsSync = true;
      this.eventHandler(this.name, "remove", key);
    }
  }

  clear() {
    this.data = {};
    this.eventHandler(this.name, "clear");
    return this.sync();
  }

  hasLoaded() {
    return Promise.resolve(this.loading);
  }

  sync() {
    this.needsSync = false;
    return Store.save(this.name, this.data).then(() => {
      this.eventHandler(this.name, "sync");
    });
  }

  stop() {
    this.sync();
    clearInterval(this.syncHandlerID);
    this.data = null;
    this.eventHandler(this.name, "stopped");
  }
}
