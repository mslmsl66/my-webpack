import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});


// function component() {
//   var element = document.createElement('div');
//   const btn = document.createElement('button');

//   // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
//   element.innerHTML = 'HHH';
//   element.classList.add('hello');

//   btn.onclick = print.bind(null, 'Hello zkl');
//   element.appendChild(btn);

//   var f = () => {
//     return new Promise((resolve) => {
//       resolve();
//     }).then(() => {
//       console.log(123);
//     });
//   };
//   f();

//   const test = () => {
//     'es8'.padStart(2);
//   };
//   test();

//   return element;
// }

// document.body.appendChild(component());