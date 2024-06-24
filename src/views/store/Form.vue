<template>
    <UserAccess role="store" :is-full-screan="false">
        <template #form>
            <CreateForm></CreateForm>
        </template>
    </UserAccess>
</template>

<script setup>
import UserAccess from '@/components/UserAccess.vue';
import CreateForm from '@/components/store/creatStoreForm.vue';
</script>
