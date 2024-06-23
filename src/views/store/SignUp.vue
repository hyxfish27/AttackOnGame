<template>
    <UserAccess role="store">
        <template #form>
            <signUpForm></signUpForm>
        </template>
    </UserAccess>
</template>

<script setup>
import UserAccess from '@/components/UserAccess.vue';
import signUpForm from '@/components/common/SingUp.vue';
</script>

<style scoped>
/* Add component styles here */
</style>
