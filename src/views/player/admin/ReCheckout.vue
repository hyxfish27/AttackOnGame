<template>
    <div class="container">
        <div class="row py-3 justify-content-center">
            <div
                class="col-8 bg-white py-3 px-5 border rounded-3 noto-serif-tc lh-lg"
            >
                <div class="py-4">
                    <h4 class="fw-bold pb-4">確認訂單資訊</h4>
                    <h6 class="fw-bold pb-2">
                        {{ formData.title }}
                    </h6>
                    <div class="d-flex">
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
                        <p class="text-grey66 fw-bold">
                            {{ formData.address }}
                        </p>
                    </div>
                    <div class="d-flex">
                        <svg
                            fill="#666666"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="23"
                        >
                            <title>clock-time-four-outline</title>
                            <path
                                d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z"
                            />
                        </svg>
                        <p class="text-grey66 fw-bold ps-1">
                            {{ formData.startTime }} ~ {{ formData.endTime }}
                        </p>
                    </div>
                </div>
                <div class="py-4 fw-bold lh-lg w-80">
                    <h4 class="pb-3 fw-bold">核對報名資訊</h4>
                    <p class="text-grey66">
                        <span
                            style="width: 80px"
                            class="d-inline-block text-black"
                            >姓名</span
                        >{{ formData.userName }}
                    </p>
                    <hr />
                    <p class="text-grey66">
                        <span class="pe-3 text-black">聯絡電話</span
                        >{{ formData.phoneNum }}
                    </p>
                    <hr />
                    <p class="text-grey66">
                        <span class="pe-3 text-black">報名人數</span
                        >{{ formData.personNum }} 人
                    </p>
                    <hr />
                    <p class="text-grey66">
                        <span
                            style="width: 80px"
                            class="d-inline-block text-black"
                            >備註</span
                        >{{ formData.note }}
                    </p>
                    <hr />
                    <p class="text-danger">
                        <span class="pe-3 text-black">付款金額</span
                        >{{ formData.payPrice }} 元
                    </p>
                </div>
                <div class="d-flex justify-content-center pb-4 gap-3">
                    <button
                        type="button"
                        class="fw-bold btn btn-outline-primary"
                        @click="goBack"
                    >
                        <div class="d-flex align-items-center">
                            <span class="material-symbols-outlined fs-9 pe-1">
                                reply
                            </span>
                            <p>返回上頁</p>
                        </div>
                    </button>
                    <button
                        class="btn btn-primary fw-bold px-4"
                        @click="payment"
                    >
                        完成結帳
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useFormStore } from '@/stores/order';
import { useRouter } from 'vue-router';

const orderStore = useFormStore();
const { formData, paymentData } = orderStore;
const router = useRouter();
const goBack = () => {
    orderStore.setState(false);
    router.push({
        name: 'Checkout',
        path: 'checkout',
    });
};

const payment = async () => {
    try {
        // await axios.post(import.meta.env.VITE_PayGateWay, paymentData);
        const form = document.createElement('form');
        form.action = import.meta.env.VITE_PayGateWay;
        form.method = 'POST';

        Object.keys(paymentData).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = paymentData[key];
            form.appendChild(input);
        });

        const button = document.createElement('button');
        button.type = 'submit';
        form.appendChild(button);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        // reset formdata
        orderStore.setState(false);
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    if (formData.title === '') {
        router.push({
            name: 'PlayerActivity',
            path: 'activity',
        });
    }
});
console.log('testttt', orderStore.formData);
</script>
<style lang="scss" scope>
body {
    background-color: #f7f7f7;
}
</style>
