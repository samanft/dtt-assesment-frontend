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
</style>
