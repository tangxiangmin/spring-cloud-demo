import Monster from '@/views/game/core/monster'
import Hero from '@/views/game/core/hero'
import CombatUnit from '@/views/game/core/combatUnit'
import Attack from '@/views/game/core/attack'

// 关卡
class Step {
  monster: Monster | null;
  gold: number;
  exp: number;

  constructor (monster: Monster) {
    this.monster = monster
    this.gold = 100
    this.exp = 40
  }
}

class Scene {
  index: number;
  name: string;
  lvDesc: string;

  units: Array<CombatUnit>;
  hero: Hero | null;
  currentStep: number;
  totalStep: number;

  isRunning: boolean;

  gainGold: number; // 获取金币
  gainExp: number; // 获取经验

  stepList: Array<Step>;

  constructor (index: number, name: string, lvDesc: string) {
    this.index = index
    this.name = name
    this.lvDesc = lvDesc

    this.units = []
    this.hero = null
    this.currentStep = 1
    this.totalStep = 15
    this.isRunning = false

    this.gainGold = 0
    this.gainExp = 0

    const stepList = []
    for (let i = 0; i < this.totalStep; ++i) {
      const monster = new Monster()
      const step = new Step(monster)
      stepList.push(step)
    }
    this.stepList = stepList
  }

  get currentStepInstance () {
    return this.stepList[this.currentStep]
  }

  get monster () {
    return this.currentStepInstance?.monster
  }

  setHero (hero: Hero) {
    this.hero = hero
  }

  round () {
    const { hero, monster } = this
    if (hero === null || monster === null) {
      throw new Error('人员不全，无法开始战斗')
    }
    let side = true
    const loop = () => {
      setTimeout(() => {
        const a = side ? hero : monster
        const b = side ? monster : hero
        const attack = a.fight()
        b.underAttack(attack)
        side = !side
        if (a.isAlive && b.isAlive) {
          loop()
        } else if (hero.isAlive) {
          this.finishRound()
        } else {
          this.gameOver()
        }
      }, 100)
    }
    loop()
  }

  finishRound () {
    const { currentStepInstance } = this
    const { gold, exp } = currentStepInstance
    this.gainGold += gold
    this.gainExp += exp

    this.nextRound()
  }

  nextRound () {
    this.currentStep++
    console.log('开始新的关卡', this.currentStep)
    if (this.currentStep <= this.totalStep) {
      this.round()
    }
  }

  gameOver () {
    console.log('英雄死亡，游戏结束，获得奖励')
    const { gainGold, gainExp } = this
    console.log({ gainGold, gainExp })
    this.isRunning = false
  }

  run () {
    this.isRunning = true
    this.round()
  }
}

export default Scene
