<template>
  <div class="background-1">
    <div class="container">
      <BackButton />
      <Modal
      v-if="showModal"
      @delete-house="deleteHouse"
      @close-modal="showModal = false"
    />
      <div class="flex">
        <div class="background-2">
          <img
            class="house-image"
            :src="house.image"
            :alt="house.location.street"
          />
          <div class="house-info">
            <div class="additionalInfo padding">
              <div class="flex-container">
                <p class="no-margin header-1 primary-element" id="house-title">
                  {{ house.location.street }} {{ house.location.houseNumber
                  }}{{ house.location.houseNumberAddition }}
                </p>
                <div>
                  <div v-if="house.madeByMe" id="main-house-icons">
                    <router-link
                      :to="{
                        name: 'newListing',
                        params: { houseId: house.id, isEditing: true },
                      }"
                    >
                      <img
                        :src="EditButton"
                        width="20px"
                        alt="Edit icon"
                        class="iconImages"
                      />
                    </router-link>
                    <img
                      :src="DeleteButton"
                      width="20px"
                      alt="Delete icon"
                      @click="
                        showModal = true;
                        prepareDelete(house.id);
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="icons">
                <img
                  class="iconImages"
                  src="../assets/ic_location@3x.png"
                  width="15px"
                  alt="Location icon"
                />
                <p class="iconText listing-information">
                  {{ house.location.zip }} {{ house.location.city }}
                </p>
              </div>
              <div class="icons">
                <img
                  src="../assets/ic_price@3x.png"
                  class="iconImages"
                  width="15px"
                />
                <p
                  class="no-margin primary-element iconText listing-information"
                >
                  {{ house.price.toLocaleString("de-DE") }}
                </p>
                <img
                  class="iconImages"
                  src="../assets/ic_size@3x.png"
                  width="15px"
                  alt="Size icon"
                />
                <p class="iconText listing-information">{{ house.size }}</p>
                <img
                  class="iconImages"
                  src="../assets/ic_construction_date@3x.png"
                  width="15px"
                  alt="Size icon"
                />
                <p class="iconText listing-information">
                  Built in {{ house.constructionYear }}
                </p>
              </div>

              <div class="icons">
                <img
                  class="iconImages"
                  src="../assets/ic_bed@3x.png"
                  width="15px"
                  alt="Bedroom icon"
                />
                <p class="iconText listing-information">
                  {{ house.rooms.bedrooms }}
                </p>
                <img
                  class="iconImages"
                  src="../assets/ic_bath@3x.png"
                  width="15px"
                  alt="Bathroom icon"
                />
                <p class="iconText listing-information">
                  {{ house.rooms.bathrooms }}
                </p>
                <img
                  class="iconImages"
                  src="../assets/ic_garage@3x.png"
                  width="15px"
                  alt="Size icon"
                />
                <p class="iconText listing-information">
                  {{ house.hasGarage ? "Yes" : "No" }}
                </p>
              </div>
              <!-- Add more properties as needed -->
            </div>
            <p class="body-text padding">
              {{ house.description }}
            </p>
          </div>
        </div>

        <div id="recommendations">
          <h2 class="header-2 no-margin" id="recommendationsHeader">
            Recommended for you
          </h2>
          <!-- Fetch and display 3 houses for the recommendations -->
          <Fetch :limit="3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importing necessary components and assets
import { useStore } from "vuex";
import Fetch from "./Fetch.vue";
import BackButton from "./BackButton.vue";
import Modal from './Modal.vue';
import DeleteGrey from "../assets/ic_delete@3x.png";
import DeleteWhite from "../assets/ic_delete_white@3x.png";
import EditOrange from "../assets/ic_edit@3x.png";
import EditWhite from "../assets/ic_edit_white@3x.png";

// Importing necessary Vue 3 Composition API functions
import { ref, onMounted, onUnmounted, computed } from "vue";

// State for showing the modal and the house ID
const showModal = ref(false);
const houseId = ref(null);

// Function to prepare the deletion of a house
const prepareDelete = (id) => {
  showModal.value = true;
  houseId.value = id;
};

// Function to delete a house
const deleteHouse = async () => {
  await store.dispatch("deleteHouse", houseId.value);
  await store.dispatch("fetchHouses");
  house.value = store.getters.houses;
  showModal.value = false;
};

// State for the window width
let windowWidth = ref(window.innerWidth);

// Function to update the window width
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

// Event listeners for window resize
onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

// Computed properties for the delete and edit buttons
const DeleteButton = computed(() => {
  return windowWidth.value <= 768 ? DeleteWhite : DeleteGrey;
});

const EditButton = computed(() => {
  return windowWidth.value <= 768 ? EditWhite : EditOrange;
});

// Defining props
const props = defineProps(["houseId"]);

// Vuex store
const store = useStore();

// Computed property for the house
const house = computed(() => {
  console.log(props.houseId);
  return store.state.houses.find((house) => house.id === Number(props.houseId));
});
</script>

<style scoped>
.house-image {
  width: 600px;
}

@media (max-width: 768px) {
  #main-house-icons {
    z-index: 1;
    position: absolute;
    top: 40px;
    right: 5%;
  }
}

#recommendationsHeader {
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  #recommendationsHeader {
    margin-top: 15px;
  }
  #recommendations {
    width: 90%;
  }
}

.house-info {
  width: 600px;
}

.flex-container {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .house-image {
    width: 100vw;
  }
  .house-info {
    width: 100vw;
  }
}

#house-title {
  margin-top: 15px;
}

.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .flex {
    justify-content: center;
  }
}


.background-1 {
  min-height: 100vh;
  padding-top: 20px;
}

.icons {
  display: flex;
  align-items: center;
}

.iconImages {
  margin-right: 10px;
}

.iconText {
  margin-right: 20px;
}

.padding {
  padding-left: 20px;
  padding-right: 20px;
}

@media (max-width: 768px) {
  #router {
    padding-top: 0;
  }
}
</style>
