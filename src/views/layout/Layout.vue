<template>
    <div class="d-flex flex-column min-vh-100">
        <MainHeader :is-login="isLogin"></MainHeader>
        <router-view />
        <MainFooter class="mt-auto"></MainFooter>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import MainHeader from '@/components/common/MainHeader.vue';
import MainFooter from '@/components/common/MainFooter.vue';
import UserAPI from '@/api/User';
import useIndexStore from '@/stores/index';

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
    setup() {
        const indexStore = useIndexStore();
        const isLogin = computed(() => indexStore.isLogin);

        const checkIsLogin = () => {
            UserAPI.checkIsLogin()
                .then((response) => {
                    console.log('isLogin', response);
                    indexStore.setIsLogin = response;
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        onMounted(() => {
            checkIsLogin();
        });

        return {
            isLogin,
        };
    },
};
</script>
