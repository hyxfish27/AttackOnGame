<template>
    <div class="d-flex align-items-center">
        <Logo></Logo>
        <div>
            <ul class="menu-list d-flex align-items-center">
                <li class="menu-list__item">
                    <router-link to="/event-list">活動列表 </router-link>
                </li>
                <li class="menu-list__item">
                    <router-link to="/shop-list"> 店家列表 </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import Logo from '@/components/common/Logo.vue';
</script>
<style lang="scss" scoped>
.menu-list {
    display: flex;
    justify-content: start;
    list-style: none;
    padding: 0;
    margin: 0;
}
.menu-list__item + .menu-list__item {
    margin-left: 16px;
}
// TODO: router-link style 需要從變數檔控制
</style>
