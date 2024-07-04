<template>
    <div class="main-header" :class="{ 'main-header--admin': isLogin }">
        <div class="main-header-content container">
            <PreLoginHeader v-if="!isLogin" />
            <AdminHeader v-else @toUserAdminPage="toUserAdminPage" />
        </div>
    </div>
</template>

<script>
import PreLoginHeader from '@/components/common/header/PreLoginHeader.vue';
import AdminHeader from '@/components/common/header/AdminHeader.vue';

/**
 * MainHeader
 * @author Vicky
 * @description 全站共用 MainHeader
 */
export default {
    name: 'MainHeader',

    components: {
        PreLoginHeader,
        AdminHeader,
    },

    props: {
        isLogin: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['toUserAdminPage'],

    setup(props, context) {
        const toUserAdminPage = () => {
            context.emit('toUserAdminPage');
        };

        return {
            toUserAdminPage,
        };
    },
};
</script>

<style lang="scss" scoped>
.main-header {
    background-color: #fff;
    border-bottom: 1px solid #e9e9e9;
    color: #333333;
    padding: 8px 0;
    position: sticky;
    top: 0;
    z-index: 9;

    &--admin {
        background-color: #000000;
        color: #fff;
    }
}
</style>
