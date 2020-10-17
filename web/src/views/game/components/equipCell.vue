<template>
  <div class="equip" :class="['equip-type-'+equip.type]">
    <div class="equip_ct">{{ equip.typeName }} <br> {{equip.posName}}</div>
    <div class="equip_lv">
      lv.{{ equip.lv }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'equip-cell',
  props: {
    equip: {
      type: Object,
      default: null
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
