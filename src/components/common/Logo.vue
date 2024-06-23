<template>
    <router-link class="header__logo" to="/">
        <div class="img-wrap h-100">
            <img class="h-100" :src="Logo" alt="" />
        </div>
    </router-link>
</template>
<script setup>
import Logo from '@/assets/images/img_logo.png';
</script>
<style>
.header__logo {
    height: 84px;
    margin-right: 8px;
}
</style>
