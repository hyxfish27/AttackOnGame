<template>
    <v-form v-slot="{ errors }" @submit="onSubmit">
        <div class="mb-3">
            <label for="email" class="form-label">帳號</label>
            <v-field
                id="email"
                v-model="formData.email"
                type="email"
                class="form-control"
                name="email"
                :rules="playerLoginSchema.email"
                :class="{ 'is-invalid': errors['email'] }"
            ></v-field>
            <error-message name="email" class="text-danger"></error-message>
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">密碼</label>
            <v-field
                id="password"
                v-model="formData.password"
                type="password"
                class="form-control"
                name="password"
                :rules="playerLoginSchema.password"
                :class="{ 'is-invalid': errors['password'] }"
            ></v-field>
            <error-message name="password" class="text-danger"></error-message>
        </div>

        <div class="password-forget d-flex justify-content-end mt-1">
            <span class="text-muted" @click="goToForgetPasswordPage"
                >忘記密碼
            </span>
        </div>

        <div class="d-flex justify-content-center form-footer">
            <button type="submit" class="btn btn-primary px-4 mt-4">
                登入
            </button>
        </div>
    </v-form>
</template>
<script>
// import setUser from '@/stores/index';
import { useRouter, useRoute } from 'vue-router';
import { defineComponent, ref, onMounted } from 'vue';
import * as yup from 'yup';
import {
    // useForm,
    ErrorMessage,
    Field as VField,
    Form as VForm,
} from 'vee-validate';
import userAdapter from '@/adapter/user';
import UserAPI from '@/api/User';
import cookie from '@/utilities/cookie/cookie';
import useIndexStore from '@/stores/index';
import useAlert from '@/stores/alert';

const alterStore = useAlert();
/**
 * playerLoginSchema
 * @author Vicky
 * @description 玩家登入頁驗證規則
 */
const playerLoginSchema = {
    email: yup
        .string()
        .required('帳號為必填項目')
        .email('請輸入正確的電子郵件格式'),
    password: yup
        .string()
        .required('密碼為必填項目')
        .min(8, '密碼必須大於8個字符')
        .matches(/[0-9]/, '密碼必須包含數字'),
    // .matches(/[a-zA-Z]/, '密碼必須包含字母')
};

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
        const indexStore = useIndexStore();
        const formData = ref({
            email: '',
            password: '',
        });

        // const { handleSubmit } = useForm({
        //     validationSchema: yup.object(playerLoginSchema),
        // });

        const onSubmitSuccess = async () => {
            try {
                const response = await UserAPI.login({
                    email: formData.value.email,
                    password: formData.value.password,
                });

                console.log('login', response);
                const { user, token } = response.data.data;
                const userViewObject = userAdapter.toViewObject(user);
                indexStore.setUser(userViewObject);
                cookie.set({ name: 'AttackOnGameJWT', value: token });

                // set role data
                let roleDataExist = false;
                if (userViewObject) {
                    if (userViewObject.role === 'player') {
                        roleDataExist = await indexStore.getPlayer(
                            userViewObject.id,
                            router
                        );
                    } else if (userViewObject.role === 'store') {
                        roleDataExist = await indexStore.getStore(
                            userViewObject.id,
                            router
                        );
                    }
                }
                if (roleDataExist) {
                    router.push({ name: 'Index' });
                }
            } catch (error) {
                const errorMessage =
                    error.response.data.message || '連線失敗，別灰心，再來一次';
                alterStore.openModal('error', errorMessage);
            }
        };

        // const onSubmitError = (errors) => {
        //     console.error(errors);
        // };

        const onSubmit = onSubmitSuccess;

        // TODO: 這裡的 handleSubmit 有 bug，無法正確執行 onSubmitSuccess 和 onSubmitError，短解先直接接 onSubmitSuccess
        // const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError);

        const route = useRoute();
        const theRole = ref('');
        onMounted(() => {
            console.log(route.path);
            if (route.path.includes('player')) {
                theRole.value = 'player';
            } else {
                theRole.value = 'store';
            }
        });
        const goToForgetPasswordPage = () => {
            router.push({
                name: 'PasswordForget',
                params: { role: theRole },
            });
        };

        return {
            formData,
            playerLoginSchema,
            onSubmit,
            goToForgetPasswordPage,
        };
    },
});
</script>
