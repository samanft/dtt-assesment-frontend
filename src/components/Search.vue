<template>
  <input
    type="search"
    v-model="searchQuery"
    class="tertiary-1 secondary empty-state-message"
    id="houseSearch"
    placeholder="Search for a house"
    :style="{ backgroundImage: `url(${searchIcon})` }"
  />
</template>

<script setup>
import { ref, watchEffect, defineEmits } from 'vue';
import searchIcon from '../assets/ic_search@3x.png';

const searchQuery = ref('');

const emit = defineEmits(['updateSearchQuery']);

watchEffect(() => {
  emit('updateSearchQuery', searchQuery.value);
});

defineExpose({
  searchQuery,
  searchIcon,
});
</script>

<style scoped>
input {
  background-repeat: no-repeat;
  background-position: 15px center; /* Adjust the first value to move the image further from the left edge */
  background-size: 20px;
  text-indent: 30px; /* Add indentation to the text */
}

/* @media (max-width: 768px) {
  #houseSearch {
    margin-bottom: 20px;
  }
} */
</style>