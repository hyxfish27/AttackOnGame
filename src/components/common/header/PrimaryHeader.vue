<template>
    <div class="d-flex align-items-center">
        <Logo></Logo>
        <div>
            <ul class="menu-list d-flex align-items-center">
                <li>
                    <router-link
                        to="/event-list"
                        class="btn border-0 py-0 menu-list__item"
                        :class="[isActive('EventList') ? 'text-primary' : '']"
                    >
                        活動列表
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/store-list"
                        class="btn border-0 py-0 menu-list__item"
                        :class="[isActive('StoreList') ? 'text-primary' : '']"
                    >
                        店家列表
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import Logo from '@/components/common/Logo.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (thisroute) => {
    return route.name === thisroute;
};
</script>
<style lang="scss" scoped>
.menu-list {
    display: flex;
    justify-content: start;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0;
}

.menu-list__item:hover {
    color: #666666;
}

// TODO: router-link style 需要從變數檔控制
</style>
