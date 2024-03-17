<template>
  <!-- Main container -->
  <div class="background-1">
    <div class="container">
      <!-- Header and "Create new" button -->
      <div class="flex-1">
        <h1 class="header-1 no-margin" id="housesHeader">Houses</h1>
        <!-- "Create new" button (Desktop) -->
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
        <!-- "Create new" button (Mobile) -->
        <router-link to="/newlisting" id="createNewButtonMobile">
          <img
            id="plusIconMobile"
            src="../assets/ic_plus_grey@3x.png"
            width="30px"
            alt="Add house"
          />
        </router-link>
      </div>
      <!-- Search and filter components -->
      <div class="flex-2">
        <div>
          <!-- Search component -->
          <Search @updateSearchQuery="searchQuery = $event" />
          <!-- Checkboxes component -->
          <Checkboxes @update:madeByMe="madeByMe = $event" @update:notMadeByMe="notMadeByMe = $event" :madeByMe="true" :notMadeByMe="true"/>
        </div>
        <div>
          <!-- Sorting buttons component -->
          <SortingButtons @updateSelectedButton="selectedButton = $event" />
          <!-- Filter component -->
          <Filter @updateFilter="updateFilter($event)" />
        </div>
      </div>
      <!-- Fetch component -->
      <Fetch :searchQuery="searchQuery" :selectedButton="selectedButton" :minPrice="minPrice" :maxPrice="maxPrice" :madeByMe="madeByMe" :notMadeByMe="notMadeByMe" />
    </div>
  </div>
</template>

<script>
// Importing required components and vue functions
import Fetch from "./Fetch.vue";
import { ref } from "vue";
import Search from "./Search.vue";
import SortingButtons from "./SortingButtons.vue";
import Filter from "./Filter.vue";
import Checkboxes from "./Checkboxes.vue";

export default {
  // Registering components
  components: {
    Fetch,
    Search,
    SortingButtons,
    Filter,
    Checkboxes,
  },
  setup() {
    // State variables
    const selectedButton = ref("price"); // Default sorting button
    const searchQuery = ref(""); // Search query
    const minPrice = ref(0); // Minimum price for filter
    const maxPrice = ref(10000000); // Maximum price for filter
    const madeByMe = ref(true); // Checkbox state
    const notMadeByMe = ref(true); // Checkbox state

    // Function to update price filter
    const updateFilter = ({ minValue, maxValue }) => {
      minPrice.value = minValue; // Update minPrice
      maxPrice.value = maxValue; // Update maxPrice
    };

    // Return state variables and functions to use them in the template
    return {
      selectedButton,
      searchQuery,
      minPrice,
      maxPrice,
      updateFilter,
      madeByMe,
      notMadeByMe,
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
