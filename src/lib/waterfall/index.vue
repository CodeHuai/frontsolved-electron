/** * 瀑布流组件 */
<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{
      height: outContainerHeight + 'px'
    }"
  >
    <template
      v-for="(item, index) in pageData"
      :key="props.domKey ? item[domKey] : index"
    >
      <div
        class="m-waterfall-item absolute duration-200"
        :style="{
          top: item?._style?._top + 'px',
          left: item?._style?._left + 'px',
          width: columnWidth + 'px',
          height: itemHeightList[index] + 'px'
        }"
      >
        <slot :itemData="item" :width="columnWidth"></slot>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, defineProps, nextTick, onMounted, ref, watch } from 'vue'
import { getImgElements, getAllImg, onComplateImgs } from '@/utils/index'

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

const pageData = computed(() => props.data)

// 外部容器高度，始终等于最长一列的高度
const outContainerHeight = ref(0)
// 外部容器ref
const containerTarget = ref(null)
// 处理每一个图片的宽度
const columnWidth = ref(0)
// 存储每一列的高度值
const itemColumnHeightList = ref({})
// 收集item的高度,便于从中找到最大和最小
const itemHeightList = ref([])

/**
 * 返回列高对象中的最小的高度
 */
const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}

// 始终获取高度最短的一列索引
const getMinHeightColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)

  // 根据最短的高度，找到对应的索引值（key）
  for (const [key, value] of Object.entries(columnHeightObj)) {
    if (Number(value) === Number(minHeight)) {
      return key
    }
  }
}

// 处理每一个图片的宽度
const handleOutContainerWidth = () => {
  const { width } = containerTarget.value.getBoundingClientRect()
  columnWidth.value = Math.floor(
    (width - (props.column - 1) * props.columnSpacing) / props.column
  )
}

// 赋值每一列的高度, 默认为0
const useColumnHeight = () => {
  itemColumnHeightList.value = {}
  for (let index = 0; index < props.column; index++) {
    itemColumnHeightList.value[index] = 0
  }
}

// 设置当前图片的左边距 left
const setElLeft = () => {
  const minIndex = getMinHeightColumn(itemColumnHeightList.value)
  return minIndex * (columnWidth.value + props.columnSpacing)
}

// 设置当前图片的顶部编剧 top
const setElTop = () => {
  const minIndex = getMinHeightColumn(itemColumnHeightList.value)
  const minHeight = itemColumnHeightList.value[minIndex]
  return minHeight
}

/**
 * 指定列高度自增
 */
const increasingHeight = (index) => {
  // 最小高度所在的列
  const minHeightColumn = getMinHeightColumn(itemColumnHeightList.value)
  // 该列高度自增
  itemColumnHeightList.value[minHeightColumn] =
    itemColumnHeightList.value[minHeightColumn] +
    itemHeightList.value[index] +
    props.rowSpacing
}

// 渲染位置
const useItemLocation = () => {
  // 找到 没有 _style 属性的 第一个下标
  let findIndex = pageData.value.findIndex((el) => !Reflect.has(el, '_style'))
  let startIndex = findIndex <= 0 ? 0 : findIndex

  const arr = pageData.value.filter((el) => !Reflect.has(el, '_style'))

  for (let index = 0; index < arr.length; index++) {
    const el = arr[index]

    el._style = {}

    el._style._left = setElLeft()

    el._style._top = setElTop()

    // 更新 itemColumnHeightList 值
    increasingHeight(startIndex % props.column)

    startIndex++
  }

  // 更新指定容器高度
  outContainerHeight.value = getMaxHeight(itemColumnHeightList.value)
}

// 计算每一个图片的高度
const waitImgComplate = () => {
  // 置空
  itemHeightList.value = []
  let itemRefList = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取所有元素的 img 标签
  const imgElements = getImgElements(itemRefList)
  // 获取所有 img 标签的图片
  const allImgs = getAllImg(imgElements)
  // 等到图片完成后，再收集每一个 item 的高度
  onComplateImgs(allImgs)
    .then(() => {
      for (let index = 0; index < imgElements.length; index++) {
        const el = imgElements[index]
        itemHeightList.value.push(el.offsetHeight || 0) // 存入每一个 img 的高度值
      }

      // 渲染位置
      useItemLocation()
    })
    .catch((error) => {
      console.log(error, '加载错误')
    })
}

onMounted(() => {
  useColumnHeight()
  // 根据传入的参数计算每一个图片的宽度
  handleOutContainerWidth()
})

// 监听数据源
watch(
  pageData,
  () => {
    // const resetColumnHeight = newVal.every((item) => !item._style)
    // if (resetColumnHeight) {
    //   // 构建高度记录容器，并且初始化
    //   useColumnHeight()
    // }

    nextTick(() => {
      // dom更新完成后，计算每一个图片的高度
      waitImgComplate()
    })
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped></style>
