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
  critical: number;
  damage: number;
  defense: number;

  constructor (opts: any) {
    super()
    const { lv } = opts

    const { mp, hp } = calcLevel(lv)
    this.totalHp = hp
    this.hp = hp
    this.mp = mp
    this.critical = 0.5
    this.damage = 60
    this.defense = 20

    this.skillList = [
      new Skill(0),
      new Skill(100)
    ]
  }

  get isAlive () {
    return this.hp > 0
  }

  // 设置对手
  setTarget (target: CombatUnit) {
    this.target = target
  }

  useSkill () {
    const idx = Math.floor(Math.random() * this.skillList.length)
    const skill = this.skillList[idx]
    if (this.target) {
      skill.runAction(this, this.target)
    }
  }

  // 战斗，返回一个Attack对象
  fight () {
    this.useSkill()
  }

  underAttack (attack: Attack) {
    this.hp -= attack.damage
    // todo 根据attack设置相关debuff
    this.emit('underAttack', attack)
  }
}
export default CombatUnit
