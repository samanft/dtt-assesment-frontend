<template>
  <div class="background-1">
    <div class="container">
      <div class="flex">
        <div class="background-2">
          <img
            class="house-image "
            :src="house.image"
            :alt="house.location.street"
          />
          <div class="house-image">
            <h1>{{ house.location.street }}</h1>
            <p>{{ house.location.city }}</p>
            <p>{{ house.location.zip }}</p>
            <p>{{ house.price }}</p>
            <p>{{ house.size }} m2</p>
            <p>
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

        <div class="full-width">
          <h2 class="header-2">Recommended for you</h2>
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

export default {
  props: ["houseId"],
  components: {
    Fetch,
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
  width: 300px;
}

/* img, div {
  margin: 0;
  padding: 0;
} */

.flex {
  display: flex;
  justify-content: space-around;
}

.background-1 {
  min-height: 100vh;
}
</style>
