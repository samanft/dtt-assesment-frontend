<template>
  <div class="background-image" :style="{ backgroundImage: `url(${backgroundImage})`}">
    <div class="container">
      <BackButton />
      <h1 class="header-1 no-margin" id="listing-header">{{ headerText }}</h1>
      <form class="parent" @submit.prevent="onSubmit">
        <div class="div1">
          <label class="input-field-title" for="streetName">Street Name:</label>
          <input
            placeholder="Enter the street name"
            id="streetName"
            v-model="house.streetName"
            type="text"
            @blur="onBlur"
          />
           <div class="error-message">{{ errorMessages.streetName }}</div>
        </div>
        <div class="div2">
          <label class="input-field-title" for="houseNumber"
            >House Number:</label
          >
          <input
            placeholder="Enter the house number"
            id="houseNumber"
            v-model="house.houseNumber"
            type="number"
            @blur="onBlur"
          />
           <div class="error-message">{{ errorMessages.houseNumber }}</div>
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
            @blur="onBlur"
          />
           <div class="error-message">{{ errorMessages.postalCode }}</div>
        </div>
        <div class="div5">
          <label class="input-field-title" for="city">City:</label>
          <input
            placeholder="e.g Utrecht"
            id="city"
            v-model="house.city"
            type="text"
            @blur="onBlur"
          />
           <div class="error-message">{{ errorMessages.city }}</div>
        </div>
        <div class="div6">
          <label class="input-field-title" for="image"
            >Upload Picture (PNG or JPG)*</label
          >
          <label for="image">
            <img
              src="../assets/ic_upload@3x.png"
              id="uploadIcon"
              height="100%"
              alt="Upload Image"
            />
          </label>
          <input
            id="image"
            type="file"
            accept=".png, .jpg, .jpeg"
            @change="onFileChange"
            style="display: none"
            @blur="onBlur"
          />
        </div>
        <div class="div7">
          <label class="input-field-title" for="price">Price:</label>
          <input
            placeholder="e.g. €150.000"
            id="price"
            v-model="house.price"
            type="number"
            @blur="onBlur"
          />
           <div class="error-message">{{ errorMessages.price }}</div>
        </div>
        <div class="div8">
          <label class="input-field-title" for="size">Size:</label>
          <input
            placeholder="e.g. 60m2"
            id="size"
            v-model="house.size"
            type="number"
            @blur="onBlur"
          />
           <div class="error-message">{{ errorMessages.size }}</div>
        </div>
        <div class="div9">
          <label class="input-field-title" for="garage">Garage:</label>
          <select v-model="house.garage">
            <option value="" selected disabled hidden>Choose here</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="div10">
          <label class="input-field-title" for="bedroom">Bedroom:</label>
          <input
            placeholder="Enter amount"
            id="bedroom"
            v-model="house.bedroom"
            type="number"
            @blur="onBlur"
          />
           <div class="error-message">{{ errorMessages.bedroom }}</div>
        </div>
        <div class="div11">
          <label class="input-field-title" for="bathrooms">Bathrooms:</label>
          <input
            placeholder="Enter amount"
            id="bathrooms"
            v-model="house.bathrooms"
            type="number"
            @blur="onBlur"
          />
           <div class="error-message">{{ errorMessages.bathrooms }}</div>
        </div>
        <div class="div12">
          <label class="input-field-title" for="constructionDate"
            >Construction Date:</label
          >
          <input
            id="constructionDate"
            v-model="house.constructionDate"
            type="date"
            @blur="onBlur"
          />
           <div class="error-message">{{ errorMessages.constructionDate }}</div>
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
            @blur="onBlur"
          />
           <div class="error-message">{{ errorMessages.description }}</div>
        </div>
        <div class="div14">
          <button
            :disabled="!isFormFilled"
            :class="{ transparent: !isFormFilled }"
            class="buttons-and-tabs primary-background"
            type="submit"
          >
            POST
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import BackButton from './BackButton.vue';
import backgroundImageDark from '../assets/house_dark.jpg';
import backgroundImageLight from '../assets/img_background@3x.png';

const props = defineProps({
  houseId: {
    type: String,
    default: null,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const store = useStore();
const house = ref({
  streetName: '',
  houseNumber: '',
  addition: '',
  postalCode: '',
  city: '',
  price: '',
  size: '',
  garage: '',
  bedroom: '',
  bathrooms: '',
  constructionDate: '',
  description: '',
});

const isDark = useDark();

const backgroundImage = computed(() => {
  return isDark.value ? backgroundImageDark : backgroundImageLight;
});

onMounted(async () => {
  if (props.houseId) {
    await store.dispatch('fetchHouseById', props.houseId);
    const fetchedHouse = store.state.house;
    house.value = {
      streetName: fetchedHouse.location.street,
      houseNumber: fetchedHouse.location.houseNumber,
      addition: fetchedHouse.location.houseNumberAddition,
      postalCode: fetchedHouse.location.zip,
      city: fetchedHouse.location.city,
      image: fetchedHouse.image,
      price: fetchedHouse.price,
      size: fetchedHouse.size,
      garage: fetchedHouse.hasGarage ? 'Yes' : 'No',
      bedroom: fetchedHouse.rooms.bedrooms,
      bathrooms: fetchedHouse.rooms.bathrooms,
      constructionDate: fetchedHouse.createdAt,
      description: fetchedHouse.description,
    };
  }
});

let file = null;
const onFileChange = (e) => {
  file = e.target.files[0];
  house.value.image = file.name;
};

// Change errorMessage to an object
let errorMessages = ref({
  streetName: '',
  houseNumber: '',
  postalCode: '',
  city: '',
  price: '',
  size: '',
  bedroom: '',
  bathrooms: '',
  constructionDate: '',
  description: '',
});

const onBlur = (event) => {
  const fieldName = event.target.id; // Use the id to identify the field
  if (event.target.value === '') {
    event.target.style.border = '1px solid red';
    errorMessages.value[fieldName] = 'Input field required.'; // Set error for specific field
  } else {
    event.target.style.border = 'none';
    errorMessages.value[fieldName] = ''; // Clear error for specific field
  }
};



const isFormFilled = computed(() => {
  let validationHouse = { ...house.value };
  delete validationHouse.addition;
  return Object.values(validationHouse).every((value) => value !== '');
});

const headerText = computed(() => {
  return props.isEditing ? 'Edit listing' : 'New listing';
});

const onSubmit = async () => {
  var myHeaders = new Headers();
      myHeaders.append("X-Api-Key", "8pMUHx6Ddyk4hZYt9lBwKzTFmENPvsbW");

      var formdata = new FormData();
      formdata.append("price", house.value.price);
      formdata.append("bedrooms", house.value.bedroom);
      formdata.append("bathrooms", house.value.bathrooms);
      formdata.append("size", house.value.size);
      formdata.append("streetName", house.value.streetName);
      formdata.append("houseNumber", house.value.houseNumber);
      formdata.append("numberAddition", house.value.addition);
      formdata.append("zip", house.value.postalCode);
      formdata.append("city", house.value.city);
      formdata.append(
        "constructionYear",
        new Date(house.value.constructionDate).getFullYear()
      );
      formdata.append(
        "hasGarage",
        house.value.garage === "Yes" ? "true" : "false"
      );
      formdata.append("description", house.value.description);
      //   formdata.append("image", fileInput.value.files[0]);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      console.log("houseId:", props.houseId);
      console.log(
        "URL:",
        `https://api.intern.d-tt.nl/api/houses${
          props.houseId ? `/${props.houseId}` : ""
        }`
      );

      fetch(
        `https://api.intern.d-tt.nl/api/houses${
          props.houseId ? `/${props.houseId}` : ""
        }`,
        requestOptions
      )
        .then((response) => {
          console.log(response);
          if (props.houseId) {
            return response.text();
          } else {
            return response.json();
          }
        })
        .then((result) => {
          console.log(result);
          // Extract houseId from the result
          const houseId = result.id ? result.id : props.houseId; // Replace 'id' with the actual property name if it's different
          console.log(houseId); // Log the houseId (for debugging purposes)
          // Set up the headers and form data for the second request
          var myHeaders = new Headers();
          myHeaders.append("X-Api-Key", "8pMUHx6Ddyk4hZYt9lBwKzTFmENPvsbW");

          var formdata = new FormData();
          formdata.append("image", file);

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
          };

          // Make the second fetch request
          return fetch(
            `https://api.intern.d-tt.nl/api/houses/${houseId}/upload`,
            requestOptions
          );
        })
        .then((response) => {
          console.log(response);
          return response.text();
        })
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      router.push("/");
};

// No return statement is needed. All reactive states, computed properties, and methods are directly usable in the template.
</script>

<style scoped>
input:not([type="submit"]),
textarea,
button,
select {
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
  resize: none;
}

@media (max-width: 768px) {
  .container {
    display: flex;
    justify-content: center;
  }
  form {
    width: 90%;
  }
}

.error-message {
  margin-top: 10px;
}

#listing-header {
  margin-bottom: 40px;
}

input,
#uploadIcon,
textarea,
select {
  margin-top: 5px;
}

label {
  display: block;
}

.background-image {
  background-image: url("../assets/img_background@3x.png");
  background-size: cover;
  background-position: center;
  height: 100%;
}

.parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr) 2fr repeat(4, 1fr) 2fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
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
.div14 {
  grid-area: 11 / 2 / 12 / 3;
}

.container {
  align-items: center;
  flex-direction: column;
}

/* .buttons-and-tabs {
  opacity: 0.5;
} */

.transparent {
  opacity: 0.5;
}

* {
  box-sizing: border-box;
}

@media (min-width: 768px) {
  form {
    width: 50%;
  }
}

#uploadIcon {
  cursor: pointer;
  border: 2px dashed #4a4b4c;
  padding: 10px;
}
</style>
