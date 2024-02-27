<template>
    <nav class="background-2">
      <ul>
        <li><img width="100px" :src="logo"></li>
        <li><router-link class="secondary" active-class="desktop-header-active-menu" inactive-class="desktop-header-inactive-menu" to="/">Houses</router-link></li>
        <li><router-link class="secondary" active-class="desktop-header-active-menu" inactive-class="desktop-header-inactive-menu" to="/about">About</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  import { ref } from "vue";
  import logoSrc from "../assets/img_logo_dtt@3x.png"
  
  export default {
    setup() {
      const logo = ref(logoSrc);
      return {
        logo
      }
    }
  }
  </script>
  
  <style>
  ul {
    list-style-type: none;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
    display: flex;
    align-items: center;
    justify-content: start;
    max-width: 1024px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  li {
    display: inline;
    margin-right: 50px;
  }
  </style>