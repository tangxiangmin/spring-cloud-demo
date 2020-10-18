<template>
<div class="detail" v-if="equip">
  <div class="detail_tt">{{equip.name}}</div>
  <div class="detail_hd">
    <div class="detail_icon"></div>
    <div>
      <div class="detail_type">传说鞋子</div>
      <div class="detail_attr">
        <strong>755</strong> <br>
        生命值
      </div>
    </div>
  </div>
  <div class="detail_bd">
    <div class="attr-number">
      <div>物理攻击+17</div>
      <div>生命值+196</div>
    </div>
    <div class="attr-percent">
      <div>暴击+2%</div>
      <div>闪避+3%</div>
    </div>
    <div class="skill">
      攻击命中时，有20%的几率使目标受到100点伤害，持续3秒
    </div>
    <div class="score">装备强度： 500</div>
    <div>需要等级：40</div>
  </div>
  <div class="detail_ft">
    <slot name="foot"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'equipDetail',
  props: {
    equip: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
$base-border: 1px solid #ede0b6;
 .detail {
   width: rem(300);
   padding: rem(10);
   border-radius: rem(10);
   background-color: #fff;
   font-size: rem(24);
   font-weight: bold;
   &_tt {
     font-size: rem(30);
     font-weight: bold;
     text-align: center;
     margin-bottom: rem(10);
   }
   &_hd {
     padding: rem(10) 0;
     display: flex;
     align-items: center;
   }
   &_icon {
     $s: rem(100);
     width: $s;
     height: $s;
     background-color: #ccc;
     margin-right: rem(20);
   }

   &_ft {
     margin-top: rem(10);
   }

 }
 .attr-number {
   padding: rem(10) 0;

   border-top: $base-border;
   color: #766142;
 }
.attr-percent {
  padding: rem(10) 0;
  border-top: $base-border;
  color: #483e61;
}
.skill {
  padding: rem(10) 0;
  border-top: $base-border;
  color: #a1634a;
}
.score {
  padding: rem(10) 0;
  border-top: $base-border;
  color: #766142;
}

</style>
