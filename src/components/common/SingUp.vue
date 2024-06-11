<template>
    <div>
        <v-form v-slot="{ errors }" @submit="onSubmit">
            <div class="mb-3">
                <label for="InputEmail1" class="form-label">email</label>
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
                <label for="InputPassword1" class="form-label">密碼</label>
                <v-field
                    id="InputPassword1"
                    v-model="formData.password"
                    type="password"
                    class="form-control"
                    rules="required|min:8|regex:(?=.*[A-Za-z])(?=.*\d)"
                    name="密碼"
                    :class="{ 'is-invalid': errors['密碼'] }"
                ></v-field>
                <p>密碼須包含 1 個英文， 1 個數字，且長度至少為 8 個字元</p>
                <error-message name="密碼" class="text-danger"></error-message>
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

onMounted(() => {
    if (route.path.includes('player')) {
        role.value = 'player';
    } else {
        role.value = 'store';
    }
});
</script>
