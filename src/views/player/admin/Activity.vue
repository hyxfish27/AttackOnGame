<script setup>
import ActivityTable from '@/components/player/ActivityTable.vue';
import ActivityButtonGroup from '@/components/player/ActivityButtonGroup.vue';
import { onMounted, ref, computed } from 'vue';
import Status from '@/constant/orderStatus';
import ActivityAPI from '@/api/Activity';
import { useRouter } from 'vue-router';
import LeftEl from '@/components/player/PlayerLeftEl.vue';

const STATUS = [
    { name: '即將到來', value: Status.UNUSED },
    { name: '已完成', value: Status.USED },
    { name: '取消', value: Status.CANCEL },
];
const loading = ref(true);
const router = useRouter();
const activityList = ref([]);
const selectedStatus = ref(Status.UNUSED);
const getOrderList = async () => {
    loading.value = true;
    await ActivityAPI.getAll()
        .then((res) => {
            activityList.value = res.data;
        })
        .catch((err) => {
            if (err.request.status === 401) {
                alert('請先完成登入');
                router.push({
                    name: 'PlayerLogin',
                });
            } else {
                alert(err.data.message);
            }
            console.log(err);
        })
        .finally(() => {
            loading.value = false;
        });
};
const filteredActivityList = computed(() => {
    return activityList.value.filter(
        (activity) => activity.status === selectedStatus.value
    );
});
const statusList = computed(() => {
    return STATUS.map((x) => {
        const length =
            activityList.value?.filter((y) => y.status === x.value)?.length ||
            0;
        return {
            length,
            value: x.value,
            name: x.name,
        };
    });
});

onMounted(() => {
    getOrderList();
});
</script>

<template>
    <main class="container py-4 d-flex flex-column flex-grow-1">
        <div class="player-activy d-flex justify-content-between h-100 min-h-screen">
            <LeftEl class="player-activy_aside"></LeftEl>
            <div class="player-activy_main">
                <div class="d-flex p-3 border rounded h-100 flex-column bg-white">
                    <!-- table title -->
                    <div class="border-bottom py-1 mb-2">
                        <h3 class="fs-6">活動管理</h3>
                    </div>
                    <div v-if="loading" class="text-center mt-4">
                        <div class="spinner-border" role="status"></div>
                    </div>
                    <p v-if="activityList.length === 0 && !loading">
                        目前沒有訂單唷！
                    </p>
                    <ActivityButtonGroup v-if="!loading" :status-list="statusList" :selected-status="selectedStatus"
                        @update:selectedStatus="selectedStatus = $event" />

                    <ActivityTable v-if="activityList.length > 0 && !loading" :activity-list="filteredActivityList" />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
.player-activy {
    padding: 24px;
    gap: 0 16px;

    &__img {
        width: 80px;
        height: 80px;
    }

    .player-activy_aside {
        flex: 0 0 calc(33.3333% - 16px / 2);
    }

    .player-activy_main {
        flex: 0 0 calc(66.6667% - 16px / 2);
        border-radius: 8px;
    }
}
</style>
