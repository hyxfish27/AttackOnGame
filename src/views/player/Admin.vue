<template>
    <div class="player-admin container vh-100">
        <div class="row">
            <div class="col-3 player-admin__sidebar">
                <div>
                    <h4>玩家</h4>
                    <img class="player-admin__img" :url="url" />
                    <div>{{ account }}</div>
                    <div class="mb-4">{{ name }}</div>

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

                <v-form v-slot="{ errors }" @submit="handleSubmit(onSubmit)">
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
                            @focus="isEditing = true"
                        ></v-field>
                        <error-message
                            name="name"
                            class="text-danger"
                        ></error-message>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <v-field
                            id="email"
                            v-model="formData.email"
                            type="email"
                            class="form-control"
                            name="email"
                            rules="required|email"
                            :class="{ 'is-invalid': errors['email'] }"
                            @focus="isEditing = true"
                        ></v-field>
                        <error-message
                            name="email"
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
                            rules="required"
                            :class="{ 'is-invalid': errors['phone'] }"
                            @focus="isEditing = true"
                        ></v-field>
                        <error-message
                            name="phone"
                            class="text-danger"
                        ></error-message>
                    </div>

                    <div class="mb-3">
                        <label for="boardGames" class="form-label">
                            喜歡的桌遊
                        </label>
                        <div
                            v-for="boardGameType in boardGameTypes"
                            :key="boardGameType"
                        >
                            <label>
                                <v-field
                                    v-model="formData.boardGames"
                                    type="checkbox"
                                    name="boardGames"
                                    class="mr-2"
                                    :value="boardGameType"
                                ></v-field
                                >{{ boardGameType }}</label
                            >
                        </div>
                        <error-message
                            name="boardGames"
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
                            @change="handleFileUpload"
                        />
                        <error-message
                            name="avatar"
                            class="text-danger"
                        ></error-message>
                    </div>

                    <div class="section">
                        <button
                            type="submit"
                            class="btn btn-primary mr-4"
                            :disabled="!isEditing"
                        >
                            編輯資料
                        </button>
                        <button class="btn btn-primary">修改密碼</button>
                    </div>
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {},
    setup() {
        const isEditing = ref(false);

        const formData = ref({
            name: '預設姓名',
            email: 'default@example.com',
            phone: '0987654321',
            gender: '',
            boardGames: [],
            avatar: null,
        });

        const onSubmit = (values) => {
            console.log('表單提交:', values);
        };

        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            formData.value.avatar = file;
        };

        return {
            formData,
            onSubmit,
            handleFileUpload,
            isEditing,
        };
    },
    data() {
        return {
            url: 'xxxx',
            account: 'yyyyyyy',
            name: 'zzzzzzz',
            boardGameTypes: [
                'type1',
                'type2',
                'type3',
                'type4',
                'type5',
                'type6',
            ],
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
            height: 48px;
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
