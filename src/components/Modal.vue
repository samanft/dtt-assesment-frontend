<template>
    <div class="modal">
      <div class="modal-content" style="text-align: center">
        <h2 class="header-2">Delete listing</h2>
        <p class="body-text no-margin">Are you sure you want to delete this listing?</p>
        <p class="body-text no-margin">This action cannot be undone.</p>
  
        <button
          @click="deleteHouse"
          class="buttons-and-tabs primary-background"
          style="display: block; margin: auto; width: 50%; border: none; padding: 10px 20px; border-radius: 5px;"
        >
          YES, DELETE
        </button>
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
  
  <script>
  export default {
    methods: {
      deleteHouse() {
        this.$emit('delete-house');
      },
      closeModal() {
        this.$emit('close-modal');
      },
    },
  };
  </script>

<style scoped>
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

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>