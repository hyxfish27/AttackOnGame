<template>
    <header class="prelogin-header">
        <div class="row">
            <Logo></Logo>
            <div class="col-6 d-flex align-items-center">
                <ul class="menu-list">
                    <li class="menu-list__item">
                        <router-link to="/event-list">活動列表 | </router-link>
                    </li>
                    <li><b>這是未登頁面</b></li>
                </ul>
            </div>
            <div
                class="col-3 header__nav d-flex justify-content-end align-items-center"
            >
                <router-link :to="{ name: 'Login' }">登入 | </router-link>
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
import Logo from '@/components/common/Logo.vue';
</script>

<style lang="scss" scoped>
.prelogin-header {
    .menu-list {
        display: flex;
        justify-content: start;
        list-style: none;
        padding: 0;
        margin: 0;
    }
}

// TODO: router-link style 需要從變數檔控制
a {
    color: black;
    text-decoration: none;
    display: inline-block;

    &:hover {
        color: #0088cc;
        text-decoration: none;
    }
}
</style>
