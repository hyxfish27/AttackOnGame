<template>
    <div class="full-sceen-with-footer bg-greyF7">
        <div class="container h-100 user-access_wrap">
            <div class="d-flex justify-content-between user-access_panel h-100">
                <div
                    class="user-access_section user-access_aside d-flex flex-column justify-content-center align-items-center"
                >
                    <div
                        class="img-wrap mb-4 d-flex justify-content-center align-items-center"
                        :class="`${roleAttr.key}-icon`"
                    >
                        <img :src="roleAttr.icon" alt="" />
                    </div>
                    <h2 class="text-center fs-4 fw-bold">
                        我是{{ roleAttr.text }}
                    </h2>
                </div>
                <div
                    class="user-access_main user-access_section d-flex flex-column justify-content-center"
                >
                    <h1
                        class="fs-5 pb-3 fw-bold title d-flex align-items-center"
                        :class="roleAttr.key"
                    >
                        填寫{{ roleAttr.text }}資訊
                    </h1>
                    <slot name="form"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import storeIcon from '@/assets/images/store-icon.png';
import userIcon from '@/assets/images/user-icon.png';

const ROLE_MAP = {
    store: {
        key: 'store',
        text: '店家',
        icon: storeIcon,
    },
    player: {
        key: 'player',
        text: '玩家',
        icon: userIcon,
    },
};
const { role } = defineProps({
    role: {
        type: String,
        default: 'store',
    },
});
const roleAttr = computed(() => {
    return ROLE_MAP[role];
});
</script>

<style lang="scss" scoped>
.user-access_wrap {
    padding: 48px 0;

    .user-access_panel {
        gap: 48px;
    }

    .user-access_aside {
        width: 30%;
    }

    .user-access_main {
        width: 70%;
    }

    .user-access_section {
        border-radius: 8px;
        padding: 12px 48px;
        border: 1px solid #d4d4d4;
        background-color: #fff;
    }

    .title.player::before {
        content: '';
        display: block;
        width: 8px;
        height: 100%;
        background-color: #ffdd33;
        margin-right: 16px;
    }

    .title.store::before {
        content: '';
        display: block;
        width: 8px;
        height: 100%;
        background-color: #ff8025;
        margin-right: 16px;
    }

    .img-wrap {
        width: 160px;
        height: 160px;
        border-radius: 50%;

        img {
            width: 80px;
            height: 80px;
        }

        &.player-icon {
            border: 8px solid #ffdd33;
        }

        &.store-icon {
            border: 8px solid #ff8025;
        }
    }
}
</style>
