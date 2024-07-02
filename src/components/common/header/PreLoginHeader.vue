<template>
    <header id="prelogin-header">
        <div class="row">
            <PrimaryHeader class="col-9"></PrimaryHeader>
            <div
                class="col-3 header__nav d-flex justify-content-end align-items-center"
            >
                <router-link :to="{ name: 'Login' }">登入</router-link>
                <router-link :to="{ name: 'SignUp' }">註冊</router-link>
            </div>
        </div>
    </header>
</template>

<script setup>
/**
 * PreLoginHeader
 * @author Vicky
 * @description 未登頁面共用 Header
 */
import PrimaryHeader from '@/components/common/header/PrimaryHeader.vue';
</script>

<style lang="scss">
#prelogin-header {
    a {
        color: black;
        text-decoration: none;
        display: inline-block;

        &:hover {
            color: #0088cc;
            text-decoration: none;
        }
    }
}

// TODO: router-link style 需要從變數檔控制
</style>
