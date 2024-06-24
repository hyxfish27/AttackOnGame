<template>
    <div class="container-xxl">
        <div class="row p-3">
            <LeftEl></LeftEl>
            <div
                class="col-9 border rounded bg-white h-100 p-3 min-h-screen lh-lg"
            >
                <div class="d-flex">
                    <div>
                        <div class="mb-3">
                            <h3
                                id="storeName"
                                class="fs-5 fw-bold pt-2 pb-3 border-bottom"
                            >
                                {{ store.storeData.data.name }}
                            </h3>
                        </div>
                        <div class="mb-3">
                            <p class="text-grey9F fs-10">地址</p>
                            <p id="storeAddress">
                                {{ store.storeData.data.address }}
                            </p>
                        </div>
                        <div class="mb-3">
                            <p class="text-grey9F fs-10">店家電話</p>
                            <p>
                                {{ store.storeData.data.phone }}
                            </p>
                        </div>
                        <div class="mb-3">
                            <p class="text-grey9F fs-10">介紹</p>
                            <p>
                                {{ store.storeData.data.introduce }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- <button class="btn btn-primary" @click="openModal">
                    編輯資料
                </button>

                <button class="btn btn-primary" @click="toPasswordModify">
                    更改密碼
                </button> -->
            </div>
        </div>

        <EditStoreModal
            v-if="showModal"
            :store="store"
            @close="closeModal"
            @save="saveChanges"
        />
    </div>
</template>

<script>
import { ref } from 'vue';
import EditStoreModal from '@/components/EditStoreModal.vue';
import LeftEl from '@/components/store/StoreLeftEl.vue';
import storeData from '@/stores/index';

export default {
    components: { EditStoreModal, LeftEl },
    setup() {
        const store = storeData();
        const showModal = ref(false);

        // const openModal = () => {
        //     showModal.value = true;
        // };

        const closeModal = () => {
            showModal.value = false;
        };

        const saveChanges = (updatedStore) => {
            store.value = updatedStore;
            closeModal();
        };

        return { store, showModal, closeModal, saveChanges };
    },
};
</script>

<style lang="scss" scoped>
body {
    background-color: #f7f7f7;
}
</style>
