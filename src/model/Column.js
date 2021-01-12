// 指标字段
export default class Column {
  constructor({ name, key, value, formatValue = {}, contrast = {} }) {
    if (!name) {
      throw 'name不能为空';
    }
    if (!key) {
      throw 'key不能为空';
    }
    if (!value) {
      throw 'value不能为空';
    }
    this.name = name;
    this.key = key;
    this.value = value;
    this.formatValue = formatValue;
    this.contrast = contrast;
  }
}