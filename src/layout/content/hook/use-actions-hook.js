export const useActionsHook = ({ params, fetWaterFallData }) => {
  // 滚动方法
  const handleScroller = async () => {
    params.page++
    await fetWaterFallData(params)
  }
  return {
    handleScroller
  }
}
