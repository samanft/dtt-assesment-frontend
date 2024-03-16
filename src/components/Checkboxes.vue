<template>
  <div id="checkboxes">
    <!-- <label class="custom-checkbox listing-information"
      >Made by me -->
      <div style="display: flex; align-items: center;">
        <input name="madeByMe" type="checkbox" v-model="madeByMe" @change="updateMadeByMe" checked />
      <label for="madeByMe" class="listing-information">Made by me</label>
      </div>

    <!-- </label> -->
    <div style="display: flex; align-items: center;">
      <input name="notMadeByMe" type="checkbox" v-model="notMadeByMe" @change="updateNotMadeByMe" checked />
      <label for="notMadeByMe" class="listing-information">Not made by me</label>
    </div>

    <!-- <label class="custom-checkbox listing-information" -->
      <!-- >Not made by me -->

    <!-- </label> -->
    <!-- <div>
    <input type="checkbox" id="scales" name="scales" checked />
    <label for="scales">Scales</label>
  </div> -->
  </div>
  </template>

<style scoped>
input {
  accent-color: #eb5440;
  width: 18px;
  height: 18px;
}

label {
  margin-left: 5px;
}

#checkboxes {
  margin-top: 20px;
}

@media (max-width: 768px) {
  #checkboxes {
    margin-bottom: 20px;
  }
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
