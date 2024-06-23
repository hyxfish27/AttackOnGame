<template>
    <LoginRegisterRoleSwitcher
        :behavior="behavior"
        :store-behavior-url="storeBehaviorUrl"
        :user-behavior-url="userBehaviorUrl"
    ></LoginRegisterRoleSwitcher>
</template>

<script setup>
import LoginRegisterRoleSwitcher from '@/components/LoginRegisterRoleSwitcher.vue';

const behavior = '登入';
const storeBehaviorUrl = '/store/login';
const userBehaviorUrl = '/player/login';
</script>
