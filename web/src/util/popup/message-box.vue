<script>
import { h } from 'vue'
export default {
  name: 'message-box',
  data () {
    return {
      isShow: false,
      content: null,
      type: 'md-effect-1',
      closeOnClickModal: true
    }
  },
  render () {
    const { type } = this

    const wrapClass = { 'md-modal': true, 'md-show': this.isShow }
    wrapClass[type] = true // 此处如果使用{ [this.type]:true }形式在cli3报错

    return h('div', {}, [
      h(
        'div',
        {
          class: wrapClass
        },
        [
          h(
            'div',
            {
              class: 'md-content'
            },
            [this.content]
          )
        ]
      ),
      h('div', {
        class: {
          'md-overlay': true
        },
        onTouchmove (e) {
          // 禁止滑动背景滚动
          e.preventDefault()
          e.stopPropagation()
        },
        onClick: () => {
          if (this.closeOnClickModal) {
            this.hide()
          }
        }
      })
    ])
  },
  methods: {
    show ({ content, type, closeOnClickModal = true, onClose = null, autoClose = -1 }) {
      const show = () => {
        if (typeof content === 'function') {
          content = content(h)
        }
        this.content = content
        this.isShow = true
      }
      this.closeOnClickModal = closeOnClickModal
      this.onClose = onClose

      if (type) {
        this.type = type
        // fix:第一次挂载到页面时动画无法生效
        setTimeout(() => {
          this.$nextTick(show)
        })
      } else {
        show()
      }

      // 自动关闭
      if (autoClose > -1) {
        setTimeout(() => {
          this.hide()
        }, autoClose)
      }
    },
    hide () {
      this.isShow = false
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
    }
  }
}
</script>

<style lang="scss">
.md-modal {
  position: fixed;
  top: 50%;
  left: 50%;

  z-index: 1499;
  visibility: hidden;
  backface-visibility: hidden;
  transform: translateX(-50%) translateY(-50%);
}

.md-show {
  visibility: visible;
}

.md-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  visibility: hidden;
  top: 0;
  left: 0;
  z-index: 1002;
  opacity: 0;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.3s;
}

.md-show ~ .md-overlay {
  opacity: 1;
  visibility: visible;
}

.md-content {
  position: relative;
}

/* .md-effect-1  */
.md-effect-1 {
  .md-content {
    transform: scale(0.7);
    opacity: 0;

    transition: all 0.3s;
  }

  &.md-show {
    .md-content {
      transform: scale(1);
      opacity: 1;
    }
  }
}

/* .md-effect-3  */
.md-effect-2 {
  .md-content {
    transform: translateX(20%);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  }

  &.md-show .md-content {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 如果需要增加其他动画，在这里添加对应的类名即可 */
</style>
