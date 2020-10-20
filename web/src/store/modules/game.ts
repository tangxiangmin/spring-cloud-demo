import { fetchEquipList, fetchHeroList, fetchAccountInfo } from '@/api/game'

interface State {
  accountInfo: Record<string, any>;
  heroList: Array<any>;
  equipList: Array<any>;
}

export default {
  namespaced: true,
  state: {
    accountInfo: {},
    heroList: [],
    equipList: []
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
    }

  },
  actions: {
    async fetchAccountInfo ({ commit }: any) {
      const res = await fetchAccountInfo()
      commit('setAccountInfo', res.data)
    },
    async fetchHeroList ({ commit }: any) {
      const list = await fetchHeroList()
      commit('setHeroList', list)
    },
    async fetchEquipList ({ commit }: any) {
      const list = await fetchEquipList()
      commit('setEquipList', list)
    }
  }
}
