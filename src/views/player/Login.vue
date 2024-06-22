<template>
    <div class="container player-login">
        <div class="row align-content-center vh-100 justify-content-center">
            <div class="col-5 align-self-center justify-content-center">
                <h3 class="text-center">我是玩家</h3>
            </div>
            <div class="col-7 align-self-center justify-content-center">
                <h3 class="text-center mb-4">玩家登入</h3>
                <loginForm></loginForm>
            </div>
        </div>
    </div>
</template>

<script setup>
import loginForm from '@/components/common/Login.vue';
</script>

<style lang="scss" scoped></style>
