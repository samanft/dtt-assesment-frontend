<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Details</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p>House ID: {{ houseId }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["houseId"],
};
</script>