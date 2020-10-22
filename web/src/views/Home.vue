<template>
  <div class="home">
    Home
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, h } from 'vue'
import { fetchUserList } from '@/api/user'

export default defineComponent({
  name: 'Home',
  setup () {
    const userList = ref([])
    onMounted(() => {
      fetchUserList().then((res: any) => {
        console.log(res)
        userList.value = res
      })
    })
    return () => {
      return h('div', {
        title: 'this is title',
        attrs: {}
      }, 'Hello')
    }
  }
})
</script>
