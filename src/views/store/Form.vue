<script setup>
import UserAccess from '@/components/UserAccess.vue';
import StoreDataForm from '@/components/store/StoreDataForm.vue';
import StoreAPI from '@/api/Store';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleSubmit = async (value) => {
    try {
        const res = await StoreAPI.create(value);
        console.log(res);

        if (res.success) {
            router.push({ name: 'Index' });
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <UserAccess role="store">
        <template #form>
            <StoreDataForm :con-edit="true" @submit="handleSubmit" />
        </template>
    </UserAccess>
</template>

<script setup>
import UserAccess from '@/components/UserAccess.vue';
import CreateForm from '@/components/store/creatStoreForm.vue';
</script>
