<template>
  <div class="page">
    <div class="scene" v-for="(scene, index) in sceneList" :key="index">
      <div class="scene_hd">场景:{{scene.index}} {{scene.name}} ({{scene.lvDesc}}) 探索度{{scene.currentStep}}/{{scene.totalStep}}</div>
      <div class="scene_bd" >
        <template v-if="scene.isRunning">
          <div class="scene_hero">
            {{scene.hero.name}} {{scene.hero.hp}}
          </div>
          <div class="scene_monster">
            {{scene.monster.name}} {{scene.monster.hp}}
          </div>
        </template>
        <span v-else>未开始战斗</span>

      </div>
      <div class="scene_ft">
        <button class="scene_hero" @click="chooseSceneHero(scene)">{{scene.hero ? scene.hero.name : '选择英雄'}}</button>
        <button @click="startScene(scene)">战斗</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

import Scene from '@/views/game/core/scene'
import Hero from '@/views/game/core/hero'
import Attack from '@/views/game/core/attack'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import messageBox from '@/util/popup/messageBox'
import heroListDialog from '@/views/game/components/heroListDialog.vue'

export default {
  name: 'adventure',
  setup () {
    const store = useStore()
    const sceneList = ref([
      new Scene(7, '碎石旷野', 'lv30 ~ lv34')
    ])

    const chooseSceneHero = (scene: Scene) => {
      messageBox.show({
        content: (h: Function) => {
          return h(heroListDialog, {
            onChoose: (hero: Hero) => {
              hero.on('underAttack', (attack: Attack) => {
                console.log(`${hero.name}underAttack`, attack.damage, '剩余hp', hero.hp)
              })
              scene.setHero(hero)
              messageBox.hide()
            }
          })
        }
      })
    }

    const startScene = (scene: Scene) => {
      scene.run()
      scene.on('gameOver', ({ gainGold, gainExp }: any) => {
        console.log('英雄死亡，游戏结束，获得奖励')
        console.log({ gainGold, gainExp })
        const params = {
          gold: gainGold,
          exp: gainExp,
          heroId: scene.hero?.id
        }

        store.dispatch('game/finishScene', params)
      })
    }

    return {
      sceneList,
      // method
      startScene,
      chooseSceneHero
    }
  }
}
</script>

<style scoped lang="scss">
.scene {
  margin: rem(20);
  padding: rem(20);
  border: 1px solid #000;
  font-size: rem(30);
  &_hd {

  }

  &_bd {
    margin: rem(20) 0;
    height: rem(200);
    line-height: rem(200);
    text-align: center;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &_ft {

  }
  button {
    width: 5em;
    margin-right: rem(10);
  }
  &_hero {
  }
}

</style>
