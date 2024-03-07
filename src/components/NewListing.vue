<template>
  <div class="background-image">
    <div class="container">
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
            @blur="onBlur"
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

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from 'vuex';

export default {
  props: {
    houseId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const store = useStore();

    const house = ref({
      streetName: "",
      houseNumber: "",
      addition: "",
      postalCode: "",
      city: "",
      image: "",
      price: "",
      size: "",
      garage: "",
      bedroom: "",
      bathrooms: "",
      constructionDate: "",
      description: "",
    });

    onMounted(async () => {
    if (props.houseId) {
      console.log(props.houseId)
      await store.dispatch('fetchHouseById', props.houseId);
      const fetchedHouse = store.state.house;
      console.log(fetchedHouse); // Log the fetched house object (for debugging purposes
      house.value = {
        streetName: fetchedHouse.location.street,
        houseNumber: fetchedHouse.location.houseNumber,
        addition: fetchedHouse.location.houseNumberAddition,
        postalCode: fetchedHouse.location.zip,
        city: fetchedHouse.location.city,
        image: fetchedHouse.image,
        price: fetchedHouse.price,
        size: fetchedHouse.size,
        garage: fetchedHouse.hasGarage ? "Yes" : "No",
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
      house.value.image = file.name; // Update house.image with the name of the selected file
    };

    const onBlur = (event) => {
      if (event.target.value === "") {
        console.log("empty");
        event.target.style.border = "1px solid red";
      } else {
        console.log("not empty");
        event.target.style.border = "none"; // Reset to default color when there is a value
      }
    };

    const isFormFilled = computed(() => {
      // Check if all fields in house are filled out
      const formFilled = Object.values(house.value).every(
        (value) => value !== ""
      );
      console.log(formFilled); // Log the result
      return formFilled;
    });

    // const fileInput = ref(null);

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

      fetch(`https://api.intern.d-tt.nl/api/houses${props.houseId ? `/${props.houseId}` : ''}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          // Extract houseId from the result
          const houseId = result.id; // Replace 'id' with the actual property name if it's different

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
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    };

    return {
      house,
      onFileChange,
      isFormFilled,
      onBlur,
      onSubmit,
    };
  },
};
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

/* .buttons-and-tabs {
  opacity: 0.5;
} */

.transparent {
  opacity: 0.5;
}

* {
  box-sizing: border-box;
}

form {
  width: 50%;
}

#uploadIcon {
  cursor: pointer;
  border: 2px dashed #4a4b4c;
  padding: 10px;
}
</style>
