
// 技能系统，包含英雄技能和装备技能

import CombatUnit from '@/views/game/core/combatUnit'

// 设计为：每个技能对应一个id，调用对应skillId时执行相关回调
export function getSkillMap (self: CombatUnit, enemy: CombatUnit): Record<string, Function> {
  const skillMap = {
    // 普通攻击抽象成最基础的主动技能
    0: function attack () {
      const isCritical = Math.random() < self.critical
      let damage = self.damage * 100 / (100 + enemy.defense)

      if (isCritical) {
        damage *= 2
        self.emit('critical', damage) // 触发暴击
      }

      enemy.hp -= damage
      enemy.emit('underAttack', damage) // 遭到攻击
    },

    // 自己恢复100点生命值
    100: function recover () {
      self.hp += 100
      console.log('回复生命:当前hp：', self.hp)
    },
    // 敌人中毒，每秒扣除10点生命值，持续3秒
    101: function poison () {
      let count = 0
      const loop = () => {
        count++
        if (count > 3) return
        setTimeout(() => {
          enemy.hp -= 10
          loop()
        }, 1000)
      }
      loop()
    },
    // 被动技能
    102: function onCritical () {
      self.once('critical', (damage: number) => {
        self.hp += damage * 0.1
      })
    }
  }
  return skillMap
}

class Skill {
  id: number;
  name: string;
  coolTime: number;
  action?: Function;

  constructor (id: number) {
    this.name = '野蛮生长'
    this.coolTime = 3
    this.id = id
  }

  runAction (self: CombatUnit, enemy: CombatUnit) {
    const actionMap = getSkillMap(self, enemy)
    const action = actionMap[this.id]
    action()
  }
}

export default Skill
