<template>
  <div class="dialog">
    <div class="dialog_hd">恭喜你获得</div>
    <equipCell :equip="equip" v-if="equip"></equipCell>
    <div class="dialog_bd">
      <div class="equip_name">{{equip.name}}</div>
      <div class="equip_type">{{equip.typeName}}</div>
      <div class="equip_lv">lv.{{equip.lv}}</div>
    </div>
  </div>
</template>

<script>
import equipCell from '@/views/game/components/equipCell'
export default {
  name: 'openBoxDialog',
  components: {
    equipCell
  },
  props: {
    equip: {
      type: Object,
      default: null
    }
  },
  setup (props) {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.dialog {
  background-color: #fff;
  width: rem(300);
  border-radius: rem(10);
  padding: rem(15);
  font-size: rem(20);
  text-align: center;
  &_hd {
    margin-bottom: rem(10);

  }
  &_bd {
    margin-top: rem(10);

  }
}

</style>
