<template>
  <div class="h-screen fixed top-0 left-0 w-screen">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
</style>
