import Attack from '@/views/game/core/attack'
import Emitter from './emitter'

class CombatUnit extends Emitter {
  hp: number;

  constructor (hp: number) {
    super()
    this.hp = hp
  }

  get isAlive () {
    return this.hp > 0
  }

  // 战斗，返回一个Attack对象
  fight (): Attack {
    const attack = new Attack()
    // todo 设置attack伤害值等
    return attack
  }

  underAttack (attack: Attack) {
    this.hp -= attack.damage
    // todo 根据attack设置相关debuff
    this.emit('underAttack', attack)
  }
}
export default CombatUnit
