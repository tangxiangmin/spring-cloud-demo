import { fetchEquipList, fetchHeroList, fetchAccountInfo, finishScene, openEquipBox, fetchBoxList, wearEquip, getOffEquip } from '@/api/game'
import Equip, { VirtualEquip } from '@/views/game/core/equip'
import Hero from '@/views/game/core/hero'

interface State {
  accountInfo: Record<string, any>;
  heroList: Array<any>;
  equipList: Array<any>;
  equipBoxList: Array<any>;
}

export default {
  namespaced: true,
  state: {
    accountInfo: {},
    heroList: [],
    equipList: [],
    equipBoxList: []
  },
  mutations: {
    setAccountInfo (state: State, payload: any) {
      state.accountInfo = payload
    },
    setHeroList (state: State, payload: Array<any>) {
      state.heroList = payload
    },
    setEquipList (state: State, payload: any) {
      state.equipList = payload
    },
    setEquipBoxList (state: State, payload: any) {
      state.equipBoxList = payload
    }

  },
  actions: {
    async initGame ({ dispatch, commit }: any) {
      const tasks = [
        fetchAccountInfo(),
        fetchHeroList(),
        fetchEquipList()
      ]
      const [accountInfo, heroList, equipList] = await Promise.all(tasks)

      const heroMap = heroList.reduce((acc: any, hero: Hero) => {
        acc[hero.id] = hero
        return acc
      }, {})

      // 为英雄绑定对应的装备
      const unUsedEquipList = []
      for (const equip of equipList) {
        if (equip.heroId > 0) {
          const hero = heroMap[equip.heroId]
          if (hero) {
            hero.wearEquip(equip)
          } else {
            debugger
          }
        } else {
          unUsedEquipList.push(equip)
        }
      }

      commit('setAccountInfo', accountInfo.data)

      commit('setHeroList', heroList)
      commit('setEquipList', unUsedEquipList)
    },
    async finishScene ({ commit }: any, payload: any) {
      const res = await finishScene(payload)
    },
    async fetchBoxList ({ commit }: any) {
      const res = await fetchBoxList()
      commit('setEquipBoxList', res)
    },

    async openEquipBox ({ state, commit }: any, payload: VirtualEquip) {
      const { accountInfo, equipList } = state
      const { gold } = accountInfo
      commit('setAccountInfo', {
        ...accountInfo,
        gold: gold - payload.cost
      })
      const equip = await openEquipBox(payload)
      equipList.push(equip)
      return equip
    },

    async wearEquip ({ state, commit }: any, payload: {hero: Hero; equip: Equip}) {
      const { hero, equip } = payload
      await wearEquip({ heroId: hero.id, equipId: equip.id })
      const { equipList } = state
      const idx = equipList.indexOf(equip)

      hero.wearEquip(equip)
      equipList.splice(idx, 1)
    },
    async getOffEquip ({ state, commit }: any, payload: {hero: Hero; equip: Equip}) {
      const { hero, equip } = payload
      await getOffEquip(equip.id)
      const { equipList } = state
      hero.getOffEquip(equip)
      equipList.push(equip)
    }
  }
}
