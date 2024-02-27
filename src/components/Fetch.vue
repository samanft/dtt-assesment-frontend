<template>
  <div v-if="houses && houses.length">
    <div v-for="(house, index) in houses" :key="index">
      <router-link :to="{ name: 'Details', params: { houseId: house.id } }">
        <div class="house-card background-2">
          <div class="leftSide">
            <img :src="house.image" alt="House image" class="house-image" />
            <div class="additionalInfo">
              <p class="no-margin header-2 primary-element">
                {{ house.location.street }} {{ house.location.houseNumber
                }}{{ house.location.houseNumberAddition }}
              </p>
              <p class="no-margin primary-element">
                € {{ house.price.toLocaleString("de-DE") }}
              </p>
              <p class="no-margin secondary-element">
                {{ house.location.zip }} {{ house.location.city }}
              </p>
              <div class="icons">
                <img class="iconImages" src="../assets/ic_bed@3x.png" width="15px" alt="Bedroom icon" />
                <p class="iconText">{{ house.rooms.bedrooms }}</p>
                <img class="iconImages" src="../assets/ic_bath@3x.png" width="15px" alt="Bathroom icon" />
                <p class="iconText">{{ house.rooms.bathrooms }}</p>
                <img class="iconImages" src="../assets/ic_size@3x.png" width="15px" alt="Size icon" />
                <p class="iconText">{{ house.size }}</p>
              </div>
              <!-- Add more properties as needed -->
            </div>
          </div>
          <div class="rightSide"></div>
        </div>
      </router-link>
    </div>
  </div>
  <div class="noHomesFoundContainer empty-state-message" v-else>
    <img
      class="noHomesFound"
      src="../assets/img_empty_houses@3x.png"
      alt="No houses found"
    />
    <div>
      <p>No results found.</p>
      <p>Please try another keyword.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: ["searchQuery", "selectedButton", "limit"],
  setup(props) {
    const store = useStore();
    const houses = ref(null);

    onMounted(async () => {
      await store.dispatch('fetchHouses');
      houses.value = store.getters.houses;
    });

    const sortedAndFilteredHouses = computed(() => {
      let result = houses.value;
      if (props.searchQuery) {
        result = result.filter((house) => {
          const searchQueryLowercased = props.searchQuery.toLowerCase();
          return (
            house.location.street
              .toLowerCase()
              .includes(searchQueryLowercased) ||
            house.price
              .toString()
              .toLowerCase()
              .includes(searchQueryLowercased) ||
            house.location.zip.toLowerCase().includes(searchQueryLowercased) ||
            house.location.city.toLowerCase().includes(searchQueryLowercased) ||
            house.size.toString().toLowerCase().includes(searchQueryLowercased)
          );
        });
      }

      if (props.selectedButton === "price" && houses.value) {
        result = result.sort((a, b) => a.price - b.price);
      } else if (props.selectedButton === "size" && houses.value) {
        result = result.sort((a, b) => a.size - b.size);
      }

      if (result && props.limit) {
        result = result.slice(0, props.limit);
      }

      return result;
    });

    return {
      houses: sortedAndFilteredHouses,
    };
  },
};
</script>

<style scoped>
.house-image {
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.iconImages {
  margin-right: 5px;
}

.iconText {
  margin-right: 5px;
}

.house-card {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 10px;
}

.leftSide {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.icons {
  display: flex;
  align-items: center;
}

.rightSide {
  margin-right: 10px;
}

.additionalInfo {
  margin-left: 10px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
}

.roomInfo {
  display: flex;
}

.noHomesFound {
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 300px;
}

.noHomesFoundContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>
