import { ref, onMounted } from 'vue'
import { getPexelsList } from '@/api/index'

export const useModelHook = () => {
  const isShowMore = ref(false)

  const params = {
    page: 1,
    size: 20
  }

  const totalNum = ref(0)
  const pexelsList = ref([])

  // 请求瀑布流数据
  const fetWaterFallData = async () => {
    if (params.page === 1) {
      pexelsList.value = []
      isShowMore.value = false
    }
    try {
      const { total, list } = await getPexelsList(params)
      totalNum.value = Number(total)
      if (pexelsList.value.length >= totalNum.value) {
        isShowMore.value = true
        return
      }
      pexelsList.value = [...pexelsList.value, ...list]
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(() => {
    fetWaterFallData()
  })

  return {
    isShowMore,
    params,
    pexelsList,
    fetWaterFallData
  }
}
