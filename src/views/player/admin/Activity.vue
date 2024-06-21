<script setup>
// import { ref } from 'vue';
import ActivityTable from '@/components/player/ActivityTable.vue';
</script>

<template>
    <main class="container py-4 d-flex flex-column flex-grow-1">
        <div class="row gx-2 flex-grow-1">
            <div class="col-4">
                <div class="p-3 border">Custom column padding</div>
            </div>
            <div class="col-8">
                <div class="p-3 border h-100">
                    <div class="flex-column">
                        <!-- table title -->
                        <div class="border-bottom py-2 mb-2">
                            <h7>活動管理</h7>
                        </div>
                        <!-- button group -->
                        <div class="d-flex">
                            <button
                                type="button"
                                class="btn btn-outline-primary"
                            >
                                即將到來
                            </button>
                            <button
                                type="button"
                                class="btn btn-outline-primary ms-2"
                            >
                                已完成
                            </button>
                            <button
                                type="button"
                                class="btn btn-outline-primary ms-2"
                            >
                                取消
                            </button>
                        </div>

                        <ActivityTable />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped></style>
