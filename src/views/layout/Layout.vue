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
import { onUpdated, computed, onMounted } from 'vue';
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

        const checkIsLogin = () => {
            UserAPI.checkIsLogin()
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

        onMounted(() => {
            const currentUser = JSON.parse(
                localStorage.getItem('attack-on-game-user')
            );

            console.log('currentUser', currentUser);

            if (currentUser) {
                indexStore.setUser(currentUser);
            }

            checkIsLogin();
        });

        onUpdated(() => {
            const currentUser = JSON.parse(
                localStorage.getItem('attack-on-game-user')
            );

            console.log('currentUser', currentUser);

            if (currentUser) {
                indexStore.setUser(currentUser);
            }
            checkIsLogin();
        });

        return {
            isLogin,
            toUserAdminPage,
        };
    },
};
</script>
