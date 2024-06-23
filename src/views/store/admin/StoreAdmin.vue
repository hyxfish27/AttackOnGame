<template>
    <div class="store-admin container vh-100">
        <div class="row p-3">
            <LeftEl></LeftEl>
            <div class="col-9 store-admin__info">
                <div class="d-flex">
                    <div class="store-admin__info__img"></div>
                    <div>
                        <div class="mb-3">
                            <h3 id="storeName">{{ store.name }}</h3>
                        </div>
                        <div class="mb-3">
                            <p id="storeAddress">{{ store.address }}</p>
                        </div>
                        <div class="mb-3">
                            <label for="storeRating" class="form-label">評價</label>
                            <p id="storeRating">{{ store.rating }}</p>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary" @click="openModal">
                    編輯資料
                </button>

                <button class="btn btn-primary" @click="toPasswordModify">
                    更改密碼
                </button>
            </div>
        </div>

        <EditStoreModal v-if="showModal" :store="store" @close="closeModal" @save="saveChanges" />
    </div>
</template>

<script>
import { ref } from 'vue';
import EditStoreModal from '@/components/EditStoreModal.vue';
import LeftEl from '@/components/store/StoreLeftEl.vue';

export default {
    components: { EditStoreModal, LeftEl },
    setup() {
        const store = ref({
            name: '好玩工作室',
            address: '台北市信義區信義路20號20樓',
            rating: 4.5,
            contact: '0987654321',
            description: '這是一家很棒的店家。',
            location: {
                city: '',
                district: '',
                detailedAddress: '',
            },
        });

        const showModal = ref(false);

        const openModal = () => {
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const saveChanges = (updatedStore) => {
            store.value = updatedStore;
            closeModal();
        };

        return { store, showModal, openModal, closeModal, saveChanges };
    },
};
</script>

<style lang="scss" scoped>
.store-admin {
    &__info {
        padding: 24px;

        &__img {
            width: 100px;
            height: 100px;
            background-color: #ccc;
            margin-right: 24px;
        }
    }
}
</style>
