<template>
    <div class="loding-area">
        <div class="text-primary d-flex align-items-center">
            <div
                class="py-3 px-4 bg-white shadow border h-30 d-flex align-items-center rounded-2"
            >
                <div class="loader-search"></div>
                <p class="flex-grow-1 text fw-bold">資料搜尋中...</p>
            </div>
        </div>
    </div>
</template>
<script></script>
<style lang="scss" scoped>
.text {
    margin-left: 20px;
}

.loding-area {
    left: 0;
    display: flex;
    position: fixed;
    justify-content: center;
    right: 0;
    height: 80vh;
    transition: opacity 0.5s ease;
}

.fadeout {
    opacity: 0;
}
</style>
