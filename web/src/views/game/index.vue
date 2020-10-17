<template>

  <div class="page">
    <router-view/>
    <div class="footer">
      <router-link class="nav-item" v-for="nav in navList" :key="nav.path" :to="nav.path">{{nav.name}}</router-link>
    </div>
  </div>

</template>

<script>
import { ref } from 'vue'
export default {
  name: 'index',
  setup () {
    const navList = ref([
      { name: '酒馆', path: '/game/tavern' },
      { name: '冒险', path: '/game/adventure' },
      { name: '商店', path: '/game/shop' }
    ])
    return {
      navList
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
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

</style>
