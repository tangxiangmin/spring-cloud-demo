
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

// enum EquipAttr {
//   hp='hp', // 生命值
//   mp = 'mp', // 法力值
//   damage = 'damage', // 攻击
//   defense = 'defense', // 防御
//   critical = 'critical', // 暴击
//   hpRegen = 'hpRegen', // 生命回复
//   mpRegen = 'mpRegen', // 法力回复
//   skill = 'skill'// 附带技能
// }

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
  attrs: Map<string, any>;

  constructor (opts: any) {
    const { part, name, type, lv, attrs } = opts
    this.lv = lv
    this.name = name
    this.part = part
    this.type = type
    this.attrs = new Map()

    this.initAttr(attrs)
  }

  get partName () {
    return equipPart[this.part]
  }

  get TypeName () {
    return equipType[this.type]
  }

  // todo 设置装备的属性
  initAttr (attrs: any) {
    if (!attrs) return
    Object.keys(attrs).forEach(key => {
      this.attrs.set(key, attrs[key])
    })
  }
}

export default Equip
