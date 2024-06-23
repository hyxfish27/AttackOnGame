<template>
    <div
        class="full-sceen-with-footer bg-greyF7 login-register-role-switcher_wrap"
    >
        <div
            class="container d-flex h-100 login-register-role-switcher_panel justify-content-between"
        >
            <div class="login-register-role-switcher_section bg-white">
                <div
                    class="h-100 d-flex flex-column justify-content-center align-items-center"
                >
                    <div
                        class="img-wrap store-icon mb-2 d-flex justify-content-center align-items-center"
                    >
                        <img :src="storeIcon" alt="" />
                    </div>
                    <div
                        class="d-flex flex-column justify-content-center align-items-center"
                    >
                        <h4 class="mb-2 fw-bold pt-3 pb-2">
                            店家{{ behavior }}
                        </h4>
                        <p class="mb-2 pb-3 fw-bold">
                            我要成為始祖聚人，創造源源不絕的聚人!
                        </p>
                        <div class="">
                            <router-link
                                class="d-block mb-2"
                                :to="storeBehaviorUrl"
                            >
                                <button class="btn-common fw-bold py-2 px-3">
                                    立即{{ behavior }}
                                </button>
                            </router-link>
                            <!-- <button @click="onGoogleSignUp('store')">
                                Google註冊
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="login-register-role-switcher_section bg-white">
                <div
                    class="h-100 d-flex flex-column justify-content-center align-items-center"
                >
                    <div
                        class="img-wrap player-icon mb-2 d-flex justify-content-center align-items-center"
                    >
                        <img width="150" :src="userIcon" alt="" />
                    </div>
                    <div
                        class="d-flex flex-column justify-content-center align-items-center"
                    >
                        <h4 class="mb-2 fw-bold pt-3 pb-2">
                            玩家{{ behavior }}
                        </h4>
                        <p class="mb-2 pb-3 fw-bold">
                            我要成為GG的聚人，希望可以來個Good Game!
                        </p>

                        <div class="sign-up__controller">
                            <router-link
                                class="d-block mb-2"
                                :to="userBehaviorUrl"
                            >
                                <button class="btn-common fw-bold py-2 px-3">
                                    立即{{ behavior }}
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import storeIcon from '@/assets/images/store-icon.png';
import userIcon from '@/assets/images/user-icon.png';

defineProps({
    behavior: {
        type: String,
        default: '',
    },
    storeBehaviorUrl: {
        type: String,
        default: '',
    },
    userBehaviorUrl: {
        type: String,
        default: '',
    },
});
</script>
<style lang="scss">
.login-register-role-switcher_wrap {
    padding: 48px 0;

    .login-register-role-switcher_section {
        border-radius: 8px;
        border: 1px solid #d4d4d4;
        width: calc(50% - 24px);
    }

    .img-wrap {
        width: 140px;
        height: 140px;
        border-radius: 50%;

        img {
            width: 60px;
        }

        &.player-icon {
            border: 6px solid #ffdd33;
        }

        &.store-icon {
            border: 6px solid #ff8025;
        }
    }
}
</style>
