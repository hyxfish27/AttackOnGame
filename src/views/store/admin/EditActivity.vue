<template>
    <div class="container-xxl">
        <div class="row p-3">
            <LeftEl></LeftEl>
            <div class="ps-3 col-9">
                <div class="border rounded bg-white h-100 p-3 min-h-screen">
                    <div class="fs-6 fw-bold pb-2 border-bottom mb-3">
                        創建活動表單
                    </div>
                    <div class="m-auto text-center text-grey9F">
                        <StoreEventForm></StoreEventForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import LeftEl from '@/components/store/StoreLeftEl.vue';
import StoreEventForm from '@/components/store/EventForm.vue';
</script>
