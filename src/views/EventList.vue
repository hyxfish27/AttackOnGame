<template class="">
    <div class="bg-greyF7">
        <div class="container pb-5">
            <div class="row py-7 justify-content-center">
                <div
                    class="col-7 d-flex gap-2 border-bottom border-primary py-3 px-0 noto-serif-tc"
                >
                    <select
                        id="selectCity"
                        v-model="selectType"
                        class="form-select w-25 bg-greyF7 border-0 fw-bold text-primary"
                        required=""
                    >
                        <option selected value="searchEvent">尋找活動</option>
                        <option value="searchStore">尋找店家</option>
                    </select>
                    <input
                        id="validationCustom01"
                        v-model="inputValue"
                        type="text"
                        class="form-control py-2"
                        placeholder="輸入關鍵字"
                    />
                </div>
            </div>
            <div v-if="loading" class="text-center">
                <div class="spinner-border" role="status"></div>
            </div>
            <div v-if="errorMessage.split()" class="text-center">
                <p>{{ errorMessage }}</p>
            </div>
            <div class="d-flex justify-content-between border-bottom">
                <div class="border-bottom border-primary">
                    <select
                        id="selectStatus"
                        class="form-select bg-greyF7 border-0 fw-bold text-primary"
                        required=""
                    >
                        <option selected value="allState">全部狀態</option>
                        <option value="inviting">揪團中</option>
                        <option value="full">已成團</option>
                    </select>
                </div>
                <div class="">
                    <button
                        type="submit"
                        class="btn btn-primary mb-2"
                        @click="changeSortBy"
                    >
                        {{ sortBy }}
                    </button>
                </div>
            </div>
           <EventPanel
           :data=""
           ></EventPanel>
        </div>
    </div>
</template>
<script setup>
import EventAPI from '@/api/Event';
import EventPanel from '../components/event/eventPanel.vue';
// import CityAll from '@/utilities/city';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import _debounce from 'lodash/debounce';
import dayjs from '@/utils/dayjs';
import {
    FORMATION_STATUS,
    REGISTRATION_STATUS,
    SORT_BY,
    SORT_ORDER,
} from '../constant/eventList';
const today=new dayjs();
const sortBy = ref('SORT_BY');
const sortOrder = ref('SORT_ORDER');
const loading = ref(true);
const errorMessage = ref('');
const inputValue = ref('');
const keywords = ref('');
const router = useRouter();
const selectType = ref('searchEvent');
const rawEventData = ref([]);
const getEvent = async (query = {}) => {
    loading.value = true;
    errorMessage.value = '';
    await EventAPI.getEvents(query)
        .then((res) => {
            rawEventData.value = res.data;
            console.log(res);
        })
        .catch((err) => {
            console.log('xxx', err);
            rawEventData.value = [];
            errorMessage.value = err?.data?.message || err.message;
        })
        .finally(() => {
            loading.value = false;
        });
};

watch(selectType, (newValue) => {
    if (newValue === 'searchStore') {
        router.push('/store-list');
    }
});
const updateKeywords = _debounce(async (value) => {
    keywords.value = value;
    console.log('更新關鍵字:', value);
    await getEvent({ keyword: keywords.value });
}, 300);

watch(inputValue, (newValue) => {
    console.log(inputValue);
    updateKeywords(newValue);
});
onMounted(() => {
    getEvent();
});
const isLogin = computed(() => rawEventData.map(x=>{
    ...x,
   status: setSatus(data)

}));
function setSatus(data){
    let value=''
    const isRegi=now.isSameOrBefore(data.registrationEndTime) && now.isSameOrAfter(data.registrationStartTime)
    if(!isRegi){
        value='已過期'
    }

    return{
        value:
        color:
    }
}
dayjs
/*
<select
                        id="selectCity"
                        v-model="selectedCity"
                        class="form-select w-25 bg-greyF7 border-0 fw-bold text-primary"
                        required
                    >
                        <option selected value="全部地點">全部地點</option>
                        <option
                            v-for="city in CityAll"
                            :key="city.CityName"
                            :value="city.CityName"
                        >
                            {{ city.CityName }}
                        </option>
                    </select>
*/
</script>

