<template>
  <router-link to="/" class="align-center" id="back-button">
    <img id="back-arrow" src="../assets/ic_back_grey@3x.png" alt="Back arrow" />
    <div class="back-button-label-desktop" id="back-button-text">Back to overview</div>
  </router-link>
  <router-link to="/" class="align-center" id="back-button-mobile">
    <img id="back-arrow" src="../assets/ic_back_grey@3x.png" alt="Back arrow" />
    </router-link>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BackButton',
});
</script>

<style scoped>
#back-arrow {
    width: 20px;
}

#back-button-text {
    margin-left: 10px;
}

.align-center {
  display: flex;
  align-items: center;
}

#back-button {
    margin-bottom: 40px;
}

@media (max-width: 768px) {
    #back-button {
        display: none;
    }
}

@media (min-width: 768px) {
    #back-button-mobile {
        display: none;
    }
}

#back-button-mobile {
    z-index: 1; /* adjust as needed */
    position: absolute;
    top: 40px;
    left: 5%;
}
</style>

