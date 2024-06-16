import { network } from '@/utils/index'

/**
 * 获取图片数据列表
 */
export const getPexelsList = (data) => {
  return network({
    url: '/pexels/list',
    params: data
  })
}
