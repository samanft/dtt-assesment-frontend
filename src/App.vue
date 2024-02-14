<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <router-view />

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

.primary-background {
  background-color: #eb5440;
  color: white;
}

.primary-element {
  color: #000000;
}

.secondary-element {
  color: #4a4b4c;
}

.secondary-background {
  background-color : #4a4b4c;
}

.hyperlink {
  color: #067bc2;
}

.tertiary-1 {
  background-color: #e8e8e8;
  color: white;
}

.tertiary-2 {
  background-color: #c3c3c3;
  color: white;
}

.background-1 {
  background-color: #f6f6f6;
}

.background-2 {
  background-color: #ffffff;
}

.header-1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 32px;
}

.header-2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 22px;
}

.desktop-header-active-menu {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 18px;
}

.buttons-and-tabs {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 18px;
}

.back-button-label-desktop {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600; /* semibold */
  font-size: 16px;
}

.input-field-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600; /* semibold */
  font-size: 14px;
}

.desktop-header-inactive-menu {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500; /* medium */
  font-size: 18px;
}

.empty-state-message {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500; /* medium */
  font-size: 18px;
}

.header-1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 32px;
}

.header-2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 22px;
}

.desktop-header-active-menu {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 18px;
}

.buttons-and-tabs {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 18px;
}

.back-button-label-desktop {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600; /* semibold */
  font-size: 16px;
}

.input-field-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600; /* semibold */
  font-size: 14px;
}

.desktop-header-inactive-menu {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500; /* medium */
  font-size: 18px;
}

.empty-state-message {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500; /* medium */
  font-size: 18px;
}

.listing-information {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400; /* regular */
  font-size: 16px;

}

/* Mobile styles */
@media (max-width: 768px) {
  .header-1 {
    font-size: 18px;
  }

  .header-2 {
    font-size: 14px;
  }

  .buttons-and-tabs {
    font-size: 12px;
  }

  .input-field-title {
    font-size: 12px;
  }

  .empty-state-message {
    font-size: 14px;
  }

  .error-message {
    font-size: 12px;
  }

  .listing-information {
    font-size: 12px;
  }

  .body-text {
    font-size: 12px;
  }

  .input-field {
    font-size: 12px;
  }
}

body {
  margin: 0;
  padding: 0;
}

* {
  text-decoration: none;
}
</style>
