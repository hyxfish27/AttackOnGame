<template>
    <div class="container">
        <div class="row py-3 justify-content-center">
            <div class="col-8 bg-white p-4 border rounded-3 noto-serif-tc lh-lg">
                <div class="px-4 pb-3">
                    <p class="fw-bold fs-6">
                        {{ event.title }}
                    </p>
                    <p class="fs-10 text-grey9F fw-bold">訂單編號</p>
                    <p>{{ order.idNumber }}</p>
                </div>

                <div class="px-4 pt-3 pb-5 border-top bor-bttom-s-dot">
                    <div class="d-flex flex-wrap gap-4">
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">時間</p>
                            <p>{{ event.eventStartTime }} ~</p>
                            <p>{{ event.eventEndTime }}</p>
                        </div>
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">預定人</p>
                            <p>{{ order.name }}</p>
                        </div>
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">數量</p>
                            <p>{{ order.registrationCount }}人</p>
                        </div>
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">票價</p>
                            <p>
                                NT$ {{ event.participationFee }} / 張，共 NT${{
                            order.payment
                        }}
                                元
                            </p>
                        </div>
                    </div>
                </div>
                <div class="pt-5 d-flex flex-wrap justify-content-center gap-3">
                    <img v-for="(img, idx) in tickets" :key="img.orderId" class="w-40" :src="img.qrCodeUrl"
                        :alt="'活動票券' + (idx + 1)" />
                </div>
            </div>
        </div>
        <div class="row py-3 justify-content-center">
            <div class="col-8 bg-white p-4 border rounded-3 noto-serif-tc lh-lg">
                <p class="fs-7 fw-bold border-bottom pb-3 mb-3">活動詳情</p>
                <p>票卷狀態：{{ order.status }}</p>
                <p>地址：{{ event.address }}</p>
                <p>已報名人數：{{ event.currentParticipantsCount }}</p>
            </div>
        </div>
        <div class="row py-3 justify-content-center">
            <div class="col-8 bg-white p-4 border rounded-3 noto-serif-tc lh-lg">
                <p class="fs-7 fw-bold border-bottom pb-3 mb-3">店家資料</p>
                <p class="fw-bold fs-6">笨蛋工作室</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import PlayerAPI from '@/api/Player';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const event = ref({});
const order = ref({});
const tickets = ref([]);

// const testData = {
//     event: {
//         title: '夜貓子桌遊之夜，不眠不休！🌙',
//         address: '台北市中山區南京東路三段65號',
//         eventStartTime: '2024-07-28 06:00',
//         eventEndTime: '2024-07-28 10:00',
//         maxParticipants: 6,
//         minParticipants: 2,
//         currentParticipantsCount: 6,
//         participationFee: 300,
//     },
//     order: {
//         idNumber: 'o-240617-t0ok',
//         eventId: '666fd66718bfcd271648ce59',
//         playerId: '666fce8140b972eeb8db5f49',
//         payment: 1200,
//         discount: 0,
//         name: '徐里歐',
//         phone: '0923456783',
//         registrationCount: 4,
//         notes: '',
//         paymentStatus: 'pending',
//         paymentMethod: 'credit_card',
//         status: '即將開始',
//     },
//     tickets: [
//         {
//             orderId: '666fd9cfd018a0e4a8a888a5',
//             isQrCodeUsed: false,
//             qrCodeUrl:
//                 'data:image/png;base64,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',
//         },
//         {
//             orderId: '666fd9cfd018a0e4a8a888a5',
//             isQrCodeUsed: false,
//             qrCodeUrl:
//                 'data:image/png;base64,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',
//         },
//         {
//             orderId: '666fd9cfd018a0e4a8a888a5',
//             isQrCodeUsed: false,
//             qrCodeUrl:
//                 'data:image/png;base64,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',
//         },
//         {
//             orderId: '666fd9cfd018a0e4a8a888a5',
//             isQrCodeUsed: false,
//             qrCodeUrl:
//                 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAAAklEQVR4AewaftIAAAeMSURBVO3BQY4cy5LAQDLQ978yR0tfJZCoao1efDezP1jrEoe1LnJY6yKHtS5yWOsih7UucljrIoe1LnJY6yKHtS5yWOsih7UucljrIoe1LnJY6yKHtS7yw4dU/qaKJypTxaQyVUwqb1S8ofJGxaQyVUwqU8UTlaliUvmbKj5xWOsih7UucljrIj98WcU3qXxTxaTypOKJylTxpGJSeaPiDZVvqvgmlW86rHWRw1oXOax1kR9+mcobFW+oTBVvVLyhMlX8TSpTxVQxqTyp+ITKGxW/6bDWRQ5rXeSw1kV+uIzKVDGpTBVPVKaKSeVJxZOKJypvqDypuNlhrYsc1rrIYa2L/HA5laliUnlDZap4Q+WNiknlScUbKlPFf9lhrYsc1rrIYa2L/PDLKv6mikllUnlS8UTlicqTiicqk8pU8URlqphUvqniX3JY6yKHtS5yWOsiP3yZyr+sYlJ5ojJVTCpTxaTyRGWqmFSeqEwVk8pUMam8ofIvO6x1kcNaFzmsdZEfPlTxX6IyVbyhMlV8k8pU8U0qb1T8lxzWushhrYsc1rrIDx9SmSomlW+qmComlScVk8onVJ5UvFExqUwVT1SeVLyh8k0Vv+mw1kUOa13ksNZF7A8+oPJGxaTypGJSmSqeqDypeENlqnhDZap4Q2WqmFSmiicqTyomlaniDZWp4psOa13ksNZFDmtd5Icvq5hUPqEyVXyiYlJ5UvFE5Y2KJypTxVTxhsqTiicqb6i8oTJVfOKw1kUOa13ksNZFfvgylaniScUbKlPFJyomlUnlScUTlUnlDZU3Kp6oTCq/qeKJyjcd1rrIYa2LHNa6iP3BB1S+qWJSeaPiDZUnFZPKN1V8QuVJxaQyVUwqTyomlaliUnmj4hOHtS5yWOsih7UuYn/wi1Q+UfGGylTxhsqTikllqphUPlExqUwVk8pU8YbKVDGpTBVvqEwV33RY6yKHtS5yWOsi9gcfUPkvq3hD5Y2KN1SeVDxRmSomlScVk8onKiaVJxWfOKx1kcNaFzmsdZEfflnFE5UnFU9UpoonKk9U3qh4Q+U3VUwqU8UbFZPKk4o3Kr7psNZFDmtd5LDWRX74y1SmikllUpkqpopJZaqYKiaVb1J5o2JSeaLyTSpTxaQyVUwqT1T+psNaFzmsdZHDWhf54f+ZylTxTSpPKiaVqWJSmVSeVEwqk8pU8QmVqeITFZPKVDGpTBWTym86rHWRw1oXOax1kR++rOKbVJ5UTBWTylTxiYonKk8qJpUnKlPFpDJVTCpvqDypeFLxhspU8YnDWhc5rHWRw1oX+eFDFW9UTCpPKp6oTBWfqJhUpopJZaqYVJ5UTCpTxaTymyomlUllqphUpoqpYlL5psNaFzmsdZHDWhexP/hFKv+SijdUpoonKlPFJ1SmiknljYonKk8qJpU3Kn7TYa2LHNa6yGGti9gffEDlScUTlaniicqTiknljYo3VKaKSeWNiicqTyreUHlS8YbKVPE3Hda6yGGtixzWusgPX1YxqUwVU8Wk8qRiUnlSMalMFW+oPFF5UjGpTCpTxVTxhso3qXyTylTxicNaFzmsdZHDWhf54ctUnqi8UfGGyhsqU8WkMlVMKlPFpPIJlaniExVPVD5R8UTlNx3WushhrYsc1rrIDx+qeEPlScWkMlU8qXii8kRlqnhDZap4o2JSeUPlicpU8URlqphUnqhMFb/psNZFDmtd5LDWRewPPqDypGJSmSreUJkqnqg8qZhU3qh4Q2WqeENlqniiMlV8QmWqeKIyVfymw1oXOax1kcNaF/nhyyomlaniDZWpYlKZKp5UTCpTxaTyROWNikllqphUpoonKk9UPlExqUwVT1SeVHzisNZFDmtd5LDWRX74y1SmikllqphUpopvUnmj4hMVk8obKlPFpPKk4onKk4onFU9Uvumw1kUOa13ksNZFfvhlFZPKk4pJZaqYVJ5UPKmYVKaKSeWJylTxRsWk8obKk4pJ5Q2VT1T8psNaFzmsdZHDWhexP/gPU3mjYlJ5UvGGyjdVTCpTxRsqTyreUHlS8Tcd1rrIYa2LHNa6yA8fUvmbKqaKSWWqmFTeUHmjYlKZKp6oTCpTxRsqU8Wk8kRlqnhSMam8UfGJw1oXOax1kcNaF/nhyyq+SeWJyr+sYlKZKp5UfKLiExVvqEwVT1S+6bDWRQ5rXeSw1kV++GUqb1R8omJS+aaKN1SmikllqniiMlVMKlPFpPJE5RMVk8pU8ZsOa13ksNZFDmtd5IfLqPwmlU+ovKHyRsWkMlU8UXlSMam8ofKbDmtd5LDWRQ5rXeSH/zEVb6hMFU9UpoonKm9UvFExqUwVU8UbFf+Sw1oXOax1kcNaF/nhl1X8popJ5YnKVDGpvKEyVXxCZaqYVKaKJypTxaTypOKJylQxVTxR+abDWhc5rHWRw1oX+eHLVP4mlaliUnmiMlVMKk8qJpWpYlJ5UjGpPFH5RMWkMqlMFW+o/E2HtS5yWOsih7UuYn+w1iUOa13ksNZFDmtd5LDWRQ5rXeSw1kUOa13ksNZFDmtd5LDWRQ5rXeSw1kUOa13ksNZFDmtd5P8Ab//Iy+pz6WsAAAAASUVORK5CYII=',
//         },
//     ],
// };

const getTicket = async (idNumber) => {
    await PlayerAPI.getTicket(idNumber)
        .then((res) => {
            console.log('ticket', res);
            event.value = res.data.data.event;
            order.value = res.data.data.order;
            tickets.value = res.data.data.tickets;
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
                alert('請先完成登入');
                router.push({
                    name: 'PlayerLogin',
                });
            } else {
                alert(`${err.response.data.message}`);
                console.log(err);
            }
        });
};
onMounted(() => {
    const { idNumber } = route.params;
    getTicket(idNumber);

    // event.value = testData.event;
    // order.value = testData.order;
    // tickets.value = testData.tickets;
});
</script>
<style lang="scss" scope>
body {
    background-color: #f7f7f7;
}

.bor-bttom-s-dot {
    border-bottom: 2px dotted #d4d4d4;
}
</style>
