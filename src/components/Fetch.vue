<template>
  <div v-if="houses && houses.length">
    <div v-for="(house, index) in houses" :key="index">
      <router-link :to="`/details/${house.id}`">
        <div class="house-card background-2">
          <div class="leftSide">
            <img :src="house.image" alt="House image" class="house-image" />
            <div class="additionalInfo">
              <p class="header-2">
                {{ house.location.street }} {{ house.location.houseNumber
                }}{{ house.location.houseNumberAddition }}
              </p>
              <p>€ {{ house.price.toLocaleString("de-DE") }}</p>
              <p>{{ house.location.zip }} {{ house.location.city }}</p>
              <div class="leftSide">
                <p>{{ house.rooms.bedrooms }}</p>
                <p>{{ house.rooms.bathrooms }}</p>
                <p>{{ house.size }}</p>
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

export default {
  props: ["searchQuery", "selectedButton"],
  setup(props) {
    const houses = ref(null);
    const api_key = "8pMUHx6Ddyk4hZYt9lBwKzTFmENPvsbW"; // Replace with your actual API key

    const fetchHouses = async () => {
      const response = await fetch("https://api.intern.d-tt.nl/api/houses", {
        headers: {
          "X-Api-Key": api_key,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      houses.value = await response.json();
      console.log(houses.value);
    };

    onMounted(fetchHouses);

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

      console.log(result);

      if (props.selectedButton === "price" && houses.value) {
        console.log("price");
        // console.log(result.sort((a, b) => a.price - b.price));
        result = result.sort((a, b) => a.price - b.price);
      } else if (props.selectedButton === "size" && houses.value) {
        console.log("size");
        result = result.sort((a, b) => a.size - b.size);
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
