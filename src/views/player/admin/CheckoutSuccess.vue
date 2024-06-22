<template>
    <div class="container">
        <div class="row py-3 justify-content-center align-content-center">
            <div
                class="col-8 bg-white py-3 border rounded-3 fw-bold text-center noto-serif-tc justify-content-center align-content-center checkout-bgImg"
                :style="{ backgroundImage: 'url(' + imgBg + ')' }"
            >
                <div>
                    <p class="fs-4 mb-2">結帳完成</p>
                    <p class="fs-7">請享受即將到來的桌遊之日吧！</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import imgBg from '@/assets/images/checkoutSuccessImg.jpg';
</script>
<style lang="scss" scope>
body {
    background-color: #f7f7f7;
}

.checkout-bgImg {
    min-height: 600px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 115%;
}
</style>
