<template>
    <div class="container store-login">
        <div class="row align-content-center vh-100 justify-content-center">
            <div class="col-5 align-self-center justify-content-center">
                <h3 class="text-center">我是店家</h3>
            </div>
            <div class="col-7 align-self-center justify-content-center">
                <h3 class="text-center mb-4">店家登入</h3>
                <loginForm></loginForm>
            </div>
        </div>
    </div>
</template>

<script>
import loginForm from '@/components/common/Login.vue';

export default {
    name: 'StoreLogin',
    components: {
        loginForm,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.store-login {
    .password-forget {
        cursor: pointer;

        span {
            font-size: 14px;
        }
    }
}
</style>
