<template>
    <div class="loding-area backdrop-blur loadingError">
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

.loding-area.loadingError {
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    position: fixed;
    justify-content: center;
    right: 0;
    transition: opacity 0.5s ease;
    z-index: 3;
}

.fadeout {
    opacity: 0;
}
</style>
