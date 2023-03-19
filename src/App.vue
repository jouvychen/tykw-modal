<script setup lang="ts">
// 国际化
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useLocale } from "@/locales/useLocale";
dayjs.locale("zh-cn");
// support Multi-language
const { getAntdLocale } = useLocale();

import { useStoreApp } from "@/store";
const storeApp = useStoreApp();
const loading = computed(() => storeApp.loading);
</script>

<template>
  <a-config-provider :locale="getAntdLocale">
    <template #renderEmpty>
      <div style="text-align: center">
        <a-empty />
      </div>
    </template>
    <a-spin
      :spinning="loading"
      :delay="500"
      wrapper-class-name="spin-continer"
      size="large"
      tip="Loading..."
    >
      <router-view></router-view>
    </a-spin>
  </a-config-provider>
</template>

<style lang="less">
@import "assets/style/init.less";
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
