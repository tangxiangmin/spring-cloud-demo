import request from '@/util/request'

const equipPos: Record<string, string> = {
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

const random = (start: number, end: number) => {
  return Math.floor(Math.random() * end + start)
}

function createEquip () {
  const pos = random(1, 8)
  const type = random(1, 5)

  return {
    lv: 30,
    pos,
    type,
    name: '隔热手套',
    posName: equipPos[pos],
    typeName: equipType[type]
    // id: i
  }
}

export function fetchHeroList () {
  return Promise.resolve([])
}

export function fetchEquipList () {
  const list = []
  for (let i = 0; i < 18; ++i) {
    list.push(createEquip())
  }
  return Promise.resolve(list)
}

export function openEquipBox () {
  return Promise.resolve(createEquip())
}
