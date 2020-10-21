<template>

  <div class="page">
    <div class="header">
      <span class="mr-base">金币💰：{{accountInfo.gold}}</span>
      <span>钻石💎：{{accountInfo.jewel}}</span>

    </div>
    <router-view/>
    <div class="footer">
      <router-link class="nav-item" v-for="nav in navList" :key="nav.path" :to="nav.path">{{nav.name}}</router-link>
    </div>
  </div>

</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'index',
  setup () {
    const store = useStore()
    const navList = ref([
      { name: '酒馆', path: '/game/tavern' },
      { name: '冒险', path: '/game/adventure' },
      { name: '商店', path: '/game/shop' }
    ])

    // webStorm暂时不支持vue3中vuex的store跳转
    store.dispatch('game/initGame')

    const accountInfo = computed(() => {
      return store.state.game.accountInfo
    })

    return {
      navList,
      accountInfo
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  //min-height: 100vh;
}
.header {
  padding: rem(30);
  font-size: rem(24);
  border-bottom: 1px solid #000;
}
.footer {
  border-top: 1px solid #000;
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

}
.nav-item {
  flex: 1;
  line-height: rem(100);
  text-align: center;
  font-size: rem(30);
  &:not(:last-child){
    border-right: 1px solid #000;
  }
  text-decoration: none;
}

.mr-base {
  margin-right: rem(50);
}
</style>
