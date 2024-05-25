<template>
    <header class="prelogin-header">
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
                    <li>這是未登頁面</li>
                </ul>
            </div>
            <div
                class="col-3 header__nav d-flex justify-content-end align-items-center"
            >
                <router-link to="/login">登入</router-link>
                <router-link to="/register">註冊</router-link>
            </div>
        </div>
    </header>
</template>

<script>
/**
 * PreLoginHeader
 * @author Vicky
 * @description 未登頁面共用 Header
 */
export default {
    name: 'PreLoginHeader',
};
</script>

<style lang="scss" scoped>
.prelogin-header {
    .menu-list {
        display: flex;
        justify-content: start;
        list-style: none;
        padding: 0;
        margin: 0;
    }
}
</style>
