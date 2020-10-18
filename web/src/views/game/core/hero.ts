import CombatUnit from '@/views/game/core/combatUnit'
import Equip, { EquipPart } from '@/views/game/core/equip'

class Hero extends CombatUnit {
  lv: number;
  mp: number;
  name: string;
  equipMap: Map<EquipPart, Equip>;

  constructor (opts: any) {
    super(1000)
    const { lv, mp, name } = opts
    this.lv = lv
    this.mp = mp
    this.name = name
    this.equipMap = new Map()
  }

  get hat () {
    return this.findEquipByPart(EquipPart.hat)
  }

  get necklace () {
    return this.findEquipByPart(EquipPart.necklace)
  }

  get ring () {
    return this.findEquipByPart(EquipPart.ring)
  }

  get glove () {
    return this.findEquipByPart(EquipPart.glove)
  }

  get cloth () {
    return this.findEquipByPart(EquipPart.cloth)
  }

  get mainHand () {
    return this.findEquipByPart(EquipPart.mainHand)
  }

  get subHand () {
    return this.findEquipByPart(EquipPart.subHand)
  }

  get shoes () {
    return this.findEquipByPart(EquipPart.shoes)
  }

  // 穿戴装备
  wearEquip (equip: Equip) {
    const part = equip.part
    this.equipMap.set(part, equip)
  }

  // 找到某个部位的装填
  findEquipByPart (part: EquipPart): Equip | undefined {
    return this.equipMap.get(part)
  }
}

export default Hero
