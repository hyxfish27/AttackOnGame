<template>
    <div class="container player-login">
        <div class="row align-content-center vh-100 justify-content-center">
            <div class="col-5 align-self-center justify-content-center">
                <h3 class="text-center">我是玩家</h3>
            </div>
            <div class="col-7 align-self-center justify-content-center">
                <h3 class="text-center mb-4">玩家登入</h3>

                <v-form v-slot="{ errors }" @submit="onSubmit">
                    <div class="mb-3">
                        <label for="email" class="form-label">帳號</label>
                        <v-field
                            id="email"
                            v-model="formData.email"
                            type="email"
                            class="form-control"
                            name="email"
                            rules="required|email"
                            :class="{ 'is-invalid': errors['email'] }"
                        ></v-field>
                        <error-message
                            name="email"
                            class="text-danger"
                        ></error-message>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">密碼</label>
                        <v-field
                            id="password"
                            v-model="formData.password"
                            type="password"
                            class="form-control"
                            name="password"
                            rules="required|min:8|regex:^[a-zA-Z0-9]+$"
                            :class="{ 'is-invalid': errors['password'] }"
                        ></v-field>
                        <error-message
                            name="password"
                            class="text-danger"
                        ></error-message>
                    </div>

                    <div
                        class="password-forget d-flex justify-content-end mt-1"
                    >
                        <span
                            class="text-muted text-decoration-underline"
                            @click="goToForgetPasswordPage"
                            >忘記密碼</span
                        >
                    </div>

                    <div class="d-flex justify-content-center form-footer">
                        <button type="submit" class="btn btn-primary">
                            登入
                        </button>
                    </div>
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { defineComponent, reactive } from 'vue';
import * as yup from 'yup';
import {
    useForm,
    ErrorMessage,
    Field as VField,
    Form as VForm,
} from 'vee-validate';
import UserAPI from '@/api/User';

/**
 * playerLoginSchema
 * @author Vicky
 * @description 玩家登入頁驗證規則
 */
const playerLoginSchema = yup.object({
    email: yup
        .string()
        .required('帳號為必填項目')
        .email('請輸入正確的電子郵件格式'),
    password: yup
        .string()
        .required('密碼為必填項目')
        .min(8, '密碼必須大於8個字符')
        .matches(/[a-zA-Z]/, '密碼必須包含字母')
        .matches(/[0-9]/, '密碼必須包含數字'),
});

/**
 * PlayerLogin
 * @author Vicky
 * @description 玩家登入頁
 */
export default defineComponent({
    name: 'PlayerLogin',
    components: {
        ErrorMessage,
        VField,
        VForm,
    },
    setup() {
        const router = useRouter();

        const formData = reactive({
            email: '',
            password: '',
        });

        const { handleSubmit } = useForm({
            validationSchema: playerLoginSchema,
        });

        const onSubmit = handleSubmit(
            async () => {
                console.log('onSubmit');
                await UserAPI.login({
                    email: formData.value.email,
                    password: formData.value.password,
                })
                    .then((res) => {
                        console.log(res);
                        router.push({ name: 'PlayerAdmin' });
                    })
                    .catch((error) => {
                        console.log(error);
                        const errorMessage = error.response.data.message;
                        alert(errorMessage);
                    });
            },
            (error) => {
                console.error(error);
            }
        );

        const goToForgetPasswordPage = () => {
            router.push({
                name: 'PasswordForget',
                params: { role: 'player' },
            });
        };

        return {
            handleSubmit,
            onSubmit,
            formData,
            goToForgetPasswordPage,
        };
    },
});
</script>

<style lang="scss" scoped></style>
