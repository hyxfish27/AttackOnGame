<template>
    <div class="container">
        <div class="row align-content-center vh-100 justify-content-center">
            <div class="col-5 align-self-center justify-content-center">
                <h2 class="text-center">我是玩家</h2>
            </div>

            <div class="col-7">
                <h1>填寫玩家資訊</h1>
                <v-form v-slot="{ errors }">
                    <div class="mb-3">
                        <label for="playerName" class="form-label">暱稱</label>
                        <v-field
                            id="playerName"
                            v-model="userForm.name"
                            type="text"
                            class="form-control"
                            aria-describedby="playerName"
                            name="暱稱"
                            rules="required"
                            :class="{ 'is-invalid': errors['暱稱'] }"
                        ></v-field>
                        <error-message
                            name="暱稱"
                            class="text-danger"
                        ></error-message>
                    </div>
                    <div class="mb-3">
                        <label for="playerPhone" class="form-label">手機</label>
                        <v-field
                            id="playerPhone"
                            v-model="userForm.phone"
                            type="text"
                            class="form-control"
                            aria-describedby="playerPhone"
                            name="手機"
                            rules="required|min:10|max:10"
                            :class="{ 'is-invalid': errors['手機'] }"
                        >
                        </v-field>
                        <error-message
                            name="手機"
                            class="text-danger"
                        ></error-message>
                    </div>
                    <div class="mb-3">
                        <h3>喜歡的桌遊類型</h3>
                        <div class="form-check">
                            <input
                                id="favorite"
                                v-model="userForm.preferGame"
                                class="form-check-input"
                                type="checkbox"
                                value="角色扮演遊戲(RPG)"
                            />
                            <label class="form-check-label" for="favorite">
                                角色扮演遊戲(RPG)
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                id="favorite2"
                                v-model="userForm.preferGame"
                                class="form-check-input"
                                type="checkbox"
                                value="派對遊戲"
                            />
                            <label class="form-check-label" for="favorite2">
                                派對遊戲
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                id="favorite3"
                                v-model="userForm.preferGame"
                                class="form-check-input"
                                type="checkbox"
                                value="策略遊戲"
                            />
                            <label class="form-check-label" for="favorite3">
                                策略遊戲
                            </label>
                        </div>
                    </div>
                </v-form>
                <button class="btn btn-primary" @click="postUserForm(userForm)">
                    完成基本資料
                </button>
            </div>
        </div>
        <div>{{ userForm.preferGame }}</div>
    </div>
</template>

<script setup>
// Creates a form context
// This component now acts as a form
// Usually you will destruct the form context to get what you need
// import user from '@/stores/index';
import PlayerAPI from '@/api/Player';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userForm = ref({
    name: '',
    phone: '',
    avatar: 'https://example.com/avatar.jpg',
    preferGame: [],
});
// const theUserData = user();

const postUserForm = async (userFormData) => {
    if (
        userForm.value.name === '' ||
        userForm.value.phone === '' ||
        userForm.value.preferGame.length === 0
    ) {
        alert('有欄位未填寫');
        return;
    }
    await PlayerAPI.create(userFormData)
        .then((res) => {
            console.log(res);
            router.push({
                name: 'Index',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>
