<template>
  <div class="container">
    <div class="row align-content-center vh-100 justify-content-center">
    <div class="col-5 align-self-center justify-content-center">
      <h2 class="text-center">我是店家</h2>
    </div>
    <div class="col-7">
      <form>
        <h1>填寫店家帳號資訊</h1>
          <div class="mb-3">
            <label for="InputEmail1" class="form-label">email</label>
            <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="InputPassword1" class="form-label">密碼</label>
            <input type="password" class="form-control" id="InputPassword1">
          </div>
          <div class="mb-3">
            <label for="confirmInputPassword1" class="form-label">再次確認密碼</label>
            <input type="password" class="form-control" id="confirmInputPassword1">
          </div>
          <button class="btn btn-primary me-2">回上一步重選角色</button>
          <RouterLink :to="{name:'StoreForm'}" type="submit"
          class="btn btn-primary" >註冊玩家帳號</RouterLink>
      </form>

    </div>
  </div>
  </div>

</template>
