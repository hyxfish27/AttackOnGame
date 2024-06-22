<template>
    <div class="container">
        <div class="row py-3 justify-content-center align-content-center">
            <div
                class="col-8 bg-white py-3 border rounded-3 fw-bold text-center noto-serif-tc justify-content-center align-content-center checkout-bgImg"
                :style="{ backgroundImage: 'url(' + imgBg + ')' }"
            >
                <div class="text-white">
                    <p class="fs-4 mb-2">結帳失敗...</p>
                    <p class="fs-7">
                        那一天，人類想起了，信用卡餘額不足的恐懼！
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import imgBg from '@/assets/images/checkoutFailImg.jpg';
</script>
<style lang="scss" scope>
body {
    background-color: #f7f7f7;
}

.checkout-bgImg {
    min-height: 600px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 90%;
}
</style>
