<template>
    <div class="col-6 col-lg-3 mb-3">
        <div class="card h-100 p-2">
            <div class="position-relative pt-150per">
                <p
                    class="py-1 px-2 bg-warning z-1 position-absolute top-0 fs-10 noto-serif-tc"
                >
                    {{ data.status.text }}
                </p>
                <img
                    ref="image"
                    class="w-100 h-100 inset-0 object-fit-cover position-absolute"
                    :src="data.eventImageUrl[0]"
                    :alt="data.title"
                />
            </div>

            <div class="card-body p-2">
                <p class="fs-10 text-grey9F">
                    {{ data.eventStartTime }}
                </p>
                <p
                    class="card-title noto-serif-tc fw-bold fs-8 mb-0 overflow-hidden card-title-h"
                >
                    <WordHighlighter :query="keywords">
                        {{ data.title }}
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
                                data.currentParticipantsCount,
                                data.maxParticipants
                            ),
                        }"
                    ></div>
                </div>
                <p class="fs-6 fw-bold text-primary mb-1">
                    NT$ {{ data.participationFee }}
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
                        {{ addressFristText(data.address) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import WordHighlighter from 'vue-word-highlighter';

const addressFristText = (text) => {
    return text.slice(0, 6);
};
const lineStyle = (currentNum, maxNum) => {
    if (maxNum === 0) {
        return '0%';
    }
    const percentage = (currentNum / maxNum) * 100;
    return `${100 - percentage}%`;
};
const { data } = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
    keywords: {
        type: String,
        default: '',
    },
});
</script>
