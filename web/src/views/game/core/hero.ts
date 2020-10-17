import CombatUnit from '@/views/game/core/combatUnit'

class Hero extends CombatUnit {
  lv: number;
  mp: number;
  name: string;
  constructor () {
    super(1000)
    this.lv = 1
    this.mp = 100
    this.name = '小明'
  }
}

export default Hero
