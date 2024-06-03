// 引入防抖函数
import _debounce from 'lodash/debounce'
/**
 * @description: 监听元素尺寸变化
 * @param {*} el
 * @param {*} cb
 * @param {*} wait
 * @return {*}
 */
export default (el, cb, wait = 200) => {
  const resize = new ResizeObserver(_debounce(cb, wait))
  resize.observe(el)
  const destroy = () => {
    resize.disconnect(el)
  }
  return { destroy, resize }
}
