<template>
  <div class="background-1">
    <div class="container">
      <div class="flex-1">
        <p class="header-1">Houses</p>
        <button class="button primary-background buttons-and-tabs">Create new</button>
      </div>
      <div class="flex-1">
        <Search @updateSearchQuery="searchQuery = $event" />

        <div>
          <SortingButtons @updateSelectedButton="selectedButton = $event" />
        </div>
      </div>
      <Fetch :searchQuery="searchQuery" :selectedButton="selectedButton"/>

    </div>
     
  </div>
</template>

<script>
import Fetch from './Fetch.vue';
import { ref } from 'vue';
import Search from './Search.vue';
import SortingButtons from './SortingButtons.vue';

export default {
  components: {
    Fetch,
    Search,
    SortingButtons
},
  setup() {
    const selectedButton = ref('price');
    const searchQuery = ref('');

    return {
      selectedButton,
      searchQuery,
    };
  },
};
</script>
<style scoped>
.container {
  max-width: 768px;
  margin: 0 auto;
}

.flex-1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

input {
    border: none;
    padding: 10px 20px;
}

.button {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}

.background-1 {
  min-height: 100vh;
}
</style>
