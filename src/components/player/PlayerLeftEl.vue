<template>
    <div class="p-3 border rounded bg-white">
        <ElCard :routes="playerRoute" :user="user"></ElCard>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import useIndexStore from '@/stores/index';
import ElCard from '@/components/common/adminEl.vue';
import defaultPic from '@/assets/images/playerBoxImg.png';

import _ from 'lodash';
import playerRoute from '@/constant/playerRoute';

const indexStore = useIndexStore();

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
