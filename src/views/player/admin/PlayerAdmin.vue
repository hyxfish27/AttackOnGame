<template>
    <div class="player-admin container vh-100">
        <div class="row">
            <div class="col-3 player-admin__sidebar">
                <div>
                    <h4>玩家</h4>
                    <img class="player-admin__img" :url="formData.url" />
                    <div>{{ formData.email }}</div>
                    <div class="mb-4">{{ formData.name }}</div>

                    <div class="player-admin__switcher">
                        <div>帳戶資訊</div>
                        <div>平台幣</div>
                        <div>我的活動</div>
                    </div>
                </div>
            </div>
            <div class="col-9 player-admin__info">
                <h3
                    class="border-bottom border-3 border-black mt-5 d-inline-block"
                >
                    帳戶資訊
                </h3>

                <v-form v-slot="{ errors }" @submit="onSubmit">
                    <!-- email 暫時不顯示 -->

                    <!-- <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <v-field
                          id="email"
                          v-model="formData.email"
                          type="email"
                          class="form-control"
                          name="email"
                          :class="{ 'is-invalid': errors['email'] }"
                          rules="required|email"
                          :disabled="!canEdit"
                      ></v-field>
                      <error-message
                          name="email"
                          class="text-danger"
                      ></error-message>
                  </div>
                  -->

                    <div class="mb-3">
                        <label for="name" class="form-label">姓名</label>
                        <v-field
                            id="name"
                            v-model="formData.name"
                            type="text"
                            class="form-control"
                            name="name"
                            rules="required"
                            :class="{ 'is-invalid': errors['name'] }"
                            :disabled="!canEdit"
                        ></v-field>
                        <error-message
                            name="name"
                            class="text-danger"
                        ></error-message>
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label">電話</label>
                        <v-field
                            id="phone"
                            v-model="formData.phone"
                            type="text"
                            class="form-control"
                            name="phone"
                            rules="required|min:10|max:10"
                            :class="{ 'is-invalid': errors['phone'] }"
                            :disabled="!canEdit"
                        ></v-field>
                        <error-message
                            name="phone"
                            class="text-danger"
                        ></error-message>
                    </div>

                    <div class="mb-3">
                        <p>喜歡的桌遊</p>
                        <div
                            v-for="preferGameType in preferGameTypes"
                            :key="preferGameType"
                        >
                            <label for="preferGame" class="form-label">
                                <v-field
                                    v-model="formData.preferGame"
                                    type="checkbox"
                                    name="preferGame"
                                    class="mr-2"
                                    :checked="
                                        formData.preferGame.includes(
                                            preferGameType
                                        )
                                    "
                                    :value="preferGameType"
                                    :disabled="!canEdit"
                                ></v-field
                                >{{ preferGameType }}
                            </label>
                        </div>
                        <error-message
                            name="preferGames"
                            class="text-danger"
                        ></error-message>
                    </div>

                    <div class="mb-3">
                        <label for="avatar" class="form-label">上傳頭像</label>
                        <input
                            id="avatar"
                            type="file"
                            class="form-control"
                            name="avatar"
                            :disabled="!canEdit"
                            @change="handleFileUpload"
                        />
                        <error-message
                            name="avatar"
                            class="text-danger"
                        ></error-message>
                    </div>

                    <div class="section">
                        <button
                            class="btn btn-success mr-4"
                            @click.prevent="toggleEditStatus"
                        >
                            {{ canEdit ? '編輯完成' : '編輯資料' }}
                        </button>

                        <button
                            type="submit"
                            class="btn btn-primary mr-4"
                            :disabled="canEdit"
                        >
                            儲存
                        </button>

                        <button class="btn btn-primary">修改密碼</button>
                    </div>
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import * as yup from 'yup';
import { useRoute, useRouter } from 'vue-router';
import { Form as VForm, Field as VField, ErrorMessage } from 'vee-validate';
import PlayerAPI from '@/api/Player';
import useIndexStore from '@/stores/index';

const playerSchema = yup.object({
    name: yup.string().required('姓名為必填欄位'),
    email: yup.string().required().email(),
    phone: yup.string().required().min(10).max(10),
});

export default defineComponent({
    components: {
        VForm,
        VField,
        ErrorMessage,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const indexStore = useIndexStore();

        const formData = ref({
            name: '',
            email: '',
            phone: '',
            preferGame: [],
            avatar: null,
        });

        const playerData = computed(() => indexStore.playerData);

        const getPlayer = async (userId) => {
            await PlayerAPI.get(userId)
                .then((response) => {
                    formData.value = response.data.data;
                })
                .catch((error) => {
                    const errorMessage = error.response.data.message;
                    alert(`取得玩家資料失敗: ${errorMessage}`);
                    router.push({ name: 'Index' });
                });
        };

        const canEdit = ref(false);

        const onSubmit = async (playerInfo) => {
            await PlayerAPI.update({
                userId: playerData.value.user,
                ...playerInfo,
            })
                .then(() => alert('更新成功'))
                .catch((error) => alert(`更新失敗: ${error}`));
        };

        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            formData.value.avatar = file;
        };

        const toggleEditStatus = () => {
            canEdit.value = !canEdit.value;
        };

        onMounted(() => {
            const userId = route.params.id;
            getPlayer(userId);
        });

        return {
            formData,
            canEdit,
            playerSchema,
            onSubmit,
            handleFileUpload,
            toggleEditStatus,
        };
    },
    data() {
        return {
            preferGameTypes: ['策略遊戲', '派對遊戲', '角色扮演遊戲(RPG)'],
        };
    },
});
</script>

<style lang="scss" scoped>
.player-admin {
    padding: 24px;

    &__img {
        width: 80px;
        height: 80px;
    }

    &__switcher {
        > div {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 38px;
            border: 1px solid black;
        }
    }
}

.is-invalid {
    border-color: #dc3545;
}

.text-danger {
    color: #dc3545;
}
</style>
