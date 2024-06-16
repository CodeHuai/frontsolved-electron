<template>
  <div
    class="h-[calc(100%_-_50px)] px-[20px] py-0 overflow-hidden overflow-y-auto"
    v-infinite-scroll="handleScroller"
    :infinite-scroll-immediate-check="true"
    :infinite-scroll-disabled="isShowMore"
    infinite-scroll-watch-disabled="isShowMore"
    :infinite-scroll-distance="200"
    :infinite-scroll-throttle-delay="500"
  >
    <infine v-model="isShowMore">
      <waterfall :column="5" domKey="id" :data="pexelsList">
        <template v-slot="{ itemData, width }">
          <waterfallItem
            :authorName="itemData.author"
            :imgUrl="itemData.photo"
            :imgWidth="width"
          ></waterfallItem>
        </template>
      </waterfall>
    </infine>
  </div>
</template>

<script setup>
import { useActionsHook } from './hook/use-actions-hook'
import { useModelHook } from './hook/use-model-hook'
import waterfallItem from '@/components/waterfall-item/index.vue'

const { isShowMore, pexelsList, params, fetWaterFallData } = useModelHook()
const { handleScroller } = useActionsHook({
  params,
  pexelsList,
  fetWaterFallData
})
</script>

<style lang="scss" scoped></style>
