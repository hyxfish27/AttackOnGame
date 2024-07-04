<template>
    <header id="prelogin-header">
        <div class="row">
            <PrimaryHeader class="col-9"></PrimaryHeader>
            <div
                class="col-3 header__nav d-flex justify-content-end align-items-center"
            >
                <router-link
                    :to="{ name: 'Login' }"
                    class="btn btn-outline-primary fw-bold px-4 my-2"
                    >登入</router-link
                >
                <router-link
                    :to="{ name: 'SignUp' }"
                    class="btn btn-primary text-white fw-bold px-4 signup-button"
                    >註冊</router-link
                >
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

<style lang="scss" scoped>
#prelogin-header {
    // a {
    //     text-decoration: none;
    //     display: inline-block;
    //     color: #333333;
    // }

    a + a {
        margin-left: 16px;
    }

    .login-button:hover {
        color: #006da3;
        background-color: #fff;
    }

    .login-button.active {
        color: #006da3;
        background-color: #fff;
    }

    .signup-button:hover {
        color: #006da3;
    }
}

// TODO: router-link style 需要從變數檔控制
</style>
