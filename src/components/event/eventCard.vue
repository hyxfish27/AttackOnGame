<template>
    <div class="col-6 col-lg-3 mb-3">
        <div class="card h-100 p-2">
            <div class="position-relative pt-150per">
                <p
                    class="py-1 px-2 bg-warning z-1 position-absolute top-0 fs-10 noto-serif-tc"
                >
                    {{ computedEventData.status }}
                </p>
                <img
                    ref="image"
                    class="w-100 h-100 inset-0 object-fit-cover position-absolute"
                    :src="computedEventData.eventImageUrl"
                    :alt="computedEventData.title"
                />
            </div>

            <div class="card-body p-2">
                <p class="fs-10 text-grey9F">
                    {{ computedEventData.eventTime }}
                </p>
                <p
                    class="card-title noto-serif-tc fw-bold fs-8 mb-0 overflow-hidden card-title-h"
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
                        class="position-absolute h-100 start-0 bg-blue-light rounded-4"
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                    >
                        <title>map-marker-radius</title>
                        <path
                            fill="#666666"
                            d="M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z"
                        />
                    </svg>

                    <p class="noto-serif-tc fs-10 letter-spacing-1">
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
import dayjs from '../../utilities/dayjs';
import toLocalString from '../../utilities/toLocalString';

const STATUS_MAP = {
    OUT_DATE: {
        text: '不可報名',
        color: 'bg-grey',
    },
    NOT_FORMED: {
        text: '未成團',
        color: 'bg-green',
    },
    FULL: {
        text: '已滿團',
        color: 'bg-blue-light',
    },
    FORMED: {
        text: '已成團',
        color: 'bg-yellow',
    },
};
const today = dayjs();
const { data } = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    keywords: {
        type: String,
        default: '',
    },
});
const lineStyle = (currentNum, maxNum) => {
    if (maxNum === 0) {
        return '0%';
    }
    const percentage = (currentNum / maxNum) * 100;
    return `${100 - percentage}%`;
};
const calculateEventStatus = (event) => {
    const isRegi =
        today.isSameOrBefore(event.registrationEndTime) &&
        today.isSameOrAfter(event.registrationStartTime);
    if (!isRegi) {
        return 'OUT_DATE';
    }
    if (event.currentParticipantsCount < event.minParticipants) {
        return 'NOT_FORMED';
    }
    if (event.currentParticipantsCount === event.maxParticipants) {
        return 'FULL';
    }
    return 'FORMED';
};
const computedEventData = computed(() => {
    if (!data || Object.keys(data).length === 0) {
        return {};
    }
    const status = calculateEventStatus(data);
    return {
        status: STATUS_MAP[status].text,
        color: STATUS_MAP[status].color,
        eventTime: `${dayjs(data.eventStartTime).format('YYYY-MM-DD HH:mm')} - ${dayjs(data.eventEndTime).format('HH:mm')}`,
        title: data.title,
        currentParticipantsCount: data.currentParticipantsCount,
        maxParticipants: data.maxParticipants,
        participationFee: toLocalString(data.participationFee),
        district: data.address.slice(0, 6),
        eventImageUrl: data.eventImageUrl[0],
    };
});
</script>
<style></style>
