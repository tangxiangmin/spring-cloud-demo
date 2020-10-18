<template>
  <div class="page">
    <div class="panel" v-if="currentHero">
      <div class="profile">
        <div class="profile_hd">
          <div class="profile_name">{{currentHero.name}}</div>
          <div class="profile_lv">{{currentHero.lv}}</div>
        </div>
        <div class="profile_bd">
          生命:{{currentHero.hp}} <br>
          法力:{{currentHero.mp}} <br>
          体力:{{currentHero.energy}} <br>
          经验:{{currentHero.exp}}
        </div>
      </div>
      <div class="person">
        <div class="person_head">
          <equipCell :equip="currentHero.hat"></equipCell>
        </div>
        <div class="person_row">
          <equipCell :equip="currentHero.necklace"></equipCell>
          <equipCell :equip="currentHero.ring"></equipCell>
        </div>
        <div class="person_row">
          <equipCell :equip="currentHero.glove"></equipCell>
          <equipCell :equip="currentHero.cloth"></equipCell>
        </div>
        <div class="person_row">
          <equipCell :equip="currentHero.mainHand"></equipCell>
          <equipCell :equip="currentHero.subHand"></equipCell>
        </div>
        <div class="person_foot">
          <equipCell :equip="currentHero.shoes"></equipCell>
        </div>
      </div>
    </div>
    <div class="hero-list">
      <div class="hero-icon" :class="{'hero-icon-on': hero === currentHero}" @click="chooseHero(index)" v-for="(hero,index) in heroList" :key="index">{{hero.name}}</div>
    </div>
    <div class="equip-list">
      <equipCell v-for="equip in equipList" :click="true" @click="compareEquip(equip)" class="equip" :key="equip" :equip="equip"></equipCell>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue'
import equipCell from './components/equipCell'
import { fetchEquipList, fetchHeroList } from '@/api/game'
import { showCompareEquipDialog, hideDialog } from '@/views/game/util'
import Hero from '@/views/game/core/hero'

export default {
  name: 'tavern',
  components: { equipCell },
  setup () {
    const currentHeroIndex = ref(0)

    const equipList = ref([])
    const heroList = ref([])

    const getEquipList = () => {
      fetchEquipList().then((data) => {
        equipList.value = data
      })
    }
    const getHeroList = () => {
      fetchHeroList().then(data => {
        heroList.value = data
      })
    }

    const currentHero = computed(() => {
      return heroList.value[currentHeroIndex.value]
    })

    const chooseHero = (index) => {
      currentHeroIndex.value = index
    }

    const compareEquip = (equip) => {
      // todo 找到当前英雄该部位已穿戴的装备
      const hero: Hero = currentHero.value as Hero
      const currentEquip = hero.findEquipByPart(equip.part)
      showCompareEquipDialog(currentEquip, equip, {
        wear () {
          hero.wearEquip(equip)
          hideDialog()
        }
      })
    }

    onMounted(() => {
      // webStorm暂时不支持vue3中vuex的store跳转
      // store.dispatch('game/fetchUserList')
      // store.dispatch('game/fetchEquipList')
      getEquipList()
      getHeroList()
    })

    return {
      heroList,
      equipList,
      currentHero,
      chooseHero,
      compareEquip
    }
  }
}
</script>

<style scoped lang="scss">
.panel {
  padding: rem(30);
  display: flex;
}
.profile {
  font-size: rem(22);
  flex: 1;
}
.person {
  font-size: 0;
  width: rem(400);
  &_head {
    text-align: center;
    margin-bottom: rem(-40);
  }
  &_row {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }
  &_foot {
    text-align: center;
    margin-top: rem(-40);
  }
  ::v-deep {
    .equip {
      margin-bottom: rem(20);
    }
  }
}
.hero-list {
  padding: rem(10);
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  font-size: 0;
  overflow-x: auto;
}

.hero-icon {
  display: inline-block;
  margin-left: rem(20);
  $s: rem(100);
  width: $s;
  height: $s;
  border: 1px solid #000;
  font-size: rem(24);
  text-align: center;
  line-height: $s;
  &-on {
    border-color: red;
  }
}

.equip-list {
  padding: rem(10);
  font-size: 0;
  .equip {
    margin-left: rem(20);
    margin-bottom: rem(20);
  }
}

</style>
