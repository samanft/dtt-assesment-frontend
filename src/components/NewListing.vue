<template>
    <form class="parent">
      <div class="div1">
        <label for="streetName">Street Name:</label>
        <input id="streetName" v-model="house.streetName" type="text" />
      </div>
      <div class="div2">
        <label for="houseNumber">House Number:</label>
        <input id="houseNumber" v-model="house.houseNumber" type="text" />
      </div>
      <div class="div3">
        <label for="addition">Addition (Optional):</label>
        <input id="addition" v-model="house.addition" type="text" />
      </div>
      <div class="div4">
        <label for="postalCode">Postal Code:</label>
        <input id="postalCode" v-model="house.postalCode" type="text" />
      </div>
      <div class="div5">
        <label for="city">City:</label>
        <input id="city" v-model="house.city" type="text" />
      </div>
      <div class="div6">
        <label for="image">Image:</label>
        <input id="image" v-model="house.image" type="text" />
      </div>
      <div class="div7">
        <label for="price">Price:</label>
        <input id="price" v-model="house.price" type="number" />
      </div>
      <div class="div8">
        <label for="size">Size:</label>
        <input id="size" v-model="house.size" type="number" />
      </div>
      <div class="div9">
        <label for="garage">Garage:</label>
        <input id="garage" v-model="house.garage" type="checkbox" />
      </div>
      <div class="div10">
        <label for="bedroom">Bedroom:</label>
        <input id="bedroom" v-model="house.bedroom" type="number" />
      </div>
      <div class="div11">
        <label for="bathrooms">Bathrooms:</label>
        <input id="bathrooms" v-model="house.bathrooms" type="number" />
      </div>
      <div class="div12">
        <label for="constructionDate">Construction Date:</label>
        <input id="constructionDate" v-model="house.constructionDate" type="date" />
      </div>
      <div class="div13">
        <label for="description">Description:</label>
        <textarea id="description" v-model="house.description"></textarea>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        house: {
          streetName: '',
          houseNumber: '',
          addition: '',
          postalCode: '',
          city: '',
          image: '',
          price: '',
          size: '',
          garage: false,
          bedroom: '',
          bathrooms: '',
          constructionDate: '',
          description: '',
        },
      };
    },
  };
  </script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 2 / 3;
}
.div2 {
  grid-area: 2 / 1 / 3 / 2;
}
.div3 {
  grid-area: 2 / 2 / 3 / 3;
}
.div4 {
  grid-area: 3 / 1 / 4 / 3;
}
.div5 {
  grid-area: 4 / 1 / 5 / 3;
}
.div6 {
  grid-area: 5 / 1 / 6 / 3;
}
.div7 {
  grid-area: 6 / 1 / 7 / 3;
}
.div8 {
  grid-area: 7 / 1 / 8 / 2;
}
.div9 {
  grid-area: 7 / 2 / 8 / 3;
}
.div10 {
  grid-area: 8 / 1 / 9 / 2;
}
.div11 {
  grid-area: 8 / 2 / 9 / 3;
}
.div12 {
  grid-area: 9 / 1 / 10 / 3;
}
.div13 {
  grid-area: 10 / 1 / 11 / 3;
}

form {
    width: 50%
}
</style>
