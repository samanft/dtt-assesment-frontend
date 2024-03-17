<template>
  <!-- Navigation bar -->
  <nav class="background-2">
    <ul>
      <!-- Logo -->
      <li><img width="100px" :src="logo" /></li>
      <!-- Houses link -->
      <li>
        <router-link
          class="secondary primary-element"
          :class="(lastClicked !== 'about' && $route.path !== '/about') || $route.path === '/' ? 'desktop-header-active-menu' : 'desktop-header-inactive-menu'"
          to="/"
          @click.native="updateLastClicked('houses')"  <!-- Update last clicked link -->
          >Houses</router-link
        >
      </li>
      <!-- About link -->
      <li>
        <router-link
        class="secondary primary-element" 
        :class="$route.path === '/about' ? 'desktop-header-active-menu' : 'desktop-header-inactive-menu'"
        to="/about" 
        @click.native="updateLastClicked('about')"  <!-- Update last clicked link -->
          >About</router-link
        >
      </li>
      <!-- Dark mode toggle -->
      <li>
        <DarkMode />
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref } from "vue";
import logoSrc from "../assets/img_logo_dtt@3x.png";
import DarkMode from "./DarkMode.vue";

export default {
  components: {
      DarkMode,  // Register DarkMode component
    },
  setup() {
    // Logo source
    const logo = ref(logoSrc);

    // Last clicked link
    const lastClicked = ref(null);

    // Function to update last clicked link
    const updateLastClicked = (link) => {
      console.log(link);
      lastClicked.value = link;
    };

    return {
      logo,
      lastClicked,
      updateLastClicked,
    };
  },
};
</script>

<style>
/* Styles for the list */
ul {
  list-style-type: none;
  margin: 0 auto;
  padding-left: 0;
  padding-right: 0;
  display: flex;
  align-items: center;
  justify-content: start;
  max-width: 1024px;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Styles for the list items */
li {
  display: inline;
  margin-right: 50px;
}
</style>