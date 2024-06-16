<template>
  <div class="h-[calc(100%_-_50px)] overflow-hidden">
    <infine v-model="loadingFlag">
      <waterfall
        domKey="id"
        :data="pexelsList"
        :infinite-scroll-throttle-delay="200"
        :infinite-scroll-distance="100"
        v-infinite-scroll="handleScroller"
      >
        <template v-slot="{ itemData }">
          <waterfallItem
            :authorName="itemData.author"
            :imgUrl="itemData.photo"
            :imgWidth="itemData.photoWidth"
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

const { loadingFlag, params, pexelsList, fetWaterFallData } = useModelHook()
const { handleScroller } = useActionsHook({
  params,
  pexelsList,
  fetWaterFallData
})
</script>

<style lang="scss" scoped></style>
