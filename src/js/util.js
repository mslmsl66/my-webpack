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
  sqrt
};