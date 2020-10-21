
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

export interface VirtualEquip {
  lv: number;
  type: EquipType;
  part: EquipPart;
  partName: string;
  typeName: string;
  cost: number;
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
function randomEnum<T> (anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  const randomEnumValue = enumValues[randomIndex]
  return randomEnumValue
}

class Equip {
  id: number;
  heroId: number;
  name: string;
  lv: number;
  part: EquipPart;
  type: EquipType;
  attrs: Map<string, any>;

  constructor (opts: any) {
    const { part, name, type, lv, attrs, id, heroId } = opts
    this.id = id
    this.heroId = heroId
    this.lv = lv
    this.name = name
    this.part = part
    this.type = type
    this.attrs = new Map()

    this.initAttr(attrs)
  }

  // todo 控制每种品质装备的生成频率
  static createVirtualEquip (lv: number): VirtualEquip {
    const type = randomEnum(EquipType)
    const part = randomEnum(EquipPart)
    const cost = lv * type * 200
    return {
      lv,
      cost,
      type,
      part,
      typeName: equipType[type],
      partName: equipPart[part]
    }
  }

  get partName () {
    return equipPart[this.part]
  }

  get typeName () {
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
