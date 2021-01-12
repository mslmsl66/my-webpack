<template>
  <div
    class="answer"
  >
    <!-- 代码详情 -->
    <slot
      class="code"
      name="code"
    >
    </slot>
    <!-- 执行查看结果 -->
    <slot
      class="runtime"
      name="runtime"
    >
    </slot>
  </div>
</template>

<script>
export default {
};
</script>

<style>
  .answer {
    display: flex;
    background: skyblue;
    width: 90vw;
    align-items: center;
    justify-content: center;
  }

  .code {
    flex: 1;
  }

  .runtime {
    flex: 1;
  }
</style>