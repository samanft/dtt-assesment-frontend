<template>
    <!-- Desktop version of the back button -->
    <router-link to="/" class="align-center" id="back-button">
      <!-- Back arrow icon -->
      <img id="back-arrow" src="../assets/ic_back_grey@3x.png" alt="Back arrow" />
      <!-- Back button label -->
      <div class="back-button-label-desktop" id="back-button-text">Back to overview</div>
    </router-link>
  
    <!-- Mobile version of the back button -->
    <router-link to="/" class="align-center" id="back-button-mobile">
      <!-- Back arrow icon with dynamic source based on the current route -->
      <img id="back-arrow" :src="backArrowSrc" alt="Back arrow" />
    </router-link>
  </template>
  
  <script setup>
  // Importing necessary functions from Vue 3 Composition API and Vue Router
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  // Importing back arrow icons
  import backArrowWhite from '../assets/ic_back_white@3x.png';
  import backArrowGrey from '../assets/ic_back_grey@3x.png';
  
  // Getting the current route
  const route = useRoute();
  
  // Computed property for the back arrow source
  // If the current route is 'Details', use the white icon, otherwise use the grey one
  const backArrowSrc = computed(() => {
    return route.name === 'Details' ? backArrowWhite : backArrowGrey;
  });
  </script>
  
  <style scoped>
  /* Styles for the back arrow icon */
  #back-arrow {
      width: 20px;
  }
  
  /* Styles for the back button label */
  #back-button-text {
      margin-left: 10px;
  }
  
  /* Styles for centering elements */
  .align-center {
    display: flex;
    align-items: center;
  }
  
  /* Styles for the desktop back button */
  #back-button {
      margin-bottom: 40px;
  }
  
  /* Hide the desktop back button on small screens */
  @media (max-width: 768px) {
      #back-button {
          display: none;
      }
  }
  
  /* Hide the mobile back button on large screens */
  @media (min-width: 768px) {
      #back-button-mobile {
          display: none;
      }
  }
  
  /* Styles for the mobile back button */
  #back-button-mobile {
      z-index: 1; /* adjust as needed */
      position: absolute;
      top: 40px;
      left: 5%;
  }
  </style>