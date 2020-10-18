import { fetchEquipList, fetchHeroList } from '@/api/game'

interface State {
  heroList: Array<any>;
  equipList: Array<any>;
}

export default {
  namespaced: true,
  state: {
    heroList: [],
    equipList: []
  },
  mutations: {
    setHeroList (state: State, payload: Array<any>) {
      state.heroList = payload
    },
    setEquipList (state: State, payload: any) {
      state.equipList = payload
    }

  },
  actions: {
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
