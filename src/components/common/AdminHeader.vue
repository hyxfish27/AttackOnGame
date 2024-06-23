<template>
    <header id="admin-header">
        <div class="row">
            <PrimaryHeader class="col-9"></PrimaryHeader>
            <div class="col-3 header__nav d-flex gap-3 justify-content-end align-items-center">
                <button class="btn btn-primary btn-logout mr-2" @click="logout">
                    登出
                </button>

                <button class="btn btn-primary" @click="toUserAdminPage">
                    會員
                </button>
            </div>
        </div>
    </header>
</template>

<script>
import PrimaryHeader from '@/components/common/PrimaryHeader.vue';
import { useRouter } from 'vue-router';
import UserAPI from '@/api/User';
// import useIndexStore from '@/stores/index';
import getStaticImagePath from '@/utilities/image';
// import { getCurrentInstance } from 'vue';

/**
 * AdminHeader
 * @author Vicky
 * @description 已登頁面共用 Header
 */
export default {
    name: 'AdminHeader',
    components: {
        PrimaryHeader,
    },
    emits: ['toUserAdminPage'],
    setup(props, context) {
        const router = useRouter();

        // const indexStore = useIndexStore();

        const logout = () => {
            UserAPI.logout()
                .then(() => {
                    alert('登出成功');
                    router.push('/');
                })
                .catch((err) => {
                    console.error(err);
                    router.push('/');
                });
        };

        const toUserAdminPage = () => {
            context.emit('toUserAdminPage');
        };

        return {
            logout,
            toUserAdminPage,
            getStaticImagePath,
        };
    },
};
</script>

<style lang="scss">
// TODO:暫時 button 樣式
#admin-header {
    a {
        color: #fff;
        text-decoration: none;
        display: inline-block;

        &:hover {
            color: #0088cc;
            text-decoration: none;
        }
    }
}
</style>
