/**
 * 从 itemElement 中抽离出所有的 imgElements
 */
export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 生成所有的图片链接数组
 */
export const getAllImg = (imgElements) => {
  return imgElements.map((imgElement) => {
    return imgElement.src
  })
}

/**
 * 监听图片数组加载完成（通过 promise 完成）
 */
export const onComplateImgs = (imgs) => {
  // promise 集合
  const promiseAll = []
  // 循环构建 promiseAll
  for (let index = 0; index < imgs.length; index++) {
    const img = imgs[index]
    promiseAll[index] = new Promise((resolve, reject) => {
      const imageObj = new Image()
      imageObj.src = img
      // 图片加载完成事件
      imageObj.onload = () => {
        resolve({
          img,
          index
        })
      }
      // 在图片加载出现错误的时候
      imageObj.onerror = () => {
        reject({
          img,
          index
        })
      }
    })
  }

  return Promise.all(promiseAll)
}
