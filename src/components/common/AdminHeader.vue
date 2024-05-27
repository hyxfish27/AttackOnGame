<template>
    <header class="admin-header">
        <div class="row">
            <div class="col-3 header__logo">
                <h3>聚人</h3>
                <h6>Attack On Game</h6>
            </div>
            <div class="col-6 d-flex align-items-center">
                <ul class="menu-list">
                    <li class="menu-list__item">
                        <router-link>活動列表</router-link>
                    </li>
                    <li>這是已登頁面</li>
                </ul>
            </div>
            <div
                class="col-3 header__nav d-flex justify-content-end align-items-center"
            >
                <button @click="logout">登出</button>
            </div>
        </div>
    </header>
</template>

<script>
import { useRouter } from 'vue-router';
import UserAPI from '@/api/User';
/**
 * AdminHeader
 * @author Vicky
 * @description 已登頁面共用 Header
 */
export default {
    name: 'AdminHeader',

    setup() {
        const router = useRouter();

        const logout = () => {
            UserAPI.logout()
                .then(() => {
                    router.push('/');
                })
                .catch((err) => {
                    console.error(err);
                    router.push('/');
                });
        };

        return {
            logout,
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
</style>
