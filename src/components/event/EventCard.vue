<template>
    <div class="event-card cursor" :class="cssStyle">
        <div class="card h-100 p-2">
            <div class="position-relative pt-150per event-card-img-wrap">
                <div
                    class="py-1 px-2 z-1 position-absolute top-0 fs-10 noto-serif-tc"
                    :class="computedEventData.tagColor"
                >
                    <p>{{ computedEventData.status }}</p>
                </div>
                <img
                    ref="image"
                    referrerpolicy="no-referrer"
                    class="w-100 h-100 inset-0 object-fit-cover position-absolute"
                    :src="computedEventData.eventImageUrl"
                    :alt="computedEventData.title"
                    loading="lazy"
                />
                <div
                    v-if="isLazyLoad"
                    class="swiper-lazy-preloader swiper-lazy-preloader-black"
                ></div>
            </div>

            <div class="card-body p-2">
                <p class="fs-10 text-grey9F">
                    {{ computedEventData.eventTime }}
                </p>
                <p
                    class="card-title noto-serif-tc fw-bold fs-8 mb-0 overflow-hidden card-title-h line-clamp line-clamp-2"
                >
                    <WordHighlighter :query="keywords">
                        {{ computedEventData.title }}
                    </WordHighlighter>
                </p>
                <p class="card-text text-end text-grey66">
                    {{ data.currentParticipantsCount }} /
                    {{ data.maxParticipants }}
                    <span class="noto-serif-tc">人</span>
                </p>
                <div
                    style=""
                    class="bg-greyE9 rounded-1 pb-2 mb-2 position-relative"
                >
                    <div
                        class="position-absolute h-100 start-0 rounded-4"
                        :class="computedEventData.barColor"
                        :style="{
                            right: lineStyle(
                                computedEventData.currentParticipantsCount,
                                computedEventData.maxParticipants
                            ),
                        }"
                    ></div>
                </div>
                <p class="fs-6 fw-bold text-primary mb-1">
                    NT$ {{ computedEventData.participationFee }}
                </p>
                <div class="d-flex text-grey66 align-items-center gap-2">
                    <span class="material-symbols-outlined"> location_on </span>
                    <p class="noto-serif-tc fs-10 letter-spacing-1">
                        {{ computedEventData.city }}
                        {{ computedEventData.district }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, defineProps } from 'vue';
import WordHighlighter from 'vue-word-highlighter';
import dayjs from '@/utilities/dayjs';
import toLocalString from '@/utilities/toLocalString';
import STATUS_MAP from '@/constant/eventStatus';
import setEventAttr from '@/utilities/setEventAttr';

const props = defineProps({
    isLazyLoad: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object,
        default: () => ({}),
    },
    keywords: {
        type: String,
        default: '',
    },
    cssStyle: {
        type: String,
        default: 'col-6 col-lg-3 mb-3',
    },
});
const lineStyle = (currentNum, maxNum) => {
    if (maxNum === 0) {
        return '0%';
    }
    const percentage = (currentNum / maxNum) * 100;
    return `${100 - percentage}%`;
};
const computedEventData = computed(() => {
    if (!props.data || Object.keys(props.data).length === 0) {
        return {};
    }
    const status = setEventAttr(props.data);
    return {
        status: STATUS_MAP[status].text,
        tagColor: STATUS_MAP[status].tagColor,
        barColor: STATUS_MAP[status].barColor,
        eventTime: `${dayjs(props.data.eventStartTime).format('YYYY-MM-DD HH:mm')} - ${dayjs(props.data.eventEndTime).format('HH:mm')}`,
        title: props.data.title,
        currentParticipantsCount: props.data.currentParticipantsCount,
        maxParticipants: props.data.maxParticipants,
        participationFee: toLocalString(props.data.participationFee),
        city: props.data.location.city,
        district: props.data.location.district,
        eventImageUrl: props.data.eventImageUrl[0],
    };
});
</script>
<style lang="scss">
.event-card {
    .card-title-h {
        height: 54px;
    }
    .event-card-img-wrap {
        overflow: hidden;
        img {
            transform: scale(1, 1);
            transition: all 0.8s ease-out;
        }
        img:hover {
            transform: scale(1.1, 1.1);
        }
    }
}
.event-card .mockup {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    p {
        color: #fff;
        border: 1px solid #fff;
        padding: 8px 16px;
    }
}
</style>
