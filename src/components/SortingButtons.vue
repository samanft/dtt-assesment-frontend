<template>
  <button
    class="buttons-and-tabs leftButton"
    :class="{
      'primary-background': selectedButton === 'price',
      'tertiary-2': selectedButton !== 'price',
    }"
    @click="updateSelectedButton('price')"
  >
    Price
  </button>
  <button
  class="buttons-and-tabs middleButton"
  :class="{
    'primary-background': selectedButton === 'alphabetical',
    'tertiary-2': selectedButton !== 'alphabetical',
  }"
  @click="updateSelectedButton('alphabetical')"
  >
  Alphabetical
  </button>
  <button
    class="buttons-and-tabs rightButton"
    :class="{
      'primary-background': selectedButton === 'size',
      'tertiary-2': selectedButton !== 'size',
    }"
    @click="updateSelectedButton('size')"
  >
    Size
  </button>
</template>

<script>
import { ref } from "vue";

export default {
  emits: ["updateSelectedButton"],
  setup(props, { emit }) {
    const selectedButton = ref("price");

    const updateSelectedButton = (button) => {
      selectedButton.value = button;
      emit("updateSelectedButton", button);
    };

    return {
      selectedButton,
      updateSelectedButton,
    };
  },
};
</script>

<style scoped>
.leftButton {
  border: none;
  padding: 10px 20px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.rightButton {
  border: none;
  padding: 10px 20px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.middleButton {
  border-top: none;
  border-bottom: none;
  border-left: 1px solid black;
  border-right: 1px solid black;
  padding: 10px 20px;
}
</style>
