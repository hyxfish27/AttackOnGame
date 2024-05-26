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
                        <label for="InputEmail1" class="form-label"
                            >email</label
                        >
                        <v-field
                            id="InputEmail1"
                            v-model="formData.email"
                            type="email"
                            class="form-control"
                            aria-describedby="emailHelp"
                            rules="email|required"
                            name="email"
                            :class="{ 'is-invalid': errors['email'] }"
                        ></v-field>
                        <error-message
                            name="email"
                            class="text-danger"
                        ></error-message>
                    </div>
                    <div class="mb-3">
                        <label for="InputPassword1" class="form-label"
                            >密碼</label
                        >
                        <v-field
                            id="InputPassword1"
                            v-model="formData.password"
                            type="password"
                            class="form-control"
                            rules="required|min:8|regex:(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\da-zA-Z])"
                            name="密碼"
                            :class="{ 'is-invalid': errors['密碼'] }"
                        ></v-field>
                        <p>
                            請具備 1 個數字， 1 個大寫英文， 1 個小寫英文， 1
                            個特殊符號，且長度至少為 8 個字元
                        </p>
                        <error-message
                            name="密碼"
                            class="text-danger"
                        ></error-message>
                    </div>
                    <div class="mb-3">
                        <label for="confirmInputPassword1" class="form-label"
                            >再次確認密碼</label
                        >
                        <v-field
                            id="confirmInputPassword1"
                            type="password"
                            class="form-control"
                            placeholder="請輸入密碼"
                            rules="required|min:8|regex:(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\da-zA-Z])"
                            name="確認密碼"
                            :class="{ 'is-invalid': errors['確認密碼'] }"
                        ></v-field>
                        <error-message
                            name="確認密碼"
                            class="text-danger"
                        ></error-message>
                    </div>
                </v-form>
                <RouterLink
                    class="btn btn-primary me-2"
                    :to="{ name: 'SignUp' }"
                    >回上一步重選角色</RouterLink
                >
                <!-- <RouterLink class="btn btn-primary" :to="{ name: 'PlayerForm' }" :click="onSubmitSuccess">註冊玩家帳號
                </RouterLink> -->
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="onSubmitSuccess"
                >
                    註冊玩家帳號
                </button>
                <p v-if="noCreate != ''" class="text-danger">{{ noCreate }}</p>
            </div>
        </div>
        <div>
            <pre>{{ values }}</pre>
            {{ formData }}
            {{ errors }}
        </div>
    </div>
</template>

<script setup>
import PlayerAPI from '@/api/Player';
import { Form, Field } from 'vee-validate';
import { ref } from 'vue';

const formData = ref({
    email: '',
    password: '',
});
const noCreate = ref('');
const onSubmitSuccess = async () => {
    console.log('Form', Form);
    console.log('Field', Field);
    if (formData.value.eamil === '' || formData.value.password === '') {
        return;
    }
    await PlayerAPI.create({
        email: formData.value.email,
        password: formData.value.password,
        role: 'player',
    })
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            if (error.request.status === 409) {
                noCreate.value = '已有人註冊過，請更換 email';
            }
        });
};
</script>

<style scoped>
/* Add component styles here */
</style>
