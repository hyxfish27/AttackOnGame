<template>
    <div class="main-header">
        <div class="main-header-content container">
            <PreLoginHeader v-if="!isLogin" />
            <AdminHeader v-else />
        </div>
    </div>
</template>

<script>
import PreLoginHeader from '@/components/common/PreLoginHeader.vue';
import AdminHeader from '@/components/common/AdminHeader.vue';

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
};
</script>

<style lang="scss" scoped>
.main-header {
    background-color: #fff6cc;
    padding: 8px 0;
    position: sticky;
    top: 0;
    z-index: 1000;
}
</style>
