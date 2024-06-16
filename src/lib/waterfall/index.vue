/** * 瀑布流组件 */
<template>
  <div class="w-full h-full overflow-y-auto" ref="containerTarget">
    <template v-if="props.data?.length">
      <div
        class="m-waterfall-item absolute duration-200"
        v-for="(item, index) in props.data"
        :key="props.domKey ? item[domKey] : index"
        :style="{
          top: item._top + 'px',
          left: item._left + 'px',
          width: item._width + 'px'
        }"
      >
        <slot :itemData="item"></slot>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  domKey: {
    type: [String, Number],
    default: 'index'
  },
  // 列数
  column: {
    default: 2,
    type: Number
  },
  // 列间距
  columnSpacing: {
    default: 20,
    type: Number
  },
  // 行间距
  rowSpacing: {
    default: 20,
    type: Number
  }
})

// 外部容器高度
</script>

<style lang="scss" scoped></style>
