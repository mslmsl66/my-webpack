<template>
  <div
    class="metric-card-template"
    :style="metricStyle"
  >
    <!-- 指标名 -->
    <div
      class="metric-name"
    >
      {{ column.name }}
    </div>
    <!-- 指标格式化值 -->
    <div
      class="metric-format"
    >
      <span
        class="metric-format-value"
      >
        {{ column.formatValue.value || column.value }}
      </span>
      <span
        class="metric-format-text"
      >
        {{ column.formatValue.text }}
      </span>
    </div>
    <!-- 年月同比 -->
    <div
      v-if="column.contrast.month || column.contrast.year"
      class="metric-contrast"
    >
      <div
        v-if="column.contrast.month"
        class="metric-contrast-month"
      >
        <span
          class="metric-contrast-text"
        >
          月同比
        </span>
        <span
          class="metric-contrast-month-value"
        >
          {{ column.contrast.month }}
        </span>
      </div>
      <div
        v-if="column.contrast.year"
        class="metric-contrast-year"
      >
        <span
          class="metric-contrast-text"
        >
          年同比
        </span>
        <span
          class="metric-contrast-year-value"
        >
          {{ column.contrast.year }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 指标卡高度
    height: {
      type: Number,
      default: 80
    },
    // 指标卡宽度
    width: {
      type: Number,
      default: 200
    },
    // 指标字段信息，包含原始值,格式化等
    column: {
      type: Object,
      required: true
    }
  },
  computed: {
    metricStyle () {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`
      };
    }
  }
};
</script>

<style scoped>
  .metric-card-template {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #fff;
    border-left: 3px solid grey;
    padding-left: 10px;
  }

  .metric-name {
    color: #ccc;
    font-size: 12px;
    width: calc(100% - 15px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
  }

  .metric-name::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }

  .metric-format {
    width: calc(100% - 15px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 2;
  }

  .metric-format::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }

  .metric-format-value {
    font-weight: 700;
    font-size: 24px;
  }

  .metric-format-text {
    font-weight: 500;
    font-size: 14px;
  }

  .metric-contrast {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex: 1;
    font-size: 12px;
    width: calc(100% - 23px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .metric-contrast-month {
    flex: 1;
    padding-right: 4px;
    max-width: calc(50% - 11px);
  }

  .metric-contrast-year {
    flex: 1;
    max-width: calc(50% - 11px);
  }

  .metric-contrast-text {
    color: #ccc;
  }

  .metric-contrast-month-value {
    color: red;
    font-weight: 500;
    padding-right: 4px;
  }

  .metric-contrast-year-value {
    font-weight: 500;
    color: green;
  }
</style>