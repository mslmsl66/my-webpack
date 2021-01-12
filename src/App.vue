<template>
  <div>
    <el-carousel
      trigger="click"
      height="98vh"
      :autoplay="false"
      @change="handleCarouselChange"
    >
      <el-carousel-item
        v-for="item in Array.from(page)"
        :key="item"
      >
        <keep-alive>
          <component
            :is="view"
          >
          </component>
        </keep-alive>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import customEvent from './components/customEvent.vue';
import memoize from './components/memoize.vue';
import metricCard from './components/metricCard.vue';
export default {
  components: {
    customEvent,
    memoize,
    metricCard
  },
  data () {
    return {
      pageIndex: 0,
      page: {
        0: 'memoize',
        1: 'customEvent',
        2: 'metricCard',
        length: 3
      }
    };
  },
  computed: {
    view () {
      return this.page[this.pageIndex];
    }
  },
  methods: {
    handleCarouselChange (val) {
      // 走马灯切换
      this.pageIndex = val;
    }
  }
};
</script>

<style>
  /* .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
</style>