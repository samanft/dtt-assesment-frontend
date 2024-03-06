import { createStore } from 'vuex'

export default createStore({
  state: {
    houses: []
  },
  mutations: {
    setHouses(state, houses) {
      state.houses = houses
    },
    setHouse(state, house) {
      state.house = house; // Add a new state property for the individual house
    },
    removeHouse(state, houseId) {
      state.houses = state.houses.filter(house => house.id !== houseId);
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
      console.log(houses);
      commit('setHouses', houses);
    },
    async deleteHouse({ commit }, houseId) {
      var myHeaders = new Headers();
      myHeaders.append("X-Api-Key", "8pMUHx6Ddyk4hZYt9lBwKzTFmENPvsbW");
  
      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          commit('removeHouse', houseId);
        })
        .catch(error => console.log('error', error));
    },
    async fetchHouseById({ commit }, houseId) {
      const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
        headers: {
          "X-Api-Key": "8pMUHx6Ddyk4hZYt9lBwKzTFmENPvsbW",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const house = await response.json();
      commit('setHouse', house[0]); // Commit the mutation with the fetched house data
      console.log(house);
      return house;
    },
  
  },
  getters: {
    houses: state => state.houses
  }
})