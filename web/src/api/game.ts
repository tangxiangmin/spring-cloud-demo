import request from '@/util/request'
import Hero from '@/views/game/core/hero'
import Equip, { VirtualEquip } from '@/views/game/core/equip'

export function fetchAccountInfo () {
  return request.get('/account/v1/info')
}

export function fetchHeroList () {
  return request.get('/hero/v1/list').then(res => {
    const heroList = res.data
    return heroList.map((hero: any) => new Hero(hero))
  })
}

export function fetchEquipList () {
  return request.get('/account/v1/equipList').then(res => {
    return res.data.map((tmp: any) => {
      return new Equip({
        id: tmp.id,
        lv: tmp.lv,
        heroId: tmp.heroId,
        part: tmp.part,
        type: tmp.type,
        name: tmp.name,
        attrs: {
          hp: 50,
          mp: 10
        }
      })
    })
  })
  // const list = []
  // for (let i = 0; i < 18; ++i) {
  //   list.push(createEquip(null))
  // }
  // return Promise.resolve(list)
}

// 商店
export function fetchBoxList () {
  const list = []
  for (let i = 0; i < 3; ++i) {
    list.push(
      Equip.createVirtualEquip(10)
    )
  }
  return Promise.resolve(list)
}

export function openEquipBox (virtualEquip: VirtualEquip) {
  return request.post('/account/v1/openEquipBox', virtualEquip).then(res => {
    const tmp = res.data
    return new Equip({
      id: tmp.id,
      lv: tmp.lv,
      part: tmp.part,
      type: tmp.type,
      name: tmp.name,
      attrs: {
        hp: 50,
        mp: 10
      }
    })
  })
}

export function finishScene (data: any) {
  return request.post('/account/v1/finishScene', data)
}

export function wearEquip (data: {heroId: number;equipId: number}) {
  return request.post('/hero/v1/wearEquip', data)
}
export function getOffEquip (equipId: number) {
  return request.post('/hero/v1/getOffEquip', { equipId })
}
