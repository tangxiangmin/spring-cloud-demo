<template>
  <div class="page">
    <div class="panel" v-if="currentHero">
      <div class="profile">
        <div class="profile_hd">
          <div class="profile_name">{{currentHero.name}} lv.{{currentHero.lv}}</div>
        </div>
        <div class="profile_bd">
          生命:{{currentHero.hp}} <br>
          法力:{{currentHero.mp}} <br>
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
      <equipCell :showMask="isChoosing" v-for="(item,index) in equipList" :click="true" @click="clickEquip(item.equip, index)" class="equip" :key="item.equip.id" :equip="item.equip">
        <template v-slot:mask>
          <input type="checkbox" v-model="item.checked">
        </template>
      </equipCell>
    </div>
    <div class="action">
      <div class="action_l">
        <template v-if="isChoosing"><input v-model="isChooseAll" type="checkbox">全选</template>
      </div>
      <div class="action_r">
        <button @click="chooseEquip" v-if="!isChoosing">分解</button>
        <button @click="confirmDecompose" v-else>分解</button>
        <button>整理</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

import { showCompareEquipDialog, hideDialog } from '@/views/game/util'
import Hero from '@/views/game/core/hero'
import Equip from '@/views/game/core/equip'
import equipCell from './components/equipCell.vue'

type CheckedEquip = {equip: Equip; checked: boolean}
export default {
  name: 'tavern',
  components: { equipCell },
  setup () {
    const store = useStore()
    const currentHeroIndex = ref(0)
    const isChoosing = ref(false)
    const isChooseAll = ref(false)

    const heroList = computed(() => {
      return store.state.game.heroList
    })

    const equipList = computed(() => {
      return store.state.game.equipList.map((equip: Equip) => {
        return {
          equip,
          checked: false
        }
      })
    })

    const currentHero = computed(() => {
      return heroList.value[currentHeroIndex.value]
    })

    const chooseHero = (index: number) => {
      currentHeroIndex.value = index
    }

    const compareEquip = (equip: Equip) => {
      const hero: Hero = currentHero.value as Hero
      const currentEquip = hero.findEquipByPart(equip.part) || null
      showCompareEquipDialog(currentEquip, equip, {
        wear () {
          if (currentEquip) {
            store.dispatch('game/getOffEquip', { hero, equip: currentEquip })
          }
          store.dispatch('game/wearEquip', { hero, equip })

          hideDialog()
        }
      })
    }

    // 分解装备
    const clickEquip = (equip: Equip, index: number) => {
      if (isChoosing.value) {
        const cell = equipList.value[index]
        cell.checked = !cell.checked
      } else {
        compareEquip(equip)
      }
    }

    const chooseEquip = () => {
      isChoosing.value = true
    }
    watch(isChooseAll, (newVal) => {
      equipList.value.forEach((item: CheckedEquip) => {
        item.checked = newVal
      })
    })
    const confirmDecompose = () => {
      const list = equipList.value.filter((item: CheckedEquip) => {
        return item.checked
      })
      console.log(list)
      // todo 分解选中装备，获取钻石
    }

    onMounted(() => {
      // 统一放在进入页面时处理
      // store.dispatch('game/fetchHeroList')
      // store.dispatch('game/fetchEquipList')
    })

    return {
      heroList,
      equipList,
      currentHero,
      isChoosing,
      isChooseAll,

      // methods
      chooseHero,
      compareEquip,
      chooseEquip,
      clickEquip,
      confirmDecompose
    }
  }
}
</script>

<style scoped lang="scss">
.panel {
  padding: rem(20) rem(30);
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

.action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: rem(20);
  padding: 0 rem(30);
  &_l {
    display: flex;
    align-items: center;
  }
  &_r {
    button {
      margin-left: rem(10);
    }
  }
}

</style>
