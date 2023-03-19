<template>
  <div class="w-1200 bg-fff rounded-3 mt-24 h-100 mb-24 m-0-auto flex-center">
    <div class="d-flex">
      <img style="width: 520px; height: 280px" src="~@/assets/exception/icon_404.png" alt="" />
      <div class="ml-70 msg-box">
        <div class="font-58">{{ type }}</div>
        <div class="font-16 text-045">{{ describe }}</div>
        <!-- <a-button class="mt-24" type="primary" @click="$router.push('/')">返回工作台</a-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Exception',
  props: {
    type: {
      type: String,
      default: '403',
    },
    describe: {
      type: String,
      default: '抱歉，你无权访问该页面',
    },
  },
});
</script>

<style scoped>
.msg-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>
