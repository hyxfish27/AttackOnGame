<template>
    <div class="d-flex flex-column min-vh-100">
        <MainHeader
            :is-login="isLogin"
            @toUserAdminPage="toUserAdminPage"
        ></MainHeader>
        <router-view />
        <MainFooter class="mt-auto"></MainFooter>
    </div>
</template>

<script>
import {
    onUpdated,
    computed,
    // onMounted
} from 'vue';
import { useRouter } from 'vue-router';
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
        const router = useRouter();
        const indexStore = useIndexStore();

        const isLogin = computed(() => indexStore.isLogin);
        const userData = computed(() => indexStore.userData);

        console.log('indexStore', indexStore);

        const checkIsLogin = async () => {
            await UserAPI.checkIsLogin()
                .then((response) => {
                    console.log('isLogin', response);
                    indexStore.setIsLogin(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        const toUserAdminPage = () => {
            const { role, id } = userData;

            const userRoute = `/${role}/admin`;

            router.push({ path: userRoute, params: { id } });
        };

        onUpdated(() => {
            checkIsLogin();

            if (isLogin.value) {
                console.log('onMounted isLogin', isLogin.value);
                const currentUser = JSON.parse(
                    localStorage.getItem('attack-on-game-user')
                );

                console.log('currentUser', currentUser);

                if (currentUser) {
                    console.log('onmounted currentUser', currentUser);
                    if (currentUser.role === 'player') {
                        indexStore.getPlayer(currentUser.id, router);
                    } else if (currentUser.role === 'store') {
                        indexStore.getStore(currentUser.id);
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
