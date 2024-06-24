<template>
    <div class="index-user-access_wrap">
        <div class="container">
            <TitlePanel :tag="titleData.tag" :title="titleData.title" :desc="titleData.desc"></TitlePanel>
            <div class="user-access_panel">
                <UserAccessCard v-for="card in SECTION_MAP" :key="card.key" :data="card"></UserAccessCard>
            </div>
        </div>
    </div>
</template>
<script setup>
import UserAccessCard from '@/components/index/UserAccessCard.vue';
import hugFace from '@/assets/images/hug-face.png';
import partyingFace from '@/assets/images/partying-face.png';
import playerBenifit from '@/assets/images/player-benifit.png';
import storeBenifit from '@/assets/images/store-benifit.png';
import TitlePanel from './titlePanel.vue';

const SECTION_MAP = [
    {
        key: 'store',
        title: '成為商家',
        desc: '我要成為始祖聚人，創造源源不絕的聚人！可以輕鬆地開立桌遊揪團活動，吸引更多人類前來體驗您的店面！',
        icon: partyingFace,
        pic: storeBenifit,
    },
    {
        key: 'player',
        title: '成為玩家',
        desc: '我要成為 GG 的聚人，希望可以來個 Good Game!只需點擊您感興趣的揪團活動，填寫報名資訊，當揪團達到所需人數時，您就可以準備好和其他人類一起玩耍了！',
        icon: hugFace,
        pic: playerBenifit,
    },
];
const titleData = {
    tag: 'SIGNUP',
    title: '註冊流程',
    desc: '加入桌遊兵團，找到你的容身之處',
};
</script>
<style lang="scss" scoped>
.index-user-access_wrap {
    padding: 48px 0;
    background: linear-gradient(to bottom, #ffdd33 0%, #ffffff 15%);

    .user-access_panel {
        padding: 40px 32px;
    }
}
</style>
