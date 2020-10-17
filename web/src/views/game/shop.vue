<template>
  <div class="page">
    <div class="box-wrap">
      <div class="box-wrap_hd">一级宝箱</div>
      <div class="box-wrap_bd">
        <div class="box" v-for="(box, index) in boxList" :key="index" @click="openBox(box)">
          <div class="box_tt">头部</div>
          <div class="box_bd"></div>
          <div class="box_ft">800</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import messageBox from '@/util/popup/messageBox'

import openBoxDialog from '@/views/game/components/openBoxDialog'

import { openEquipBox } from '@/api/game'

export default {
  name: 'shop',
  setup () {
    const boxList = ref([1, 2, 3])
    const openBox = (box) => {
      openEquipBox(box).then(equip => {
        messageBox.show({
          content: (h) => {
            // todo 确认一下createElement这里的改动
            return h(openBoxDialog, {
              equip
            })
          }
        })
      })
    }
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
.box-wrap {
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
