<template>
    <div>
        <button type="button" class="btn btn-primary" @click="increment">
            count is {{ count }}
        </button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import axios from 'axios';
import counterStore from '../stores/counters';

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
        console.log(import.meta.env.VITE_API_URL);
        this.fetchData();
    },
    methods: {
        ...mapActions(counterStore, ['increment']),
        fetchData() {
            axios
                .get(`${import.meta.env.VITE_API_URL}`)
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
