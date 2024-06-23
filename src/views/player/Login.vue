<template>
    <UserAccess role="player">
        <template #form>
            <loginForm></loginForm>
        </template>
    </UserAccess>
</template>

<script setup>
import UserAccess from '@/components/UserAccess.vue';
import loginForm from '@/components/common/Login.vue';
</script>

<style lang="scss" scoped></style>
