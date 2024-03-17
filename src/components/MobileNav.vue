<template>
    <!-- Container for the mobile navigation -->
    <div class="mobile-nav background-2">
      <!-- Home icon -->
      <div class="icon">
        <img src="../assets/ic_mobile_navigarion_home@3x.png" alt="Home icon" width="30px" />
      </div>
      <!-- Info icon -->
      <div class="icon">
        <img src="../assets/ic_mobile_navigarion_info@3x.png" alt="Info icon" width="30px" />
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Styles for the mobile navigation container */
  .mobile-nav {
    position: fixed; /* Positioning at the bottom of the screen */
    bottom: 0;
    left: 0;
    width: 100%; /* Full width */
    display: flex; /* Using Flexbox for layout */
    justify-content: space-around; /* Distributing space evenly around the icons */
    padding: 10px; /* Padding around the icons */
  }
  
  /* Styles for the icons */
  .icon {
    display: flex; /* Using Flexbox for layout */
    align-items: center; /* Centering the icon vertically */
    justify-content: center; /* Centering the icon horizontally */
    width: 50px; /* Fixed width */
    height: 50px; /* Fixed height */
  }
  </style>