<template>
  <div class="equip" :class="['equip-type-'+equip?.type]" @click="clickCell">
    <template v-if="equip">
      <div class="equip_ct">{{ equip.typeName }} <br> {{equip.partName}}</div>
      <div class="equip_lv">
        lv.{{ equip.lv }}
      </div>
    </template>
  </div>
</template>

<script>
import { showEquipDialog } from '@/views/game/util'

export default {
  name: 'equip-cell',
  props: {
    equip: {
      type: Object,
      default: null
    },
    click: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const clickCell = () => {
      if (props.click) {
        emit('click')
      } else if (props.equip) {
        showEquipDialog(props.equip)
      }
    }
    return {
      clickCell
    }
  }
}
</script>

<style scoped lang="scss">

.equip {
  display: inline-block;
  $s: rem(100);
  width: $s;
  height: $s;
  border: 1px solid #000;
  position: relative;
  font-size: rem(20);

  &_ct {
    text-align: center;
  }

  &_lv {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  $type-color: #ccc #496c2a #4b659e #69378c #87381a;
  @each $color in $type-color {
    $idx: index($type-color, $color);
    &-type-#{$idx} {
      border-color: $color;
      background-color: $color;
      color: #fff;
    }
  }

}
</style>
