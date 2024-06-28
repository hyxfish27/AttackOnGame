<template>
    <div class="p-3 border rounded bg-white col-3">
        <ElCard :routes="routes" :user="user"></ElCard>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import useIndexStore from '@/stores/index';
import ElCard from '@/components/common/adminEl.vue';
import defaultPic from '@/assets/images/store-icon.png';
import _ from 'lodash';

const indexStore = useIndexStore();
const store = computed(() => indexStore.storeData);
const routes = computed(() => {
    return [
        {
            icon: 'folder',
            name: 'StoreAdminId',
            label: '店家資料',
        },
        {
            icon: 'folder_managed',
            name: 'StoreActivityList',
            params: {},
            label: '管理活動',
        },
        {
            icon: 'create_new_folder',
            name: 'StoreActivityEdit',
            params: {},
            label: '創建活動',
        },
    ];
});
const user = computed(() => {
    console.log(indexStore);
    let imgUrl = store.value.avatar;
    if (
        imgUrl === 'https://example.com/avatar.jpg' ||
        _.isEmpty(imgUrl.trim())
    ) {
        imgUrl = defaultPic;
    }
    return {
        name: store.value.name,
        role: 'store',
        imgUrl,
    };
});
</script>
