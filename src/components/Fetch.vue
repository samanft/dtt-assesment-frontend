<template>
  <div v-if="houses && houses.length">
    <Modal
      v-if="showModal"
      @delete-house="deleteHouse"
      @close-modal="showModal = false"
    />
    <div class="header-2" style="margin-bottom: 10px">
      {{ numberOfHouses }} houses found
    </div>
    <div v-for="(house, index) in houses" :key="index">
      <!-- <router-link :to="{ name: 'Details', params: { houseId: house.id } }"> -->
      <div class="house-card background-2 shadow-effect">
        <router-link :to="{ name: 'Details', params: { houseId: house.id } }">
          <div class="leftSide">
            <img :src="house.image" alt="House image" class="house-image" />
            <div class="additionalInfo">
              <h2 class="no-margin header-2 primary-element" id="house-header">
                {{ house.location.street }} {{ house.location.houseNumber
                }}{{ house.location.houseNumberAddition }}
              </h2>
              <p class="no-margin listing-information primary-element">
                € {{ house.price.toLocaleString("de-DE") }}
              </p>
              <p class="no-margin listing-information secondary-element">
                {{ house.location.zip }} {{ house.location.city }}
              </p>
              <div class="icons" style="margin-top: 10px">
                <img
                  class="iconImages"
                  src="../assets/ic_bed@3x.png"
                  width="15px"
                  alt="Bedroom icon"
                />
                <p
                  class="iconText no-margin listing-information primary-element"
                >
                  {{ house.rooms.bedrooms }}
                </p>
                <img
                  class="iconImages"
                  src="../assets/ic_bath@3x.png"
                  width="15px"
                  alt="Bathroom icon"
                />
                <p
                  class="iconText no-margin listing-information primary-element"
                >
                  {{ house.rooms.bathrooms }}
                </p>
                <img
                  class="iconImages"
                  src="../assets/ic_size@3x.png"
                  width="15px"
                  alt="Size icon"
                />
                <p
                  class="iconText no-margin listing-information primary-element"
                >
                  {{ house.size }}
                </p>
              </div>
              <!-- Add more properties as needed -->
            </div>
          </div>
        </router-link>
        <div class="rightSide" v-if="house.madeByMe">
          <router-link
            :to="{
              name: 'newListing',
              params: { houseId: house.id, isEditing: true },
            }"
          >
            <img
              class="rightSideIcons"
              src="../assets/ic_edit@3x.png"
              width="20px"
            />
          </router-link>
          <img
            class="rightSideIcons"
            src="../assets/ic_delete@3x.png"
            width="20px"
            @click="
              showModal = true;
              prepareDelete(house.id);
            "
          />
        </div>
      </div>
      <!-- </router-link> -->
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
import Modal from "./Modal.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Modal,
  },
  props: [
    "searchQuery",
    "selectedButton",
    "limit",
    "minPrice",
    "maxPrice",
    "madeByMe",
    "notMadeByMe",
  ],
  setup(props) {
    const store = useStore();
    const houses = ref(null);
    const houseId = ref(null); // Add this line
    const showModal = ref(false);
    const route = useRoute();

    onMounted(async () => {
      await store.dispatch("fetchHouses");
      houses.value = store.getters.houses;
    });

    const sortedAndFilteredHouses = computed(() => {
      let result = houses.value;
      console.log(result);
      if (props.searchQuery) {
        const searchWords = props.searchQuery.toLowerCase().split(" ");

        result = result.filter((house) => {
          return searchWords.every((word) => {
            return (
              house.location.street.toLowerCase().includes(word) ||
              house.location.houseNumber
                .toString()
                .toLowerCase()
                .includes(word) ||
              house.price.toString().toLowerCase().includes(word) ||
              house.location.zip.toLowerCase().includes(word) ||
              house.location.city.toLowerCase().includes(word) ||
              house.size.toString().toLowerCase().includes(word)
            );
          });
        });
      }

      if (
        (props.madeByMe === true && props.notMadeByMe === true && result) ||
        (route && route.path !== "/")
      ) {
        if (route) {
          console.log(route.path);
        }
        // If both checkboxes are checked, show all houses
        result = result;
      } else if (props.madeByMe === true && result) {
        if (route) {
          console.log(route.path);
        }
        // If only the 'madeByMe' checkbox is checked, show only the houses made by me
        result = result.filter((house) => house.madeByMe);
      } else if (props.notMadeByMe === true && result) {
        if (route) {
          console.log(route.path);
        }
        // If only the 'notMadeByMe' checkbox is checked, show only the houses not made by me
        result = result.filter((house) => !house.madeByMe);
      } else {
        if (route) {
          console.log(route.path);
        }
        // If neither checkbox is checked, show no houses
        result = [];
      }

      if (result && props.minPrice == 0) {
        result = result.filter((house) => {
          return house.price <= props.maxPrice;
        });
      }

      // Filter by minPrice and maxPrice
      if (props.minPrice && props.maxPrice) {
        console.log(result);
        console.log(props.minPrice, props.maxPrice);
        console.log(result);
        console.log("Max price:", props.maxPrice);
        result = result.filter((house) => {
          return (
            house.price >= Number(props.minPrice) &&
            house.price <= props.maxPrice
          );
        });
      }

      if (props.selectedButton === "price" && houses.value) {
        result = result.sort((a, b) => a.price - b.price);
      } else if (props.selectedButton === "size" && houses.value) {
        result = result.sort((a, b) => a.size - b.size);
      } else if (props.selectedButton === "alphabetical" && houses.value) {
        result = result.sort((a, b) => {
          if (a.location.street < b.location.street) {
            return -1;
          }
          if (a.location.street > b.location.street) {
            return 1;
          }
          return 0;
        });
      }

      if (result && props.limit) {
        result = result.slice(0, props.limit);
      }

      return result;
    });

    const numberOfHouses = computed(() => {
      return sortedAndFilteredHouses.value.length;
    });

    const prepareDelete = (id) => {
      showModal.value = true;
      houseId.value = id;
    };

    const deleteHouse = async () => {
      await store.dispatch("deleteHouse", houseId.value);
      await store.dispatch("fetchHouses"); // Add this line
      houses.value = store.getters.houses; // Add this line
      showModal.value = false;
    };

    return {
      houses: sortedAndFilteredHouses,
      showModal,
      deleteHouse,
      prepareDelete, // Add this line
      numberOfHouses,
    };
  },
};
</script>

<style scoped>
.house-image {
  width: 100%;
  height: 100%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
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

#house-header {
  margin-right: 20px;
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

.rightSideIcons {
  padding-right: 10px;
  padding-top: 20px;
}

@media (max-width: 768px) {
  .rightSideIcons {
    width: 15px;
  }
}
</style>
