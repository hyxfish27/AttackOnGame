<template>
    <div class="container player-login">
        <div class="row align-content-center vh-100 justify-content-center">
            <div class="col-5 align-self-center justify-content-center">
                <h3 class="text-center">我是玩家</h3>
            </div>
            <div class="col-7 align-self-center justify-content-center">
                <h3 class="text-center mb-4">玩家登入</h3>
                <form>
                    <div class="form-group mb-3">
                        <label for="account">帳號</label>
                        <input
                            id="account"
                            type="email"
                            class="form-control"
                            aria-describedby="emailHelp"
                            placeholder="請輸入帳號"
                        />
                    </div>
                    <div class="form-group mb-3">
                        <label for="password"> 密碼 </label>
                        <input
                            id="password"
                            type="password"
                            class="form-control"
                            placeholder="請輸入密碼"
                        />
                        <div
                            class="password-forget d-flex justify-content-end mt-1"
                            @click="goToForgetPasswordPage"
                        >
                            <span class="text-muted text-decoration-underline"
                                >忘記密碼</span
                            >
                        </div>
                    </div>

                    <div class="d-flex justify-content-center form-footer">
                        <button type="submit" class="btn btn-primary">
                            登入
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayerLogin',
    data() {
        return {};
    },
    methods: {
        goToForgetPasswordPage() {
            this.$router.push({
                name: 'PasswordForget',
                params: { role: 'player' },
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
