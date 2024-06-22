<template lang="pug">
    .index-title-wrap.d-flex.flex-column.align-items-start.position-relative
        .tag
            p.manuale {{ tag }}
        .title-wrap
            .bg-yellow.title.d-inline-block.position-relative
                h2.mb-0 {{ title }}
            .bg-greyE9.desc
                h3.mb-0 # {{ desc }}
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
        font-size: 96px;
        color: #000;
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
