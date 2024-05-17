<template>
    <div>
        <h1>店家資訊</h1>
        <div class="mb-3">
            <label for="storeName" class="form-label">店家名稱</label>
            <p id="storeName">{{ store.name }}</p>
        </div>
        <div class="mb-3">
            <label for="storeAddress" class="form-label">店家地址</label>
            <p id="storeAddress">{{ store.address }}</p>
        </div>
        <div class="mb-3">
            <label for="storeRating" class="form-label">評價</label>
            <p id="storeRating">{{ store.rating }}</p>
        </div>
        <button class="btn btn-primary" @click="openModal">編輯資料</button>

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

export default {
    components: { EditStoreModal },
    setup() {
        const store = ref({
            name: '示範店家',
            address: '示範地址',
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
