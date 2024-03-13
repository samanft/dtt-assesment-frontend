<template>
  <div class="background-1">
    <div class="container">
      <div class="flex-1">
        <h1 class="header-1 no-margin" id="housesHeader">Houses</h1>
        <router-link
          :to="{ path: '/newlisting'}"
          class="button primary-background buttons-and-tabs"
          id="createNewButtonDesktop"
        >
          <img
            id="plusIcon"
            src="../assets/ic_plus_white@3x.png"
            alt="Add house"
          />
          Create new
        </router-link>

        <router-link to="/newlisting" id="createNewButtonMobile">
          <img
            id="plusIconMobile"
            src="../assets/ic_plus_grey@3x.png"
            width="30px"
            alt="Add house"
          />
        </router-link>
      </div>
      <div class="flex-2">
        <Search @updateSearchQuery="searchQuery = $event" />

        <div>
          <SortingButtons @updateSelectedButton="selectedButton = $event" />
          <Filter @updateFilter="updateFilter($event)" />
        </div>
      </div>
      <Fetch :searchQuery="searchQuery" :selectedButton="selectedButton" :minPrice="minPrice" :maxPrice="maxPrice" />
    </div>
  </div>
</template>

<script>
import Fetch from "./Fetch.vue";
import { ref } from "vue";
import Search from "./Search.vue";
import SortingButtons from "./SortingButtons.vue";
import Filter from "./Filter.vue";

export default {
  components: {
    Fetch,
    Search,
    SortingButtons,
    Filter,
  },
  setup() {
    const selectedButton = ref("price");
    const searchQuery = ref("");
    const minPrice = ref(0); // Define minPrice
    const maxPrice = ref(10000000); // Define maxPrice

    const updateFilter = ({ minValue, maxValue }) => {
      console.log('updateFIlter called with', minValue, maxValue)
      minPrice.value = minValue;
      maxPrice.value = maxValue;

    };

    return {
      selectedButton,
      searchQuery,
      minPrice, // Return minPrice
      maxPrice, // Return maxPrice
      updateFilter, // Return updateFilter
    };
  },
};
</script>
<style scoped>
.flex-1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.flex-2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 50px;
}

@media (max-width: 768px) {
  .flex-2 {
    flex-direction: column;
  }
}

input {
  border: none;
  padding: 10px 20px;
}

.button {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.background-1 {
  min-height: 100vh;
}

#plusIcon {
  width: 20px;
  margin-right: 15px;
}

@media (max-width: 768px) {
  #createNewButtonDesktop {
    display: none;
  }
}

@media (min-width: 768px) {
  #createNewButtonMobile {
    display: none;
  }
}

@media (max-width: 768px) {
  #housesHeader {
    margin: auto;
  }
}
@media (max-width: 768px) {
  .container {
    width: 90%;
  }
}
</style>
