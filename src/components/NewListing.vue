<template>
  <div class="background-image">
    <div class="container">
      <form class="parent">
        <div class="div1">
          <label class="input-field-title" for="streetName">Street Name:</label>
          <input
            placeholder="Enter the street name"
            id="streetName"
            v-model="house.streetName"
            type="text"
          />
        </div>
        <div class="div2">
          <label class="input-field-title" for="houseNumber"
            >House Number:</label
          >
          <input
            placeholder="Enter the house number"
            id="houseNumber"
            v-model="house.houseNumber"
            type="text"
          />
        </div>
        <div class="div3">
          <label class="input-field-title" for="addition"
            >Addition (Optional):</label
          >
          <input
            placeholder="e.g. A"
            id="addition"
            v-model="house.addition"
            type="text"
          />
        </div>
        <div class="div4">
          <label class="input-field-title" for="postalCode">Postal Code:</label>
          <input
            placeholder="e.g 1000 AA"
            id="postalCode"
            v-model="house.postalCode"
            type="text"
          />
        </div>
        <div class="div5">
          <label class="input-field-title" for="city">City:</label>
          <input
            placeholder="e.g Utrecht"
            id="city"
            v-model="house.city"
            type="text"
          />
        </div>
        <div class="div6">
          <label class="input-field-title" for="image"
            >Upload Picture (PNG or JPG)*</label
          >
          <label for="image">
            <img src="../assets/ic_upload@3x.png" id="uploadIcon" height="100%" alt="Upload Image" />
          </label>
          <input
            id="image"
            type="file"
            accept=".png, .jpg, .jpeg"
            @change="onFileChange"
            style="display: none"
          />
        </div>
        <div class="div7">
          <label class="input-field-title" for="price">Price:</label>
          <input
            placeholder="e.g. €150.000"
            id="price"
            v-model="house.price"
            type="number"
          />
        </div>
        <div class="div8">
          <label class="input-field-title" for="size">Size:</label>
          <input
            placeholder="e.g. 60m2"
            id="size"
            v-model="house.size"
            type="number"
          />
        </div>
        <div class="div9">
          <label class="input-field-title" for="garage">Garage:</label>
          <input
            placeholder="Select"
            id="garage"
            v-model="house.garage"
            type="checkbox"
          />
        </div>
        <div class="div10">
          <label class="input-field-title" for="bedroom">Bedroom:</label>
          <input
            placeholder="Enter amount"
            id="bedroom"
            v-model="house.bedroom"
            type="number"
          />
        </div>
        <div class="div11">
          <label class="input-field-title" for="bathrooms">Bathrooms:</label>
          <input
            placeholder="Enter amount"
            id="bathrooms"
            v-model="house.bathrooms"
            type="number"
          />
        </div>
        <div class="div12">
          <label class="input-field-title" for="constructionDate"
            >Construction Date:</label
          >
          <input
            id="constructionDate"
            v-model="house.constructionDate"
            type="date"
          />
        </div>
        <div class="div13">
          <label class="input-field-title" for="description"
            >Description:</label
          >
          <textarea
            rows="7"
            placeholder="Enter description"
            id="description"
            v-model="house.description"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      house: {
        streetName: "",
        houseNumber: "",
        addition: "",
        postalCode: "",
        city: "",
        image: "",
        price: "",
        size: "",
        garage: false,
        bedroom: "",
        bathrooms: "",
        constructionDate: "",
        description: "",
      },
    };
  },
};
</script>

<style scoped>
input:not([type="submit"]),
textarea {
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
}

input, #uploadIcon, textarea {
  margin-top: 5px;
}

label {
  display: block;
}

.background-image {
  background-image: url("../assets/img_background@3x.png");
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
grid-template-rows: repeat(4, 1fr) 3fr repeat(4, 1fr) 3fr;
  grid-gap: 10px;
}

* {
  box-sizing: border-box;
}

.div1 { grid-area: 1 / 1 / 2 / 3; }
.div2 { grid-area: 2 / 1 / 3 / 2; }
.div3 { grid-area: 2 / 2 / 3 / 3; }
.div4 { grid-area: 3 / 1 / 4 / 3; }
.div5 { grid-area: 4 / 1 / 5 / 3; }
.div6 { grid-area: 5 / 1 / 6 / 3; }
.div7 { grid-area: 6 / 1 / 7 / 3; }
.div8 { grid-area: 7 / 1 / 8 / 2; }
.div9 { grid-area: 7 / 2 / 8 / 3; }
.div10 { grid-area: 8 / 1 / 9 / 2; }
.div11 { grid-area: 8 / 2 / 9 / 3; }
.div12 { grid-area: 9 / 1 / 10 / 3; }
.div13 { grid-area: 10 / 1 / 11 / 3; }


form {
  width: 50%;
}

#uploadIcon {
    cursor: pointer;
    border: 2px dashed #4a4b4c;
    padding: 60px;
}
</style>
