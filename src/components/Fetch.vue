<template>
  <div v-if="houses && houses.length">
    <div class="modal" v-if="showModal">
      <div class="modal-content" style="text-align: center">
        <h2>Delete listing</h2>
        <p>Are you sure you want to delete this listing?</p>
        <p>This action cannot be undone.</p>

        <button
          @click="deleteHouse"
          class="buttons-and-tabs primary-background"
          style="display: block; margin: auto; border: none; padding: 10px 20px; border-radius: 5px;"
        >
          YES, DELETE
        </button>
        <button
          @click="showModal = false"
          class="buttons-and-tabs secondary-background"
          style="display: block; margin: auto; border: none; padding: 10px 20px; border-radius: 5px;"
        >
          GO BACK
        </button>
      </div>
    </div>
    <div v-for="(house, index) in houses" :key="index">
      <!-- <router-link :to="{ name: 'Details', params: { houseId: house.id } }"> -->
      <div class="house-card background-2">
        <router-link :to="{ name: 'Details', params: { houseId: house.id } }">
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
                <img
                  class="iconImages"
                  src="../assets/ic_bed@3x.png"
                  width="15px"
                  alt="Bedroom icon"
                />
                <p class="iconText primary-element">{{ house.rooms.bedrooms }}</p>
                <img
                  class="iconImages"
                  src="../assets/ic_bath@3x.png"
                  width="15px"
                  alt="Bathroom icon"
                />
                <p class="iconText primary-element">{{ house.rooms.bathrooms }}</p>
                <img
                  class="iconImages"
                  src="../assets/ic_size@3x.png"
                  width="15px"
                  alt="Size icon"
                />
                <p class="iconText primary-element">{{ house.size }}</p>
              </div>
              <!-- Add more properties as needed -->
            </div>
          </div>
        </router-link>
        <div class="rightSide" v-if="house.madeByMe">
          <router-link
            :to="{ name: 'newListing', params: { houseId: house.id } }"
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

export default {
  props: ["searchQuery", "selectedButton", "limit"],
  setup(props) {
    const store = useStore();
    const houses = ref(null);
    const houseId = ref(null); // Add this line
    const showModal = ref(false);

    onMounted(async () => {
      await store.dispatch("fetchHouses");
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

    const prepareDelete = (id) => {
      showModal.value = true;
      houseId.value = id;
    };

    const deleteHouse = async () => {
      await store.dispatch("deleteHouse", houseId.value);
      showModal.value = false;
    };

    // const deleteHouse = async () => {
    //   var myHeaders = new Headers();
    //   myHeaders.append("X-Api-Key", "8pMUHx6Ddyk4hZYt9lBwKzTFmENPvsbW");

    //   var requestOptions = {
    //     method: 'DELETE',
    //     headers: myHeaders,
    //     redirect: 'follow'
    //   };

    //   await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId.value}`, requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //       console.log(result);
    //       showModal.value = false;
    //     })
    //     .catch(error => console.log('error', error));
    // };

    return {
      houses: sortedAndFilteredHouses,
      showModal,
      deleteHouse,
      prepareDelete, // Add this line
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

.rightSideIcons {
  padding-right: 10px;
  padding-top: 10px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
