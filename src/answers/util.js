/**
 * 缓存fn执行结果的封装函数
 * @param {Function} fn 执行函数
 * @returns 封装
 */
const memoize = fn => {
  if (typeof fn !== 'function') {
    throw 'not function';
  }
  // 闭包保存缓存
  let map = new Map();
  return (...args) => {
    let key = JSON.stringify(args);
    if (map.has(key)) {
      let result = map.get(key);
      alert('命中缓存: ' + result);
      return result;
    } else {
      let result = fn.call(this, args);
      alert('第一次执行: ' + result);
      map.set(JSON.stringify(args), result);
      return result;
    }
  };
};

// 自定义事件处理器，单例，应该得是全局唯一的
class EventEmitter {
  // static #instance;
  constructor () {
    // 缓存事件
    this.eventCache = new Map();
  }
  // static getInstance () {
  //   if (!this.#instance) {
  //     this.#instance = new EventEmitter();
  //   }
  //   return this.#instance;
  // }

  /**
   * 绑定事件
   * @param {String} eventName 事件名
   * @param {Function} callback 
   */
  on (eventName, callback) {
    if (typeof callback !== 'function') {
      throw 'not function';
    }
    // on只保留event和callback不做初始化
    if (this.eventCache.has(eventName)) {
      this.eventCache.get(eventName).push(callback);
    } else {
      this.eventCache.set(eventName, [callback]);
    }
  }

  /**
   * 解绑事件
   * @param {String} eventName 
   */
  off (eventName) {
    this.eventCache.get(eventName)?.splice(0);
  }

  /**
   * 触发事件
   * @param {String} eventName 
   * @param {Object} detail 参数
   */
  trigger (eventName, detail) {
    // 触发时做初始化
    if (this.eventCache.has(eventName)) {
      let event = new CustomEvent(eventName, { detail: detail });
      let callbacks = [];
      if (eventName === '*') {
        // 所有事件callback都触发
        for (let item of this.eventCache) {
          callbacks = callbacks.concat(item[1]);
        }
      } else {
        callbacks = this.eventCache.get(eventName);
      }
      callbacks.forEach(cb => {
        window.addEventListener(eventName, cb);
      });
      window.dispatchEvent(event);
      callbacks.forEach(cb => {
        window.removeEventListener(eventName, cb);
      });
    }
  }
}

/**
 * 求根
 * @param {Number} num 需要计算的值
 * @returns 求根值
 */
const sqrt = num => {
  return Math.sqrt(num);
};

export {
  memoize,
  sqrt,
  EventEmitter
};