<template>
  <!-- Container for the dark mode switch -->
  <div style="display: flex; align-items: center;">
    <!-- Label for the dark mode switch -->
    <p class="desktop-header-inactive-menu" style="margin-right: 20px;">Dark Mode</p>
    <!-- Dark mode switch -->
    <label class="switch">
      <!-- Checkbox input that triggers the dark mode toggle function when clicked -->
      <input type="checkbox" @click="toggleDark()" />
      <!-- Slider for the switch -->
      <span class="slider round"></span>
    </label>
  </div>
</template>

<style scoped>
/* Styles for the switch container */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Styles for the switch input */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Styles for the switch slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

/* Styles for the switch slider before it's checked */
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

/* Styles for the switch slider when it's checked */
input:checked + .slider {
  background-color: #eb5440;
}

/* Styles for the switch slider when it's focused */
input:focus + .slider {
  box-shadow: 0 0 1px #eb5440;
}

/* Styles for the switch slider before it's checked */
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Styles for the rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>

<script setup>
// Importing necessary functions from VueUse library
import { useDark, useToggle } from "@vueuse/core";

// State for the dark mode
const isDark = useDark();
// Initially set the dark mode to false
isDark.value = false;
// Function to toggle the dark mode
const toggleDark = useToggle(isDark);
</script>