<template>
  <div class="h-[calc(100%_-_50px)] overflow-hidden overflow-y-auto">
    <infine v-model="loadingFlag"></infine>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loadingFlag = ref(false)
</script>

<style lang="scss" scoped></style>
