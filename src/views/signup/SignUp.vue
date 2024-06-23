<template>
    <LoginRegisterRoleSwitcher
        :behavior="behavior"
        :store-behavior-url="storeBehaviorUrl"
        :user-behavior-url="userBehaviorUrl"
    ></LoginRegisterRoleSwitcher>
</template>

<script setup>
import LoginRegisterRoleSwitcher from '@/components/LoginRegisterRoleSwitcher.vue';

const behavior = '註冊';
const storeBehaviorUrl = '/store/signup';
const userBehaviorUrl = '/player/signup';
</script>
