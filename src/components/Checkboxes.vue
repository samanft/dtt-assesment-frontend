<template>
  <div id="checkboxes">
    <label class="custom-checkbox listing-information"
      >Made by me
      <input type="checkbox" v-model="madeByMe" @change="updateMadeByMe" checked />
      <span class="checkmark"></span>
    </label>
    <label class="custom-checkbox listing-information"
      >Not made by me
      <input type="checkbox" v-model="notMadeByMe" @change="updateNotMadeByMe" checked />
      <span class="checkmark"></span>
    </label>
  </div>
  </template>

<style scoped>
.custom-checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
}

#checkboxes {
  margin-top: 30px;
}

/* Hide the default checkbox */
.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom checkmark/indicator */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border: 1px solid #ddd; /* Grey border */
}

/* When the checkbox is checked, add a red background */
.custom-checkbox input:checked ~ .checkmark {
  background-color: #ff4136; /* Red background */
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.custom-checkbox .checkmark:after {
  left: 9px;
  top: 5px;
  width: 7px;
  height: 13px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  madeByMe: Boolean,
  notMadeByMe: Boolean
});

const madeByMe = ref(props.madeByMe);
const notMadeByMe = ref(props.notMadeByMe);

const emit = defineEmits(['update:madeByMe', 'update:notMadeByMe']);

const updateMadeByMe = () => {
  emit('update:madeByMe', madeByMe.value);
};

const updateNotMadeByMe = () => {
  emit('update:notMadeByMe', notMadeByMe.value);
};
</script>

