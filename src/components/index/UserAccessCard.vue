<template>
    <div class="user-access-card_wrap">
        <div
            class="title_wrap d-flex align-items-center position-relative"
            :class="data.key"
        >
            <div
                class="icon-wrap d-flex justify-content-center align-items-center position-relative"
            >
                <img :src="data.icon" alt="data.title" />
            </div>
            <div
                class="user-access-card_text d-flex align-items-center position-absolute"
            >
                <p class="fz-8 title-style fw-bold">{{ data.title }}</p>
                <p class="fw-bold fs-7">{{ data.desc }}</p>
            </div>
        </div>
        <div class="">
            <img class="w-100 bg-white" :src="data.pic" alt="data.title" />
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
    data: {
        type: Object,
        default: () => ({
            title: '',
            desc: '',
            icon: '',
            pic: '',
        }),
    },
});
</script>
<style lang="scss" scoped>
.user-access-card_wrap {
    .fz-8 {
        font-size: 32px;
    }

    .title-style {
        color: #0088cc;
        margin-right: 16px;
        flex-shrink: 0;
        width: 70px;
    }

    .title_wrap {
        padding: 32px 0px;
    }

    .icon-wrap {
        width: 200px;
        height: 200px;
        background-color: #fff;
        border: 1px solid #333333;
        z-index: 2;

        img {
            width: 80px;
            height: 80px;
        }
    }

    .user-access-card_text {
        left: calc(200px - 12px);
        padding: 24px 40px;
        width: 60%;
        background-color: #fff;
        border: 1px solid #333333;
        box-shadow: 12px 12px 0px 0px #333333;
    }

    .title_wrap.player {
        flex-direction: row-reverse;

        .user-access-card_text {
            left: auto;
            right: calc(200px - 12px);
            box-shadow: -12px 12px 0px 0px #333333;
        }
    }
}
</style>
