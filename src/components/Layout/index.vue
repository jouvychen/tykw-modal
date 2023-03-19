<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade">
      <div>
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </div>
    </Transition>
  </router-view>
</template>

<script name="Layout" setup>
</script>

<style scoped lang="less"></style>
