<template>
    <div>
        <button type="button" class="btn btn-primary" @click="increment">
            count is {{ count }}
        </button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import counterStore from '../stores/counters';

export default {
    name: 'HelloWorld',
    data() {
        return {};
    },
    computed: {
        ...mapState(counterStore, ['count']),
    },
    methods: {
        ...mapActions(counterStore, ['increment']),
    },
};
</script>

<style scoped></style>
