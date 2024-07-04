<template>
    <router-link
        class="btn btn-outline-primary float-end"
        :to="{
            name: routeLink.name,
            params: routeLink.params,
        }"
    >
        <div class="d-flex align-items-center">
            <span class="material-symbols-outlined fs-9 pe-1"> reply </span>
            <p>返回上頁</p>
        </div>
    </router-link>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
    routeLink: {
        type: Object,
        required: true,
    },
});
</script>
