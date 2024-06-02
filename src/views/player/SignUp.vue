<template>
    <div class="container">
        <div class="row align-content-center vh-100 justify-content-center">
            <div class="col-5 align-self-center justify-content-center">
                <h2 class="text-center">我是玩家</h2>
            </div>

            <div class="col-7">
                <h1>填寫玩家資訊</h1>
                <v-form v-slot="{ errors }" @submit="onSubmit">
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
                            rules="required|min:8|regex:(?=.*[A-Za-z])(?=.*\d)"
                            name="密碼"
                            :class="{ 'is-invalid': errors['密碼'] }"
                        ></v-field>
                        <p>
                            密碼須包含 1 個英文， 1 個數字，且長度至少為 8
                            個字元
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
                            rules="required|confirmed:@密碼"
                            name="確認密碼"
                            :class="{ 'is-invalid': errors['確認密碼'] }"
                        ></v-field>
                        <error-message
                            name="確認密碼"
                            class="text-danger"
                        ></error-message>
                    </div>
                    <RouterLink
                        class="btn btn-primary me-2"
                        :to="{ name: 'SignUp' }"
                        >回上一步重選角色</RouterLink
                    >
                    <button
                        type="submit"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#signupModal"
                    >
                        完成註冊 {{ errors.length }}
                    </button>
                </v-form>

                <div
                    id="signupModal"
                    class="modal fade"
                    tabindex="-1"
                    aria-labelledby="signupModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 id="signupModalLabel" class="modal-title">
                                    註冊結果
                                </h5>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">{{ signupResult }}</div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    @click="goPage"
                                >
                                    關閉
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import UserAPI from '@/api/User';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formData = ref({
    email: '',
    password: '',
});
const defaultError = '請填寫正確的註冊資料';
const signupResult = ref(defaultError);
const onSubmitSuccess = async () => {
    await UserAPI.signUp({
        email: formData.value.email,
        password: formData.value.password,
        role: 'player',
    })
        .then((res) => {
            console.log(res);
            signupResult.value = '註冊成功';
        })
        .catch((error) => {
            if (error.request.status === 409) {
                signupResult.value = '已有人註冊過，請更換 email';
            }
        });
};
const onSubmit = onSubmitSuccess;
const router = useRouter();
const goPage = () => {
    if (signupResult.value === defaultError) return;
    if (signupResult.value === '註冊成功') {
        router.push('/player/login');
    } else {
        signupResult.value = defaultError;
    }
};
</script>

<style scoped>
/* Add component styles here */
</style>
