<template>
  <div class="background-1">
    <div class="container">
      <BackButton />
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
                    <img
                      src="../assets/ic_edit@3x.png"
                      width="20px"
                      alt="Edit icon"
                      class="iconImages"
                    />
                    <img
                      src="../assets/ic_delete@3x.png"
                      width="20px"
                      alt="Delete icon"
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
                <p class="iconText">
                  {{ house.location.zip }} {{ house.location.city }}
                </p>
              </div>
              <div class="icons">
                <img
                  src="../assets/ic_price@3x.png"
                  class="iconImages"
                  width="15px"
                />
                <p class="no-margin primary-element iconText">
                  {{ house.price.toLocaleString("de-DE") }}
                </p>
                <img
                  class="iconImages"
                  src="../assets/ic_size@3x.png"
                  width="15px"
                  alt="Size icon"
                />
                <p class="iconText">{{ house.size }}</p>
                <img
                  class="iconImages"
                  src="../assets/ic_construction_date@3x.png"
                  width="15px"
                  alt="Size icon"
                />
                <p class="iconText">Built in {{ house.constructionYear }}</p>
              </div>

              <div class="icons">
                <img
                  class="iconImages"
                  src="../assets/ic_bed@3x.png"
                  width="15px"
                  alt="Bedroom icon"
                />
                <p class="iconText">{{ house.rooms.bedrooms }}</p>
                <img
                  class="iconImages"
                  src="../assets/ic_bath@3x.png"
                  width="15px"
                  alt="Bathroom icon"
                />
                <p class="iconText">{{ house.rooms.bathrooms }}</p>
                <img
                  class="iconImages"
                  src="../assets/ic_garage@3x.png"
                  width="15px"
                  alt="Size icon"
                />
                <p class="iconText">{{ house.hasGarage ? "Yes" : "No" }}</p>
              </div>
              <!-- Add more properties as needed -->
            </div>
            <p class="body-text padding">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div id="recommendations">
          <h2 class="header-2 no-margin" id="recommendationsHeader">
            Recommended for you
          </h2>
          <Fetch :limit="3" />
        </div>
      </div>

      <!-- <div class="row">
          <div class="col-12">
            <h1>Details</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p>House ID: {{ houseId }}</p>
            <p>House Name: {{ house.location.street }}</p>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Fetch from "./Fetch.vue";
import BackButton from "./BackButton.vue";

export default {
  props: ["houseId"],
  components: {
    Fetch,
    BackButton,
  },
  setup(props) {
    const store = useStore();

    const house = computed(() => {
      console.log(props.houseId);
      return store.state.houses.find(
        (house) => house.id === Number(props.houseId)
      );
    });

    return {
      house,
    };
  },
};
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
  align-items: baseline; /* optional, to align items vertically in the center */
  justify-content: space-between;
}

@media (max-width: 768px) {
  .house-image {
    width: 100%;
  }
  .house-info {
    width: 100%;
  }
}

#house-title {
  margin-top: 15px;
}

/* img, div {
  margin: 0;
  padding: 0;
} */

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
  min-height: 100%;
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
  margin-right: 5px;
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
