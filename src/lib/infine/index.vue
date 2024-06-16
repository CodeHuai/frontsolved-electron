/** * 列表懒加载容器 */
<template>
  <div class="w-full">
    <slot></slot>
    <div v-if="isShowMore" class="text-center text-base text-zinc-400">
      已经没有更多数据了！
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const isShowMore = computed(() => props.modelValue)
</script>

<style lang="scss" scoped></style>
