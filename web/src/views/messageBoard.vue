<template>
  <div class="page">
    <div class="message">
      <textarea v-model="params.content" class="message_textarea"></textarea>
      <button class="message_btn" @click="add">提交留言</button>
    </div>
    <div class="message-list">
      <div class="record" v-for="(item, index) in messageList" :key="item.id">
        <div class="record_no">{{index + 1}}.</div>
        <div class="record_bd">
          <div class="record_ct">{{item.content}}</div>
          <div class="record_action">
            <button @click="remove(item)">删除</button>
            <button @click="reply(item)">回复</button>
          </div>
        </div>

        <div class="record_sub" v-if="item.replyList">
          <div class="record" v-for="subItem in item.replyList" :key="subItem.id">
            <div class="record_ct">{{subItem.content}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { fetchMessageList, submitMessage, removeMessage, replyMessage } from '@/api/message'

export default {
  name: 'messageBoard',
  setup () {
    const messageList = ref([])
    const params = reactive({
      content: ''
    })

    const getList = () => {
      fetchMessageList().then(res => {
        messageList.value = res
      })
    }
    const add = () => {
      submitMessage(params).then(() => {
        console.log('操作成功')
        messageList.value = ''
        getList()
      })
    }
    const remove = (item) => {
      const idx = messageList.value.indexOf(item)
      removeMessage(item.id).then(() => {
        console.log('删除成功')
        messageList.value.splice(idx, 1)
      })
    }

    const reply = (item) => {
      console.log(item)

      const ans = window.prompt('输入回复内容')
      if (!ans) return

      const params = {
        content: ans
      }

      replyMessage(item.id, params).then(() => {
        console.log('操作成功')
        getList()
      })
    }

    onMounted(() => {
      getList()
    })
    return {
      messageList,
      params,
      add,
      remove,
      reply
    }
  }
}
</script>

<style scoped lang="scss">

.record {
  max-width: 500px;
  border: 1px solid #000;
  margin: 20px;
  padding: 10px;
  position: relative;
  &_no {
    position: absolute;
    left: -20px;
    top: 10px;
  }
  &_bd {
    display: flex;
    align-items: center;
  }
  &_ct {
    flex: 1;
  }
  &_action {
    width: 100px;
  }
  .record {
    background-color: #ccc;
  }
}
</style>
