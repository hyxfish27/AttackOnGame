<template>
    <tbody>
        <tr>
            <td :colspan="length">
                <div
                    class="d-flex justify-content-center text-grey9F mt-3 mb-3 align-items-center"
                >
                    <span class="material-symbols-outlined p-2">
                        sentiment_dissatisfied
                    </span>
                    <p class="fw-bold">{{ text }}</p>
                </div>
            </td>
        </tr>
    </tbody>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
    length: { type: Number, default: 1 },
    text: { type: String, default: '目前還沒有蒐錄到資料唷' },
});
</script>
