<template>
    <div class="container">
        <div class="row align-content-center vh-100 justify-content-center">
            <div class="col-5 align-self-center justify-content-center">
                <h2 class="text-center">我是玩家</h2>
            </div>

            <div class="col-7">
                <h1>填寫玩家資訊</h1>
                <signUpForm />
            </div>
        </div>
    </div>
</template>

<script setup>
import signUpForm from '@/components/common/SingUp.vue';
</script>

<style scoped>
/* Add component styles here */
</style>
