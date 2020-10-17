/**
 * 统一封装各种弹窗的实例化操作逻辑
 * todo 管理zIndex，初始动画等操作
 */

import { createApp, h } from 'vue'

const index = 0
const popupManager = {
  newInstance: (component, properties) => {
    const props = properties || {}
    let node
    return new Promise(resolve => {
      const instance = createApp({
        data () {
          return props
        },
        render () {
          return h(component, {
            props,
            ref: 'node'
          })
        },
        mounted () {
          node = this.$refs.node
          resolve(node)
        }
      })
      const el = document.createElement('div')
      el.id = 'popop-' + index
      document.body.appendChild(el)
      // 弹窗手动挂载到根节点，而非#app节点
      instance.mount(el)
      // const instance = instance.$children[0]
      // 在回调中封装返回方法
    })
  }
}

export default popupManager
