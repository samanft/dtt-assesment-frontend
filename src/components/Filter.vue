<template>
    <div class="range_container">
      <div class="form_control">
            <div class="form_control_container">
                <div class="empty-state-message">Min price</div>
                <input class="slider-value-input tertiary-1" type="number" v-model="fromSliderValue" @input="syncFromInputWithSlider" min="0" max="10000000"/>
            </div>
            <div class="form_control_container">
                <div class="empty-state-message">Max price</div>
                <input class="slider-value-input tertiary-1" type="number" v-model="toSliderValue" @input="syncToInputWithSlider" min="0" max="10000000"/>
            </div>
        </div>
        <div class="sliders_control">
            <input id="fromSlider" step="100000" type="range" v-model.number="fromSliderValue" min="0" max="10000000"/>
            <input id="toSlider" step="100000" type="range" v-model.number="toSliderValue" min="0" max="10000000"/>
        </div>

    </div>
    </template>
    

<style scoped>
.range_container {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
}

.sliders_control {
  position: relative;
}

.form_control {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  color: #635a5a;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 20px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #eb5440;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
}

/* input[type="range"]::-webkit-slider-thumb:hover {
}

input[type="range"]::-webkit-slider-thumb:active {

} */

input[type="number"] {
  color: #8a8383;
  height: 30px;
  font-size: 20px;
  border: none;
  width: 80%
}

/* input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
} */

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: #c6c6c6;
  pointer-events: none;
}

#fromSlider {
  height: 0;
  z-index: 1;
}

.slider-value-input {
  padding: 5px 10px;
  margin-top: 5px;
}
</style>

<script setup>
import { ref, watch, defineProps } from 'vue';

// Define props
const props = defineProps({
  minValue: { Number,
    default: 0
  },
  maxValue: {Number,
    default: 10000000
  },
});

const emit = defineEmits(['updateFilter']);

// Setup reactive references for both slider values
const fromSliderValue = ref(props.minValue);
const toSliderValue = ref(props.maxValue);

// Watch for changes on the fromSlider and adjust if it tries to exceed toSlider
watch(fromSliderValue, (newValue) => {
  if (newValue > toSliderValue.value) {
    fromSliderValue.value = toSliderValue.value - 100000;
  }
  emit('updateFilter', { minValue: fromSliderValue.value, maxValue: toSliderValue.value });
});

// Similarly, watch for changes on the toSlider and adjust if it goes below fromSlider
watch(toSliderValue, (newValue) => {
  if (newValue < fromSliderValue.value) {
    console.log(fromSliderValue.value, toSliderValue.value)
    toSliderValue.value = fromSliderValue.value + 100000;
  }
  emit('updateFilter', { minValue: fromSliderValue.value, maxValue: toSliderValue.value });
  console.log(toSliderValue.value)
});

// Sync the input fields with sliders
const syncFromInputWithSlider = (event) => {
  const value = Math.min(parseInt(event.target.value, 10), toSliderValue.value);
  fromSliderValue.value = isNaN(value) ? fromSliderValue.value : value;
};

const syncToInputWithSlider = (event) => {
  const value = Math.max(parseInt(event.target.value, 10), fromSliderValue.value);
  toSliderValue.value = isNaN(value) ? toSliderValue.value : value;
};
</script>