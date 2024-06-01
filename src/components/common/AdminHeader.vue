<template>
    <header class="admin-header">
        <div class="row">
            <router-link class="col-3 header__logo">
                <h3>聚人</h3>
                <h6>Attack On Game</h6>
            </router-link>
            <div class="col-6 d-flex align-items-center">
                <ul class="menu-list">
                    <li class="menu-list__item">
                        <router-link to="/">活動列表 | </router-link>
                    </li>
                    <li><b>這是已登頁面</b></li>
                </ul>
            </div>
            <div
                class="col-3 header__nav d-flex justify-content-end align-items-center"
            >
                <button class="btn btn-logout mr-2" @click="logout">
                    登出
                </button>

                <button class="btn" @click="toUserAdminPage">會員</button>
            </div>
        </div>
    </header>
</template>

<script>
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

<style lang="scss" scoped>
.admin-header {
    .menu-list {
        display: flex;
        justify-content: start;
        list-style: none;
        padding: 0;
        margin: 0;
    }
}

// TODO:暫時 button 樣式
.btn {
    background-color: #0088cc;
    border-radius: 8px;
    color: #fff;
}

// TODO: router-link style 需要從變數檔控制
a {
    color: #fff;
    text-decoration: none;
    display: inline-block;

    &:hover {
        color: #0088cc;
        text-decoration: none;
    }
}
</style>
