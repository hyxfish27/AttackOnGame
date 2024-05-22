<template>
    <div>aaa</div>
</template>

<script>
import Axios from '@/utilities/axios';

export default {
    name: 'Index',
    async mounted() {
        try {
            const response = await Axios.post('/api/v1/user', {
                email: 'aaa',
                password: 'bbb',
                name: 'store',
            });
            this.data = response.data;
            console.log('Response:', response.data);
        } catch (error) {
            console.error('API error:', error);
        }
    },
};
</script>

<style lang="scss" scoped></style>
