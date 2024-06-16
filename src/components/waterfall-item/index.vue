<template>
  <div
    class="absolute rounded-md overflow-hidden"
    :style="{
      width: props.imgWidth + 'px'
    }"
  >
    <img class="w-full h-full" :src="props.imgUrl" />
    <!-- 作者名称 -->
    <span class="absolute right-3 bottom-4 text-[#fff] text-base">{{
      props.authorName
    }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  authorName: {
    type: String,
    default: '-'
  },
  imgUrl: {
    type: String
  },
  imgWidth: {
    type: Number
  },
  imgHeight: {
    type: Number
  }
})
</script>

<style lang="scss" scoped></style>
