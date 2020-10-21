<template>
  <div class="page">
    <div class="box-wrap">
      <div class="box-wrap_hd">一级宝箱</div>
      <div class="box-wrap_bd">
        <div class="box" v-for="(box, index) in boxList" :key="index" @click="openBox(box)">
          <div class="box_tt">lv.{{box.lv}} {{box.partName}}</div>
          <div class="box_bd">{{box.typeName}}</div>
          <div class="box_ft">{{box.cost}}</div>
        </div>
      </div>
    </div>
    <div class="box-wrap">
      <div class="box-wrap_hd">钻石宝箱</div>
      <div class="text-center">
        暂未开启
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import messageBox from '@/util/popup/messageBox'

import openBoxDialog from '@/views/game/components/openBoxDialog'

export default {
  name: 'shop',
  setup () {
    const store = useStore()
    const boxList = computed(() => {
      return store.state.game.equipBoxList
    })

    const refreshBoxList = () => {
      store.dispatch('game/fetchBoxList')
    }
    const openBox = (box) => {
      store.dispatch('game/openEquipBox', box).then((equip) => {
        refreshBoxList()
        messageBox.show({
          content: (h) => {
            return h(openBoxDialog, {
              equip
            })
          }
        })
      })
    }

    onMounted(() => {
      refreshBoxList()
    })

    return {
      boxList,
      openBox
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  padding: rem(30);
}
.text-center {
  text-align: center;
}
.box-wrap {
  font-size: rem(24);
  &:not(:last-child){
    margin-bottom: rem(50);
  }
  &_hd {
    padding: rem(20) 0;
    font-size: rem(30);
    text-align: center;

  }
  &_bd {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.box {
  $s: rem(200);
  width: $s;
  height: $s;
  border: 1px solid #000;
  font-size: rem(24);
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  &_tt{
  }
  &_bd {
    flex: 1;

  }
  &_ft {

  }

}

</style>
