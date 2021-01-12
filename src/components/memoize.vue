<template>
  <div
    class="memoize"
  >
    <img
      src="../asset/memoize.jpg"
      class="memoize-image"
    />
    <answer
      class="memoize-answer"
    >
      <template
        v-slot:code
      >
        <img src="../asset/memoize-answer.jpg"/>
      </template>
      <template
        v-slot:runtime
      >
        <div
          class="runtime"
        >
          <el-form
            ref="form"
            :model="formData"
            :rules="rules"
          >
            <el-form-item
              prop="inputNum"
            >
              <el-input
                placeholder="请输入数字"
                v-model="formData.inputNum"
                clearable
              />
            </el-form-item>
          </el-form>
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
import { memoize, sqrt } from '../answers/util';
import answer from './answer.vue';
export default {
  components: {
    answer
  },
  data() {
    return {
      // 表单model
      formData: {
        inputNum: null
      },
      // 表单验证规则
      rules: {
        inputNum: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }, {
          max: 31,
          message: '不能超过31个字符',
          trigger: 'change'
        }, {
          validator: this.checkInputRule,
          message: '必须是数字',
          trigger: 'change'
        }]
      },
      // 缓存函数
      cacheSqrt: null
    };
  },
  methods: {
    // 验证表单是否是数字
    checkInputRule(rule, value, callback) {
      if (!isNaN(value)) {
        callback();
      } else {
        callback(new Error('必须是数字'));
      }
    },
    // 响应按钮提交
    handleConfirm () {
      this.$refs.form.validate(val => {
        if (!val) {
          return;
        }
        // 验证通过
        this.cacheSqrt = this.cacheSqrt || memoize(sqrt);
        this.cacheSqrt(this.formData.inputNum);
      });
    }
  }
};
</script>

<style scoped>
  .memoize {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .memoize-image {
    flex: 1 1 auto;
    max-height: 25vh;
    max-width: 60vw;
  }

  .memoize-answer {
    flex: 3 3 auto;
  }
</style>