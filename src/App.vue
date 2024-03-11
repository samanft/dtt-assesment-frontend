<script setup>
import Navbar from "./components/Navbar.vue";
import MobileNav from "./components/MobileNav.vue";
</script>

<template>
  <Navbar id="navbar" />
      <router-view id="router" />
<MobileNav id="mobileNav" />
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
</template>

<!-- <style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
#router {
  padding-top: 40px;
  padding-bottom: 40px;
}

#navbar {
  display: none;
}

#mobileNav {
  display: none;
}

@media (min-width: 768px) {
  #navbar {
    display: block;
  }
}

@media (max-width: 768px) {
   #mobileNav {
    display: flex;
  }
}
</style>