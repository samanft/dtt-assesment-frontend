<template>
    <div class="mobile-nav background-2">
        <div class="icon">
            <img src="../assets/ic_mobile_navigarion_home@3x.png" alt="Home icon" width="30px" />
        </div>
        <div class="icon">
            <img src="../assets/ic_mobile_navigarion_info@3x.png" alt="Info icon" width="30px" />
        </div>
    </div>
</template>

<style scoped>
.mobile-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
}
</style>