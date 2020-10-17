<template>
  <div class="page">
    <div class="panel">
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
          <equipCell :equip="equipList[0]"></equipCell>
        </div>
        <div class="person_row">
          <equipCell :equip="equipList[0]"></equipCell>
          <equipCell :equip="equipList[0]"></equipCell>
        </div>
        <div class="person_row">
          <equipCell :equip="equipList[0]"></equipCell>
          <equipCell :equip="equipList[0]"></equipCell>
        </div>
        <div class="person_row">
          <equipCell :equip="equipList[0]"></equipCell>
          <equipCell :equip="equipList[0]"></equipCell>
        </div>
        <div class="person_foot">
          <equipCell :equip="equipList[0]"></equipCell>
        </div>
      </div>
    </div>
    <div class="hero-list">
      <div class="hero-icon" :class="{'hero-icon-on': hero === currentHero}" @click="chooseHero(index)" v-for="(hero,index) in heroList" :key="index">{{hero.name}}</div>
    </div>
    <div class="equip-list">
      <equipCell v-for="equip in equipList" class="equip" :key="equip" :equip="equip"></equipCell>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import equipCell from './components/equipCell'

const equipPos = {
  1: '头部',
  2: '项链',
  3: '戒指',
  4: '手套',
  5: '衣服',
  6: '主手',
  7: '副手',
  8: '脚部'
}
const equipType = {
  1: '普通',
  2: '优秀',
  3: '卓越',
  4: '史诗',
  5: '传奇'
}

const random = (start, end) => {
  return Math.floor(Math.random() * end + start)
}
export default {
  name: 'tavern',
  components: { equipCell },
  setup () {
    const currentHeroIndex = ref(0)
    const heroList = ref([
      { id: 1, name: '小强', hp: 5730, mp: 2131, energy: 132, exp: '1900 / 4200' },
      { id: 2, name: '小红' },
      { id: 3, name: '小明' }
    ])

    const equipList = ref([])

    for (let i = 0; i < 18; ++i) {
      const pos = random(1, 8)
      const type = random(1, 5)

      equipList.value.push({
        lv: 30,
        pos,
        type,
        posName: equipPos[pos],
        typeName: equipType[type]
        // id: i
      })
    }
    const currentHero = computed(() => {
      return heroList.value[currentHeroIndex.value]
    })

    const chooseHero = (index) => {
      currentHeroIndex.value = index
    }

    return {
      heroList,
      equipList,
      currentHero,
      chooseHero
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
