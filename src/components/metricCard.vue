<template>
  <div
    class="metric-card"
  >
    <img
      src="../asset/metric-card.jpg"
      class="metric-card-image"
    />
    <answer
      class="metric-card-answer"
    >
      <template
        v-slot:code
      >
        <img src="../asset/metric-card-answer.jpg"/>
      </template>
      <template
        v-slot:runtime
      >
        <div
          class="runtime"
        >
          <metric-card-template
            class="metric-inline"
            v-for="metric in metrics1"
            :key="metric.column.key"
            :height="metric.height"
            :width="metric.width"
            :column="metric.column"
          >
          </metric-card-template>

          <metric-card-template
            class="metric-block"
            v-for="metric in metrics2"
            :key="metric.column.key"
            :height="metric.height"
            :width="metric.width"
            :column="metric.column"
          >
          </metric-card-template>
        </div>
      </template>
    </answer>
  </div>
</template>

<script>
import answer from './answer.vue';
import metricCardTemplate from '../answers/metricCardTemplate.vue';
import Column from '../model/Column';
export default {
  components: {
    answer,
    metricCardTemplate
  },
  data () {
    return {
      // key应该Guid.create()
      metrics1: [{
        column: new Column({
          name: '用户数',
          key: '1',
          value: '448000000',
          formatValue: { value: 4.48, text: '亿' },
          contrast: { month: '6.47%', year: '6.47%' }
        })
      }, {
        column: new Column({
          name: '30天内商业支付天数',
          key: '2',
          value: '967000000',
          formatValue: { value: 9.67, text: '亿' },
          contrast: { month: '6.47%', year: '6.47%' }
        })
      }, {
        column: new Column({
          name: '测试超长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
          key: '3',
          value: '448000000000000000000000000000000000000000000000000000000000',
          formatValue: { value: 44800000000, text: '亿一一一一' },
          contrast: { month: '6.7%', year: '4.7%' }
        })
      }],
      metrics2: [{
        height: 200,
        width: 400,
        column: new Column({
          name: '利润',
          key: '4',
          value: '5568',
          formatValue: { value: 5.568, text: '千' },
          contrast: { month: '20%' }
        })
      }, {
        height: 120,
        width: 300,
        column: new Column({
          name: '销售额', 
          key: '5',
          value: '190000'
        })
      }]
    };
  }
};
</script>

<style scoped>
  .metric-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .metric-card-image {
    flex: 1 1 auto;
    max-height: 25vh;
    max-width: 60vw;
  }

  .metric-card-answer {
    flex: 3 3 auto;
  }

  .metric-inline {
    display: inline-block;
    margin: 8px;
  }

  .metric-block {
    margin: 8px;
  }

  .runtime {
    align-self: flex-start;
  }
</style>