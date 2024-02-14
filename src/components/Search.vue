<template>
    <input
      type="search"
      v-model="searchQuery"
      class="tertiary-1 secondary empty-state-message"
      placeholder="Search for a house"
    />
  </template>
  
  <script>
  import { ref, watchEffect } from 'vue';
  
  export default {
    setup(props, { emit }) {
      const searchQuery = ref('');
  
      watchEffect(() => {
        emit('updateSearchQuery', searchQuery.value);
      });
  
      return {
        searchQuery,
      };
    },
  };
  </script>