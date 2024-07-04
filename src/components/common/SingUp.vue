<template>
    <div class="sign-up-wrap">
        <v-form v-slot="{ errors }" @submit="onSubmit">
            <div class="mb-3">
                <label for="InputEmail1" class="form-label require-icon"
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
                <error-message name="email" class="text-danger"></error-message>
            </div>
            <div class="mb-3">
                <label for="InputPassword1" class="form-label require-icon"
                    >密碼</label
                >
                <div class="position-relative">
                    <span
                        class="material-symbols-outlined position-absolute eyes-icon fs-8 me-2"
                        @click="togglePasswordVisibility('password')"
                    >
                        {{
                            passwordFieldType === 'password'
                                ? 'visibility_off'
                                : 'visibility'
                        }}
                    </span>
                    <v-field
                        id="InputPassword1"
                        v-model="formData.password"
                        :type="passwordFieldType"
                        class="form-control"
                        rules="required|min:8|regex:(?=.*[A-Za-z])(?=.*\d)"
                        placeholder="請輸入密碼"
                        name="密碼"
                        :class="{ 'is-invalid': errors['密碼'] }"
                    ></v-field>
                </div>
                <p>密碼須包含 1 個英文， 1 個數字，且長度至少為 8 個字元</p>
                <error-message name="密碼" class="text-danger"></error-message>
            </div>
            <div class="mb-3">
                <label
                    for="confirmInputPassword1"
                    class="form-label require-icon"
                    >再次確認密碼</label
                >
                <div class="position-relative">
                    <span
                        class="material-symbols-outlined position-absolute eyes-icon fs-8 me-2"
                        @click="togglePasswordVisibility('confirmPassword')"
                    >
                        {{
                            confirmPasswordFieldType === 'password'
                                ? 'visibility_off'
                                : 'visibility'
                        }}
                    </span>
                    <v-field
                        id="confirmInputPassword1"
                        :type="confirmPasswordFieldType"
                        class="form-control"
                        placeholder="請輸入密碼"
                        rules="required|confirmed:@密碼"
                        name="確認密碼"
                        :class="{ 'is-invalid': errors['確認密碼'] }"
                    ></v-field>
                </div>
                <error-message
                    name="確認密碼"
                    class="text-danger"
                ></error-message>
            </div>
            <RouterLink class="btn btn-primary me-2" :to="{ name: 'SignUp' }"
                >回上一步重選角色</RouterLink
            >
            <button type="submit" class="btn btn-primary" @click="goPage()">
                完成註冊
            </button>
        </v-form>

        <modal ref="BsModal" title="註冊結果" :text="signupResult"></modal>
    </div>
</template>

<script setup>
import modal from '@/components/common/simpleModal.vue';
import UserAPI from '@/api/User';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const role = ref(null);
const BsModal = ref(null);
const passwordFieldType = ref('password');
const confirmPasswordFieldType = ref('password');
const formData = ref({
    email: '',
    password: '',
});

const defaultError = '請填寫正確的註冊資料';
const signupResult = ref(defaultError);

const router = useRouter();
const route = useRoute();
const onSubmitSuccess = async () => {
    await UserAPI.signUp({
        email: formData.value.email,
        password: formData.value.password,
        role: role.value,
    })
        .then(() => {
            signupResult.value = '註冊成功';
            BsModal.value.myModalShow();
            setTimeout(() => {
                BsModal.value.myModalHide();
                router.push(`/${role.value}/login`);
            }, 2000);
        })
        .catch((error) => {
            if (error.request.status === 409) {
                signupResult.value = '已有人註冊過，請更換 email';
                BsModal.value.myModalShow();
            }
        });
};
const onSubmit = onSubmitSuccess;
const goPage = () => {
    if (signupResult.value === defaultError) {
        BsModal.value.myModalShow();
        return;
    }
    if (signupResult.value !== '註冊成功') {
        signupResult.value = defaultError;
    }
};
const togglePasswordVisibility = (field) => {
    if (field === 'password') {
        passwordFieldType.value =
            passwordFieldType.value === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
        confirmPasswordFieldType.value =
            confirmPasswordFieldType.value === 'password' ? 'text' : 'password';
    }
};
onMounted(() => {
    if (route.path.includes('player')) {
        role.value = 'player';
    } else {
        role.value = 'store';
    }
});
</script>
<style lang="scss">
.sign-up-wrap .eyes-icon {
    right: 16px;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    color: #9f9f9f;

    &:hover {
        color: #0088cc;
    }
}
</style>
