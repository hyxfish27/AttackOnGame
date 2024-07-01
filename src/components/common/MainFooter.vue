<template>
    <footer class="main-footer">
        <div class="container">
            <div class="d-flex justify-content-between align-items-end">
                <div class="img-wrap">
                    <img class="h-100" :src="Logo" alt="" />
                </div>
                <div class="text text-end noto-serif-tc">
                    <p>本網站不提供商業用途</p>
                    <p>copyright © 2024 聚人. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
/**
 * MainFooter
 * @author vicky
 * @description 全站共用 MainFooter
 */
import Logo from '@/assets/images/img_logo.png';
</script>

<style lang="scss" scoped>
.main-footer {
    padding: 8px 0;
    background-color: #333333;

    .img-wrap {
        height: 84px;
    }

    .text {
        color: #d4d4d4;
        font-size: 1rem;
    }

    padding: 8px 0;
    background-color: #333333;

    .img-wrap {
        height: 84px;
    }

    .text {
        color: #d4d4d4;
        font-size: 1rem;
    }
}
</style>
