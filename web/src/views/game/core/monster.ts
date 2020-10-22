
import CombatUnit from '@/views/game/core/combatUnit'

class Monster extends CombatUnit {
  lv: number;
  name: string;

  constructor () {
    const lv = 1
    super({ lv })
    this.lv = 1
    this.name = '史莱姆'
  }
}

export default Monster
