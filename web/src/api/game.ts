import request from '@/util/request'
import Hero from '@/views/game/core/hero'
import Equip from '@/views/game/core/equip'

const random = (start: number, end: number) => {
  return Math.floor(Math.random() * end + start)
}

function createEquip () {
  const part = random(1, 8)
  const type = random(1, 5)

  return new Equip({
    lv: 30,
    part,
    type,
    name: '隔热手套'
  })
}

export function fetchHeroList () {
  return Promise.resolve([
    new Hero({ name: '克里斯' })
    // { id: 1, name: '小强', hp: 5730, mp: 2131, energy: 132, exp: '1900 / 4200' },
    // { id: 2, name: '小红' },
    // { id: 3, name: '小明' }
  ])
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
