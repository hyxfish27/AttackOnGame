<template>
    <swiper
        :loop="true"
        :initial-slide="0"
        :space-between="30"
        :navigation="true"
        :slides-per-view="4"
        :modules="modules"
        :lazy="true"
        class="swiper-panel"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
    >
        <swiper-slide v-for="(slide, index) in data" :key="index" class="">
            <slot name="slideContent" :slide="slide"></slot>
        </swiper-slide>
    </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        return {
            modules: [Navigation, Autoplay],
        };
    },
};
</script>

<style lang="scss">
.swiper-panel {
    padding: 0 28px;

    .swiper-slide {
        width: 25%;
    }

    .swiper-button-pre {
        left: 0;
    }

    .swiper-button-next {
        right: 0;
    }

    .swiper-button-next,
    .swiper-button-prev {
        width: 44px;
        height: 44px;
        background-color: #fff;
        padding: 8px;
        border: #333333 2px solid;
        border-radius: 8px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        &::after {
            color: #333333;
            font-size: 1.2rem;
            font-weight: 900;
        }

        &:hover {
            &::after {
                color: #0088cc;
            }
        }
    }
}
</style>
