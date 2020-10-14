<template>
  <div class="page">
    <div class="message">
      <textarea v-model="params.content" class="message_textarea"></textarea>
      <button class="message_btn" @click="add">提交留言</button>
    </div>
    <div class="message-list">
      <ul>
        <li v-for="item in messageList" :key="item.id">
          {{item.content}}
          <button @click="remove(item)">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { fetchMessageList, submitMessage, removeMessage } from '@/api/message'

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

    onMounted(() => {
      getList()
    })
    return {
      messageList,
      params,
      add,
      remove
    }
  }
}
</script>

<style scoped>

</style>
