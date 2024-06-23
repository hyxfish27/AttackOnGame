<template>
    <div class="index-title-wrap d-flex flex-column align-items-start position-relative">
        <div class="tag">
            <p class="manuale text-white">{{ tag }}</p>
        </div>
        <div class="title-wrap">
            <div class="bg-yellow title d-inline-block position-relative">
                <h2 class="mb-0 noto-serif-tc">{{ title }}</h2>
            </div>
            <div class="bg-greyE9 desc">
                <h3 class="mb-0 noto-serif-tc"># {{ desc }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    tag: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    desc: {
        type: String,
        default: '',
    },
});
</script>
<style lang="scss">
.index-title-wrap {
    .tag {
        font-weight: 800;
        font-size: 96px;
        -webkit-text-stroke: 2px #000000;
        text-stroke: 2px #000000;
    }

    .title {
        padding: 4px 64px 4px 12px;
    }

    .title::after {
        position: absolute;
        content: '/';
        font-size: 3rem;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
    }

    .title-wrap {
        margin-top: -48px;
    }

    .desc {
        padding: 8px 12px;
    }

    h2 {
        font-size: 3rem;
        font-weight: 700;
    }

    h3 {
        font-weight: 700;
        font-size: 1.25rem;
    }
}
</style>
