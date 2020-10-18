
export enum EquipPart {
  hat = 1,
  necklace,
  ring,
  glove,
  cloth,
  mainHand,
  subHand,
  shoes
}
enum EquipType {
  NORMAL = 1,
  GOOD,
  EXCELLENT,
  HISTORY,
  LEGEND
}

enum EquipAttr {
  hp, // 生命值
  mp, // 法力值
  damage, // 攻击
  defense, // 防御
  critical, // 暴击
  hpRegen, // 生命回复
  mpRegen, // 法力回复
  skill// 附带技能
}

const equipPart: Record<string, string> = {
  1: '头部',
  2: '项链',
  3: '戒指',
  4: '手套',
  5: '衣服',
  6: '主手',
  7: '副手',
  8: '脚部'
}
const equipType: Record<string, string> = {
  1: '普通',
  2: '优秀',
  3: '卓越',
  4: '史诗',
  5: '传奇'
}

class Equip {
  name: string;
  lv: number;
  part: EquipPart;
  type: EquipType;
  attr: Map<EquipAttr, any>;

  constructor (opts: any) {
    const { part, name, type, lv, attrs } = opts
    this.lv = lv
    this.name = name
    this.part = part
    this.type = type
    // this.attr = new Map()
    this.attr = this.initAttr(attrs)
  }

  get partName () {
    return equipPart[this.part]
  }

  get TypeName () {
    return equipType[this.type]
  }

  // todo 设置装备的属性
  initAttr (attrs: any) {
    const map = new Map()
    Object.keys(attrs).forEach(key => {
      map.set(key, attrs[key])
    })
    return map
  }
}

export default Equip
