<template>
  <!-- Modal container -->
  <div class="modal">
    <!-- Modal content -->
    <div class="modal-content" style="text-align: center">
      <!-- Modal title -->
      <h2 class="header-2">Delete listing</h2>
      <!-- Modal description -->
      <p class="body-text no-margin">Are you sure you want to delete this listing?</p>
      <p class="body-text no-margin">This action cannot be undone.</p>

      <!-- Delete button -->
      <button
        @click="deleteHouse"
        class="buttons-and-tabs primary-background"
        style="display: block; margin: auto; width: 50%; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; margin-bottom: 10px;"
      >
        YES, DELETE
      </button>
      <!-- Close modal button -->
      <button
        @click="closeModal"
        class="buttons-and-tabs secondary-background"
        style="display: block; margin: auto; width: 50%; border: none; padding: 10px 20px; border-radius: 5px;"
      >
        GO BACK
      </button>
    </div>
  </div>
</template>

<script setup>
// Importing necessary functions from Vue 3 Composition API and Vue Router
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';

// Getting the router instance
const router = useRouter();

// Function to emit custom events
const emit = defineEmits(['delete-house', 'close-modal']);

// Function to delete the house and navigate to the home page
const deleteHouse = () => {
  emit('delete-house');
  router.push('/');
};

// Function to close the modal
const closeModal = () => {
  emit('close-modal');
};
</script>

<style scoped>
/* Styles for the modal container */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

/* Styles for the modal content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* Styles for the close button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

/* Styles for the close button when hovered or focused */
.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>