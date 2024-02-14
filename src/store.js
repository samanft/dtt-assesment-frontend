import { createStore } from 'vuex'

export default createStore({
  state: {
    houses: []
  },
  mutations: {
    setHouses(state, houses) {
      state.houses = houses
    }
  },
  actions: {
    async fetchHouses({ commit }) {
      const response = await fetch("https://api.intern.d-tt.nl/api/houses", {
        headers: {
          "X-Api-Key": "8pMUHx6Ddyk4hZYt9lBwKzTFmENPvsbW",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const houses = await response.json();
      commit('setHouses', houses);
    }
  },
  getters: {
    houses: state => state.houses
  }
})