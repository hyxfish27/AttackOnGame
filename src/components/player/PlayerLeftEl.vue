<template>
    <div class="p-3 border rounded bg-white">
        <ElCard :routes="routes" :user="user"></ElCard>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import useIndexStore from '@/stores/index';
import ElCard from '@/components/common/adminEl.vue';
import defaultPic from '@/assets/images/user-icon.png';
import _ from 'lodash';

const indexStore = useIndexStore();
const routes = computed(() => {
    return [
        {
            icon: 'remember_me',
            name: 'PlayerAdminId',
            label: '帳戶資訊',
        },
        {
            icon: 'event',
            name: 'PlayerActivity',
            params: {},
            label: '我的活動',
        },
    ];
});
const user = computed(() => {
    console.log(indexStore.playerData);
    let imgUrl = indexStore.playerData.avatar;
    if (
        imgUrl === 'https://example.com/avatar.jpg' ||
        _.isEmpty(imgUrl.trim())
    ) {
        imgUrl = defaultPic;
    }
    return {
        name: indexStore.playerData.name,
        role: indexStore.playerData.role,
        imgUrl,
    };
});
</script>
