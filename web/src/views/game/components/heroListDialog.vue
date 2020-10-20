<template>
<div class="box">
  <div class="hero" v-for="(hero, index) in heroList" :key="index">
    <div class="hero_icon"></div>
    <div class="hero_mn">
      {{hero.name}}  lv.{{hero.lv}}<br>
      hp:{{hero.hp}} mp:{{hero.mp}} <br>
      exp:{{hero.exp}}

    </div>
    <div class="hero_action">
      <button @click="choose(hero)">选择</button>
    </div>

  </div>
</div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import Hero from '@/views/game/core/hero'
export default {
  name: 'heroListDialog',
  setup (context: any, { emit }: any) {
    const store = useStore()
    const heroList = computed(() => {
      return store.state.game.heroList
    })
    const choose = (hero: Hero) => {
      emit('choose', hero)
    }

    return {
      heroList,
      choose
    }
  }
}
</script>

<style scoped lang="scss">

.box {
  background-color: #fff;
  padding: rem(10);
  width: rem(600);
}
.hero {
  display: flex;
  font-size: rem(24);
  align-items: center;
  &_icon {
    $s: rem(100);
    width: $s;
    height: $s;
    background-color: #ccc;
    margin-right: rem(20);
  }
  &_mn{
    height: 100%;
    flex: 1;
  }
  &_action {

  }
}
</style>
