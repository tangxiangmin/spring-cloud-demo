import CombatUnit from '@/views/game/core/combatUnit'
import Equip, { EquipPart } from '@/views/game/core/equip'

function calcLevel (lv: number): {hp: number;mp: number} {
  return {
    hp: lv * 500,
    mp: lv * 100
  }
}
class Hero extends CombatUnit {
  id: number;
  lv: number;
  mp: number;
  name: string;
  exp: number;
  equipMap: Map<EquipPart, Equip>;

  constructor (opts: any) {
    const { lv, name, exp, id } = opts
    const { mp, hp } = calcLevel(lv)
    super(hp)

    this.id = id
    this.lv = lv
    this.mp = mp
    this.name = name
    this.exp = exp

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

  // 计算所有装备的数据加持
  calcEquipAttr (equip: Equip, isTakeOff = false) {
    const attrs = equip.attrs
    let hp = attrs.get('hp') || 0
    if (isTakeOff) {
      hp = -hp
    }
    this.hp += hp
  }

  // 穿戴装备
  wearEquip (equip: Equip) {
    const part = equip.part
    this.equipMap.set(part, equip)
    this.calcEquipAttr(equip)
  }

  // 脱下装备
  getOffEquip (equip: Equip) {
    const part = equip.part
    this.equipMap.delete(part)
    this.calcEquipAttr(equip, true)
  }

  // 找到某个部位的装填
  findEquipByPart (part: EquipPart): Equip | undefined {
    return this.equipMap.get(part)
  }
}

export default Hero
