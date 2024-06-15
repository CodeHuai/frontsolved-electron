<template>
  <div class="w-full h-full bg-[＃FFFFF0]">
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout'
}
</script>

<script setup>
import Header from '@/components/header/index.vue'
import Content from '@/components/content/index.vue'
</script>

<style lang="scss" scoped></style>
