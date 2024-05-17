<template>
    <div class="container">
        <div class="row align-content-center vh-100 justify-content-center">
            <div class="col-5 align-self-center justify-content-center">
                <h2 class="text-center">我是玩家</h2>
            </div>
            <div class="col-7">
                <h1>填寫玩家資訊</h1>
                <form>
                    <div class="mb-3">
                        <label for="playerName" class="form-label">暱稱</label>
                        <input
                            id="playerName"
                            type="email"
                            class="form-control"
                            aria-describedby="storeName"
                        />
                    </div>

                    <div class="mb-3">
                        <h3>喜歡的桌遊類型</h3>
                        <div class="form-check">
                            <input
                                id="favorite"
                                class="form-check-input"
                                type="checkbox"
                                value=""
                            />
                            <label class="form-check-label" for="favorite">
                                角色扮演遊戲(RPG)
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                id="favorite2"
                                class="form-check-input"
                                type="checkbox"
                                value=""
                            />
                            <label class="form-check-label" for="favorite2">
                                派對遊戲
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                id="favorite3"
                                class="form-check-input"
                                type="checkbox"
                                value=""
                            />
                            <label class="form-check-label" for="favorite3">
                                策略遊戲
                            </label>
                        </div>
                    </div>
                </form>
                <button class="btn btn-primary">完成基本資料</button>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
/* Add component styles here */
</style>
