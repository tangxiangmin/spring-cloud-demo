<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { fetchUserList } from '@/api/user'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup () {
    const userList = ref([])
    onMounted(() => {
      fetchUserList().then((res: any) => {
        console.log(res)
        userList.value = res
      })
    })
    return {
      userList
    }
  }
})
</script>
