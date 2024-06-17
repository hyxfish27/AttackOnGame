<template>
    <div class="container-fluid">
        <div
            class="row position-relative bg-yellow-light head-bg-style"
            :style="{
                backgroundImage: 'url(' + bennerBg + ')',
            }"
        >
            <div class="col position-relative pt-5">
                <img class="w-100" :src="bennerTitle" alt="來吶，你坐啊！" />
                <div class="d-flex w-100">
                    <img
                        :src="bennerImg1"
                        alt="人如果不沉醉於某些東西，估計都撐不下去吧？"
                    />
                    <img
                        :src="bennerImg2"
                        alt="這裡不需要獻出你的心臟，來尋找自己的桌遊兵團。"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import bennerBg from '@/assets/images/index_banner_bg_pc.png';
import bennerTitle from '@/assets/images/index_banner_title.svg';
import bennerImg1 from '@/assets/images/index_banner_img1.png';
import bennerImg2 from '@/assets/images/index_banner_img2.png';

// import user from '@/stores/index';
// import PlayerAPI from '@/api/Player';
// import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// import HelloWorld from '../components/HelloWorld.vue';

// const router = useRouter();
// const theUserData = user();
// console.log(theUserData.userData);

// const getPlayer = async (userId) => {
//     await PlayerAPI.get(userId)
//         .then((res) => {
//             console.log(res);
//         })
//         .catch(() => {
//             router.push({
//                 name: 'PlayerForm',
//             });
//         });
// };
// onMounted(() => {
//     const { isLogin } = theUserData;
//     if (isLogin) {
//         const userId = theUserData.userData._id;
//         getPlayer(userId);
//     }
// });
</script>

<style lang="scss" scoped>
.head-bg-style {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: calc(100vh - 114px);
}
</style>
