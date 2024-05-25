<template>
    <div class="d-flex flex-column min-vh-100">
        <MainHeader :is-login="isLogin"></MainHeader>
        <router-view />
        <MainFooter class="mt-auto"></MainFooter>
    </div>
</template>

<script>
import MainHeader from '@/components/common/MainHeader.vue';
import MainFooter from '@/components/common/MainFooter.vue';

/**
 * Layout
 * @author Vicky
 * @description 全站共用 Layout
 */
export default {
    name: 'Layout',
    components: {
        MainHeader,
        MainFooter,
    },
    data() {
        return {
            isLogin: true,
        };
    },
};
</script>
