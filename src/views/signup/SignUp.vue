<template>
    <div class="container">
        <div class="row p-3">
            <div class="col-6">
                <div class="sign-up__role sign-up__role--store">
                    <div class="sign-up__card">
                        <h3>店家註冊</h3>
                        <p>我要成為始祖聚人，<br />創造源源不絕的聚人!</p>
                        <div class="sign-up__controller">
                            <router-link
                                class="d-block mb-2"
                                to="/store/signup"
                            >
                                <button>立即註冊</button>
                            </router-link>
                            <!-- <button @click="onGoogleSignUp('store')">
                                Google註冊
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <div class="sign-up__role sign-up__role--player">
                    <div class="sign-up__card">
                        <h3>玩家註冊</h3>
                        <p>我要成為GG的聚人，<br />希望可以來個Good Game!</p>

                        <div class="sign-up__controller">
                            <router-link
                                class="d-block mb-2"
                                to="/player/signup"
                            >
                                <button>立即註冊</button>
                            </router-link>
                            <!-- <button @click="onGoogleSignUp('player')">
                                Google註冊
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignUp',
    data() {
        return {};
    },
    mounted() {},
    methods: {
        // onGoogleSignUp(role) {
        //     switch (role) {
        //         case 'store':
        //             // do google signup flow
        //             // eslint-disable-next-line no-console
        //             console.log('do store google signup flow');
        //             break;
        //         case 'player':
        //             // do google signup flow
        //             // eslint-disable-next-line no-console
        //             console.log('do player google signup flow');
        //             break;
        //         default:
        //             throw new Error('role not found');
        //     }
        // },
    },
};
</script>

<style lang="scss">
.sign-up {
    &__role {
        display: flex;
        align-items: center;
        justify-content: center;

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
