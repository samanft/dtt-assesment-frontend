<template>
  <!-- Container for the checkboxes -->
  <div id="checkboxes">
    <!-- Checkbox for 'Made by me' -->
    <div style="display: flex; align-items: center;">
      <input name="madeByMe" type="checkbox" v-model="madeByMe" @change="updateMadeByMe" checked />
      <label for="madeByMe" class="listing-information">Made by me</label>
    </div>

    <!-- Checkbox for 'Not made by me' -->
    <div style="display: flex; align-items: center;">
      <input name="notMadeByMe" type="checkbox" v-model="notMadeByMe" @change="updateNotMadeByMe" checked />
      <label for="notMadeByMe" class="listing-information">Not made by me</label>
    </div>
  </div>
</template>

<style scoped>
/* Styles for the checkboxes */
input {
  accent-color: #eb5440;
  width: 18px;
  height: 18px;
}

/* Styles for the labels */
label {
  margin-left: 5px;
}

/* Styles for the checkboxes container */
#checkboxes {
  margin-top: 20px;
}

/* Styles for the checkboxes container on small screens */
@media (max-width: 768px) {
  #checkboxes {
    margin-bottom: 20px;
  }
}
</style>

<script setup>
// Importing necessary functions from Vue 3 Composition API
import { ref, defineProps, defineEmits } from 'vue';

// Defining props
const props = defineProps({
  madeByMe: Boolean,
  notMadeByMe: Boolean
});

// State for the checkboxes
const madeByMe = ref(props.madeByMe);
const notMadeByMe = ref(props.notMadeByMe);

// Function to emit custom events
const emit = defineEmits(['update:madeByMe', 'update:notMadeByMe']);

// Function to update the 'Made by me' checkbox
const updateMadeByMe = () => {
  emit('update:madeByMe', madeByMe.value);
};

// Function to update the 'Not made by me' checkbox
const updateNotMadeByMe = () => {
  emit('update:notMadeByMe', notMadeByMe.value);
};
</script>