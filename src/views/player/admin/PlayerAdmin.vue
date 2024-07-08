<template>
    <div class="player-admin container full-screen-with-footer">
        <div class="d-flex justify-content-between h-100">
            <LeftEl class="player-admin_aside"></LeftEl>
            <div
                class="player-admin__info player-admin_main border rounded bg-white"
            >
                <h3 class="border-bottom border-1 mt-5 mb-3 pb-2 fs-6">
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
                        <div class="d-flex gap-2 align-items-center">
                            <div class="mb-2">
                                <img
                                    v-if="formData.avatar"
                                    width="54"
                                    :src="formData.avatar"
                                    alt=""
                                />
                            </div>

                            <input
                                id="avatar"
                                type="file"
                                class="form-control"
                                name="avatar"
                                :disabled="!canEdit"
                                @change="handleFileUpload"
                            />
                        </div>

                        <error-message
                            name="avatar"
                            class="text-danger"
                        ></error-message>
                    </div>

                    <div class="section">
                        <button
                            class="btn btn-outline-primary mr-4"
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
import { defineComponent, ref, computed, onMounted } from 'vue';
import * as yup from 'yup';
import { Form as VForm, Field as VField, ErrorMessage } from 'vee-validate';
import PlayerAPI from '@/api/Player';
import ImageAPI from '@/api/Image';
import useIndexStore from '@/stores/index';
import LeftEl from '@/components/player/PlayerLeftEl.vue';
import useAlert from '@/stores/alert';

const playerSchema = yup.object({
    name: yup.string().required('姓名為必填欄位'),
    email: yup.string().required().email(),
    phone: yup.string().required().min(10).max(10),
});

const alterStore = useAlert();

export default defineComponent({
    components: {
        VForm,
        VField,
        ErrorMessage,
        LeftEl,
    },
    setup() {
        const indexStore = useIndexStore();

        const formData = ref({
            name: '',
            email: '',
            phone: '',
            preferGame: [],
            avatar: null,
        });

        const playerData = computed(() => indexStore.playerData);
        const userData = computed(() => indexStore.userData);
        const canEdit = ref(false);
        const postImage = async (userId, file) => {
            await ImageAPI.postPlayerImg(userId, file)
                .then((res) => {
                    console.log('imageRes', res);
                    formData.value.avatar = res.data.imgURL;
                    console.log('res.imgURL', res.data.imgURL);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log('imageErr', err);
                });
        };

        const onSubmit = async (playerInfo) => {
            try {
                await PlayerAPI.update({
                    userId: userData.value.id,
                    ...playerInfo,
                });
                alterStore.openModal('success', '更新成功');
                indexStore.getPlayer(userData.value.id);
                postImage(userData.value.id, formData.value.avatar);
            } catch (error) {
                alterStore.openModal('error', `更新失敗: ${error}`);
            }
        };

        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            formData.value.avatar = file;
        };

        const toggleEditStatus = () => {
            canEdit.value = !canEdit.value;
        };

        onMounted(() => {
            formData.value = {
                ...playerData.value,
            };
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
    gap: 0 16px;

    &__img {
        width: 80px;
        height: 80px;
    }

    .player-admin_aside {
        flex: 0 0 calc(33.3333% - 16px / 2);
    }

    .player-admin_main {
        flex: 0 0 calc(66.6667% - 16px / 2);
        border-radius: 8px;
        padding: 0 48px;
    }
}

.form-label:last-child {
    margin-bottom: 0;
}

.is-invalid {
    border-color: #dc3545;
}

.text-danger {
    color: #dc3545;
}

.section {
    display: flex;
    gap: 0 8px;
}
</style>
