<template>
  <div class="container">
    <div class="row align-content-center vh-100 justify-content-center ">
      <div class="col-5 align-self-center justify-content-center">
        <h2 class="text-center">我是玩家</h2>
      </div>

      <div class="col-7 ">

        <h1>填寫玩家資訊</h1>
        <form>
          <div class="mb-3">
            <label for="playerName" class="form-label">暱稱</label>
            <input type="email" class="form-control" id="playerName"
            aria-describedby="storeName">
          </div>

          <div class="mb-3 ">
            <h3>喜歡的桌遊類型</h3>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="favorite">
              <label class="form-check-label" for="favorite">
                角色扮演遊戲(RPG)
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="favorite2">
              <label class="form-check-label" for="favorite2">
                派對遊戲
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="favorite3">
              <label class="form-check-label" for="favorite3">
                策略遊戲
              </label>
            </div>
          </div>
        </form>
  <RouterLink class="btn btn-primary" :to="{name: 'PlayerSignUpConfirm'}">下一步</RouterLink>
      </div>

    </div>
  </div>

</template>

<script setup>
import { RouterLink } from 'vue-router';

</script>

<style scoped>
/* Add component styles here */
</style>
