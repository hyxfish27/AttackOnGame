<template>
    <UserAccess role="store">
        <template #form>
            <loginForm></loginForm>
        </template>
    </UserAccess>
</template>

<script setup>
import UserAccess from '@/components/UserAccess.vue';
import loginForm from '@/components/common/Login.vue';
</script>

<style lang="scss" scoped>
.store-login {
    .password-forget {
        cursor: pointer;

        span {
            font-size: 14px;
        }
    }
}
</style>
