/* eslint-disable no-debugger */
export const useActionsHook = ({ params, fetWaterFallData }) => {
  // 滚动方法
  const handleScroller = async () => {
    params.page += 1
    await fetWaterFallData(params)
  }
  return {
    handleScroller
  }
}
