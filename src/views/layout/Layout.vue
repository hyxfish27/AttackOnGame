<template>
    <div id="layout" class="d-flex flex-column min-vh-100 noto-serif-tc">
        <MainHeader
            :is-login="isLogin"
            @toUserAdminPage="toUserAdminPage"
        ></MainHeader>
        <router-view />
        <MainFooter class="mt-auto"></MainFooter>
        <Alert />
    </div>
</template>

<script>
import {
    onUpdated,
    computed,
    // onMounted
} from 'vue';
import { useRouter } from 'vue-router';
import MainHeader from '@/components/common/header/MainHeader.vue';
import MainFooter from '@/components/common/MainFooter.vue';
import UserAPI from '@/api/User';
import useIndexStore from '@/stores/index';
import Alert from '@/components/common/Alert.vue';

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
        Alert,
    },
    setup() {
        const router = useRouter();
        const indexStore = useIndexStore();

        const isLogin = computed(() => indexStore.isLogin);
        const currentUser = computed(() => indexStore.getUserData());

        const checkIsLogin = async () => {
            await UserAPI.checkIsLogin()
                .then((response) => {
                    indexStore.setIsLogin(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        const toUserAdminPage = () => {
            const { role } = currentUser.value;

            const playerAdminRoute = `/${role}/admin/`;

            router.push({ path: playerAdminRoute });
        };

        onUpdated(() => {
            checkIsLogin();

            if (isLogin.value) {
                if (currentUser.value) {
                    if (currentUser.value.role === 'player') {
                        indexStore.getPlayer(currentUser.value.id, router);
                    } else if (currentUser.value.role === 'store') {
                        indexStore.getStore(currentUser.value.id, router);
                    }
                }
            }
        });

        checkIsLogin();

        return {
            isLogin,
            toUserAdminPage,
        };
    },
};
</script>

<style scoped lang="scss"></style>
