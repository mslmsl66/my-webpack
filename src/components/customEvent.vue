<template>
  <div
    class="event"
  >
    <img
      src="../asset/event.jpg"
      class="event-image"
    />
    <answer
      class="event-answer"
    >
      <template
        v-slot:code
      >
        <img src="../asset/event-answer.jpg"/>
      </template>
      <template
        v-slot:runtime
      >
        <div
          class="runtime"
        >
          <el-button
            type="primary"
            @click="handleConfirm"
          >
            执行查看
          </el-button>
        </div>
      </template>
    </answer>
  </div>
</template>

<script>
import answer from './answer.vue';
import { EventEmitter } from '../answers/util';
export default {
  components: {
    answer
  },
  data () {
    return {
      emitter: null
    };
  },
  methods: {
    handleConfirm () {
      this.emitter = this.emitter || new EventEmitter();
      this.emitter.on('foo', function(e){
        console.log('listening foo event 1', e);
      });
      this.emitter.on('foo', function(e){
        console.log('listening foo event 2', e);
      });
      this.emitter.on('bar', function(e){
        console.log('listening bar event', e);
      });
      // 监听全部事件
      this.emitter.on('*', function(){
        console.log('listening all events');
      });
      this.emitter.trigger('foo', {name : 'John'});
      this.emitter.trigger('bar', {name : 'Sun'});
      this.emitter.trigger('*', {name : 'Sun'});
      this. emitter.off('foo');
    }
  }
};
</script>

<style scoped>
  .event {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .event-image {
    flex: 1 1 auto;
    max-height: 25vh;
    max-width: 60vw;
  }

  .event-answer {
    flex: 3 3 auto;
  }
</style>