import Vue from 'vue';
import App from './App.vue';
import { Carousel, CarouselItem, Button, Form, FormItem, Input } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);

new Vue({
  el: '#app',
  render: h => h(App)
});