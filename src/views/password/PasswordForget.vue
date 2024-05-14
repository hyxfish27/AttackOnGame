<template>
    <div class="container password-forget">
        <h1>忘記密碼</h1>
        <p>您的身份: {{ currentRole }}</p>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'PasswordForget',
    data() {
        return {};
    },
    methods: {},
    mounted() {},
    setup() {
        const route = useRoute();
        const currentRole = computed(() =>
            route.params.role === 'store' ? '店家' : '玩家'
        );

        return {
            currentRole,
        };
    },
};
</script>

<style lang="scss">
.password-forget {
    margin-top: 36px;
}
</style>
