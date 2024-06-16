/* eslint-disable no-debugger */
export const useActionsHook = ({ params, fetWaterFallData, isShowMore }) => {
  // 滚动方法
  const scrollEvent = async (e) => {
    if (isShowMore.value) {
      return
    }
    const target = e.target

    // 滚动条到最上方的高度，即拉到当前页面时上面已经隐藏掉的高度
    const scrollTop = target.scrollTop
    //滚动条现在能看到的高度，当前页面区域高度
    const clientHeight = target.clientHeight
    //滚动条控制的总高度(到底的时候，上面隐藏的高度加上现在能看到的区域高度应该等于总高度)
    const scrollHeight = target.scrollHeight

    //触底判断
    if (scrollTop + clientHeight >= scrollHeight) {
      //触底时进行操作
      params.page += 1
      await fetWaterFallData(params)
    }
  }
  return {
    scrollEvent
  }
}
