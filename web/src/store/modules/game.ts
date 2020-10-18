import { fetchEquipList, fetchHeroList } from '@/api/game'

interface State {
  userList: Array<any>;
  equipList: Array<any>;
}

export default {
  namespaced: true,
  state: {
    userList: [],
    equipList: []
  },
  mutations: {
    setUserList (state: State, payload: Array<any>) {
      state.userList = payload
    },
    setEquipList (state: State, payload: any) {
      state.equipList = payload
    }

  },
  actions: {
    async fetchUserList ({ commit }: any) {
      const list = await fetchHeroList()
      commit('setUserList', list)
    },
    async fetchEquipList ({ commit }: any) {
      const list = await fetchEquipList()
      commit('setEquipList', list)
    }
  }
}
