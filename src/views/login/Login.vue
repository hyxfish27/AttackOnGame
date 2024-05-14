<template>
    <div class="login">
        <div class="login__section">
            <div class="login__role login__role--store">
                <div class="login__card">
                    <h3>店家登入</h3>
                    <p>我要成為始祖聚人，<br />創造源源不絕的聚人!</p>
                    <div class="login__controller">
                        <router-link class="d-block mb-2" to="/store/login">
                            <button>立即登入</button>
                        </router-link>
                        <button @click="onGoogleLogin('store')">
                            Google登入
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="login__section">
            <div class="login__role login__role--player">
                <div class="login__card">
                    <h3>玩家登入</h3>
                    <p>我要成為GG的聚人，<br />希望可以來個Good Game!</p>

                    <div class="login__controller">
                        <router-link class="d-block mb-2" to="/player/login">
                            <button>立即登入</button>
                        </router-link>
                        <button @click="onGoogleLogin('player')">
                            Google登入
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {};
    },
    methods: {
        onGoogleLogin(role) {
            switch (role) {
                case 'store':
                    // do google login flow
                    // eslint-disable-next-line no-console
                    console.log('do store google login flow');
                    break;
                case 'player':
                    // do google signup flow
                    // eslint-disable-next-line no-console
                    console.log('do player google login flow');
                    break;
                default:
                    throw new Error('role not found');
            }
        },
    },
    mounted() {},
};
</script>

<style lang="scss">
.login {
    width: 100%;
    display: flex;
    min-height: 100vh;

    &__section {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 24px;
    }

    &__role {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 600px;
        height: 800px;
        background-color: rgb(200, 200, 200);
        padding: 24px;
        border-radius: 10px;
    }

    &__card {
    }

    &__controller {
    }
}
</style>
