<script setup>
import UserAccess from '@/components/UserAccess.vue';
import StoreDataForm from '@/components/store/StoreDataForm.vue';
</script>

<template>
    <UserAccess role="store">
        <template #form>
            <StoreDataForm :con-edit="true" />
        </template>
    </UserAccess>
</template>
