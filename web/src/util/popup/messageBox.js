/**
 * 通用内容弹窗组件，调用方式
 * // 引入弹窗组件
 * let messageBox = require('../../common/vue/popup/messageBox')
 * // 引入需要弹窗展示的组件
 * let xxxDialog = require('./xxx.vue')
 * // 展示弹窗
 * messageBox.show({
 *     content: this.$createElement(rule),
 *     type: 'md-effect-1'
 * })
 * // 父组件隐藏弹窗
 * messageBox.hide()
 * // 子组件隐藏弹窗
 * this.$parent.hide()
 */
import popupManager from './popupManager'
import MessageBox from './message-box'

MessageBox.newInstance = properties => {
  return popupManager.newInstance(MessageBox, properties).then(messageBox => {
    return {
      show (options) {
        messageBox.show(options)
      },
      hide () {
        messageBox.hide()
      }
    }
  })
}

// messageBox单例，延迟挂载到页面上
let messageInstance

function getMessageInstance (options) {
  if (messageInstance) {
    return Promise.resolve(messageInstance)
  } else {
    return MessageBox.newInstance(options).then((instance) => {
      messageInstance = instance
      return instance
    })
  }
}

getMessageInstance()
// 暴露接口
export default {
  // 展示弹窗
  show (options) {
    return getMessageInstance(options).then(instance => {
      instance.show(options)
    })
  },
  // 隐藏弹窗
  hide () {
    return getMessageInstance().then(instance => {
      instance.hide()
    })
  }
}
