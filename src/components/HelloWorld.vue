<template>
    <div>
        <button type="button" class="btn btn-primary" @click="increment">
            count is {{ count }}
        </button>
    </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import Axios from '@/utilities/axios';
import counterStore from '@/stores/counters';

export default {
    name: 'HelloWorld',
    data() {

        return {
            data: {},
        };
    },
    computed: {
        ...mapState(counterStore, ['count']),
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        ...mapActions(counterStore, ['increment']),
        fetchData() {
            Axios.get('/')
                .then((response) => {
                    this.data = response.data;
                })
                .catch((error) => {
                    console.error('API error:', error);
                });
        },
    },
};
</script>
<style scoped></style>
