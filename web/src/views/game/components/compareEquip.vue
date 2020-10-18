<template>
<div class="box">
  <equipDetail class="box_l" :equip="equip1"></equipDetail>
  <equipDetail class="box_r" :equip="equip2">
    <template v-slot:foot>
      <div class="action">
        <button @click="wear">穿戴</button>
      </div>
    </template>
  </equipDetail>
</div>
</template>

<script>
import equipDetail from '@/views/game/components/equipDetail'
const noop = () => {
  return undefined
}
export default {
  name: 'compareEquip',
  components: {
    equipDetail
  },
  props: {
    equip1: {
      type: Object,
      default: null
    },
    equip2: {
      type: Object,
      default: null
    },
    wear: {
      type: Function,
      default: noop
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: flex-start;
  &_l {
    margin-right: rem(20);
  }
}
.action {
  text-align: right;
}
</style>
