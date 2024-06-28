<template>
    <div class="user-admin-el-wrap">
        <p class="fs-8 fw-bold text-grey66">{{ profile.label }}帳戶資訊</p>
        <div
            style="width: 130px; height: 130px"
            class="img-wrap border-5 border rounded-circle mx-auto mt-5 mb-2"
            :class="`border-${profile.color}`"
        >
            <img
                referrerpolicy="no-referrer"
                class="avatar"
                :src="profile.imgUrl"
                alt="玩家圖片"
            />
        </div>
        <div class="mb-4 text-center fw-bold">
            {{ profile.name }}
        </div>

        <ul class="user-admin-el-ul">
            <li v-for="route in routes" :key="route.name">
                <router-link
                    :to="{ name: route.name, params: route.params }"
                    class="nav-link d-flex"
                >
                    <span class="material-symbols-outlined text-grey33">
                        {{ route.icon }}
                    </span>
                    <p class="flex-grow-1 text-center">{{ route.label }}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { defineProps, computed } from 'vue';

const ROLE = {
    player: {
        color: 'warning',
        label: '玩家',
    },
    store: {
        color: 'warning',
        label: '商家',
    },
};
const { user } = defineProps({
    routes: {
        type: Array,
        default: () => [{ name: '', params: {}, label: '' }],
    },
    user: {
        type: Object,
        default: () => ({ name: '', imgUrl: '' }),
    },
});
const profile = computed(() => {
    return {
        color: ROLE[user.role].color,
        label: ROLE[user.role].label,
        ...user,
    };
});
</script>
<style lang="scss" scoped>
.user-admin-el-wrap {
    .avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .img-wrap {
        overflow: hidden;
    }
    .side-list:hover {
        background-color: #eeecec;
    }
    .nav-link {
        text-decoration: none;
        text-decoration: none;
        padding: 5px;
        display: block;
        transition:
            background-color 0.3s,
            color 0.3s;
        &.router-link-exact-active {
            background-color: #e5f6ff;
            color: #0088cc;
        }
    }
    .nav-link:hover {
        background-color: #e0e0e0;
        color: #000;
    }
    .user-admin-el-ul {
        list-style: none;
        padding-left: 0px;
    }
}
</style>
