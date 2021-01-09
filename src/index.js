import _ from 'lodash';
import './style.css';
import print from './print';

function component() {
  var element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.onclick = print.bind(null, 'Hello zkl');
  element.appendChild(btn);

  var f = () => {
    return new Promise((resolve) => {
      resolve();
    }).then(() => {
      console.log(123);
    });
  };
  f();

  const test = () => {
    'es8'.padStart(2);
  };
  test();

  return element;
}

document.body.appendChild(component());