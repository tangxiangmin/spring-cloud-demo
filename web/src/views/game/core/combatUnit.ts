import Attack from '@/views/game/core/attack'
import Emitter from './emitter'
import Skill from '@/views/game/core/skill'

function calcLevel (lv: number): {hp: number;mp: number} {
  return {
    hp: lv * 500,
    mp: lv * 100
  }
}
class CombatUnit extends Emitter {
  totalHp: number;
  hp: number;
  mp: number;
  skillList: Array<Skill>;
  target?: CombatUnit;

  constructor (opts: any) {
    super()
    const { lv } = opts

    const { mp, hp } = calcLevel(lv)
    this.totalHp = hp
    this.hp = hp
    this.mp = mp
    this.skillList = []
  }

  // 攻击
  get damage () {
    return 66
  }

  // 防御
  get defense (): number {
    return 30
  }

  get isAlive () {
    return this.hp > 0
  }

  // 设置对手
  setTarget (target: CombatUnit) {
    this.target = target
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
