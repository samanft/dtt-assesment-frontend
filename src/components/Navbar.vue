<template>
  <nav class="background-2">
    <ul>
      <li><img width="100px" :src="logo" /></li>
      <li>
        <router-link
          class="secondary primary-element"
          :class="(lastClicked !== 'about' && $route.path !== '/about') || $route.path === '/' ? 'desktop-header-active-menu' : 'desktop-header-inactive-menu'"
          to="/"
          @click.native="updateLastClicked('houses')"
          >Houses</router-link
        >
      </li>
      <li>
        <router-link
        class="secondary primary-element" 
        :class="$route.path === '/about' ? 'desktop-header-active-menu' : 'desktop-header-inactive-menu'"
        to="/about" 
        @click.native="updateLastClicked('about')"  
          >About</router-link
        >
      </li>
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
      DarkMode,
    },
  setup() {

    const logo = ref(logoSrc);

    const lastClicked = ref(null);

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

li {
  display: inline;
  margin-right: 50px;
}
</style>
