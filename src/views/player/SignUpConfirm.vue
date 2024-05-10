<template>
  <div class="row align-content-center vh-100 justify-content-center">
    <div class="col-5 align-self-center justify-content-center">
      <h2 class="text-center">我是玩家</h2>
    </div>
    <div class="col-7 lh-base">
      <h1>確認玩家資訊</h1>
      <div class="">
        <div>
          暱稱：
        </div>
        <div>
          email：
        </div>
        <div>
          聯絡電話：
        </div>
        <div>
          喜歡的桌遊類型：
        </div>
      </div>
      <RouterLink :to="{ name: 'PlayerSignUp' }" class="btn btn-primary me-2">返回修改</RouterLink>
      <RouterLink class="btn btn-primary" :to="{ name: 'PlayerSignUpConfirm' }">確定送出</RouterLink>
    </div>
  </div>

</template>
