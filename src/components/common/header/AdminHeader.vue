<template>
    <header id="admin-header" class="position-relative">
        <div class="row">
            <PrimaryHeader class="col-9"></PrimaryHeader>
            <div
                class="col-3 header__nav d-flex gap-3 justify-content-end align-items-center"
            >
                <Navbar
                    :user="userData"
                    :route-list="route"
                    :role="userData.role"
                ></Navbar>
            </div>
        </div>
    </header>
</template>

<script>
import { computed } from 'vue';
import getStaticImagePath from '@/utilities/image';
import PrimaryHeader from '@/components/common/header/PrimaryHeader.vue';
import Navbar from '@/components/common/header/Navbar.vue';
import playerRoute from '@/constant/playerRoute';
import useIndexStore from '@/stores/index';
import storeRoute from '@/constant/storeRoute';
import _ from 'lodash';

export default {
    name: 'AdminHeader',
    components: {
        PrimaryHeader,
        Navbar,
    },
    emits: ['toUserAdminPage'],
    setup(props, context) {
        const indexStore = useIndexStore();

        const toUserAdminPage = () => {
            context.emit('toUserAdminPage');
        };

        const userData = computed(() => {
            let name;
            let avatar;
            const defaultData = indexStore[`${indexStore.userData.role}Data`];
            if (
                defaultData?.name === '' ||
                _.isEmpty(defaultData?.name) ||
                _.isEmpty(defaultData)
            ) {
                name = '會員';
            } else {
                name = defaultData.name;
            }
            if (_.isEmpty(defaultData?.avatar) || _.isEmpty(defaultData)) {
                avatar = '';
            } else {
                avatar = defaultData.avatar;
            }
            return {
                role: indexStore.userData.role,
                name,
                avatar,
            };
        });
        const route = computed(() => {
            console.log(userData.value);
            if (userData.value.role === 'store') {
                return storeRoute;
            }
            if (userData.value.role === 'player') {
                console.log('aaa');
                return playerRoute;
            }
            return [
                {
                    icon: '',
                    name: '',
                    params: {},
                    label: '',
                },
            ];
        });
        return {
            toUserAdminPage,
            getStaticImagePath,
            userData,
            route,
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
