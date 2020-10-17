
import CombatUnit from '@/views/game/core/combatUnit'

class Monster extends CombatUnit {
  lv: number;
  name: string;

  constructor () {
    super(100)
    this.lv = 1
    this.name = '史莱姆'
  }
}

export default Monster
