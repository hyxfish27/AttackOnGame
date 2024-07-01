<template>
    <div id="navbar-is-login">
        <div class="d-flex align-items-center gap-2">
            <p class="line-clamp line-clamp-1">
                {{ helloWord }} ， {{ userAttr.name }}
            </p>
            <div
                class="profile-img border-3 border border-warning rounded-circle"
                :class="`border-${userAttr.color}`"
                @click="handelNavbar()"
            >
                <img :src="userAttr.imgUrl" alt="" />
            </div>
        </div>
        <nav
            v-show="isMenuActive"
            v-click-outside="onClickOutside"
            class="navbar position-absolute bg-white rounded border"
        >
            <div class="navbar-menu bg-white w-100 rounded">
                <p class="navbar-menu-title text-grey33">
                    管理 {{ userAttr.role }} 後台
                </p>
                <ul v-if="routeList.length > 0" class="user-admin-el-ul">
                    <li
                        v-for="route in routeList"
                        :key="route.name"
                        class="navbar-menu-link"
                    >
                        <router-link
                            :to="{ name: route?.name, params: route?.params }"
                            class="nav-link d-flex navbar-menu-link"
                        >
                            <span class="material-symbols-outlined text-grey33">
                                {{ route?.icon }}
                            </span>
                            <p class="flex-grow-1 text-center text-grey33">
                                {{ route?.label }}
                            </p>
                        </router-link>
                    </li>
                </ul>
                <div
                    class="navbar-menu-end navbar-menu-link d-flex text-grey33"
                    @click="logout"
                >
                    <span class="material-symbols-outlined text-grey33">
                        logout
                    </span>
                    <p class="flex-grow-1 text-center text-grey33">登出</p>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import { directive as vClickOutside } from 'click-outside-vue3';
import ROLE_MAP from '@/constant/role_map';
import dayjs from '@/utilities/dayjs';
import UserAPI from '@/api/User';
import useAlert from '@/stores/alert';
import { useRouter } from 'vue-router';

const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
const { role, user } = defineProps({
    routeList: {
        type: Array,
        default: () => [
            {
                icon: '',
                name: '',
                params: {},
            },
        ],
    },
    user: {
        type: Object,
        default: () => ({
            name: '',
            imgUrl: '',
        }),
    },
    role: {
        type: String,
        default: 'player',
    },
});
const isMenuActive = ref(false);
const router = useRouter();
const alterStore = useAlert();
const userAttr = computed(() => {
    return {
        name: user.name || ROLE_MAP[role].text,
        imgUrl: user.avatar || ROLE_MAP[role].icon,
        color: ROLE_MAP[role].color,
        role: ROLE_MAP[role].text,
    };
});
const helloWord = computed(() => {
    const hour = dayjs(currentTime).hour();
    if (hour >= 6 && hour < 12) {
        return '早安';
    }
    if (hour >= 12 && hour < 18) {
        return '午安';
    }
    return '晚安';
});
function handelNavbar() {
    setTimeout(() => {
        isMenuActive.value = !isMenuActive.value;
    }, 300);
}
function onClickOutside() {
    isMenuActive.value = false;
}
const logout = async () => {
    try {
        await UserAPI.logout();
        alterStore.openModal('success', '登出成功~歡迎再來玩唷');
        router.push('/');
    } catch (err) {
        alterStore.openModal('error', err.message || '登出失敗');
        router.push('/');
    }
};
</script>

<style lang="scss">
#navbar-is-login {
    .navbar {
        right: 0px;
        top: 100%;
        width: 200px;
        box-shadow: 0px 4px 12px 0px rgba(194, 206, 216, 0.6);
        padding: 0;
    }
    .navbar::before {
        content: '';
        position: absolute;
        top: -5px;
        right: 13px;
        width: 24px;
        height: 24px;
        background-color: #fff;
        transform: rotate(45deg);
    }
    .navbar-menu {
        padding: 24px;
        padding-bottom: 16px;
    }
    .profile-img {
        width: 50px;
        height: 50px;
        overflow: hidden;
        background-color: #fff;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .navbar-menu-title {
        font-size: 1rem;
        text-align: center;
        margin-bottom: 8px;
    }
    .navbar-menu-end {
        cursor: pointer;
        font-size: 1rem;
        text-align: center;
        padding: 8px 0;
        border-top: 1px solid #dee2e6;
    }
    .user-admin-el-ul {
        margin-bottom: 0px;
        padding: 0;
    }
    .user-admin-el-ul li {
        list-style: none;
        padding: 8px 0;
        border-top: 1px solid #dee2e6;
    }
    .navbar-menu-link:hover {
        background-color: #eeecec;
    }
    .active.router-link-exact-active.nav-link {
        color: #0088cc;
    }
}
</style>
