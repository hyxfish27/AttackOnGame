<template>
  <div class="container">
    <div class="row align-content-center vh-100 justify-content-center">
    <div class="col-5 align-self-center justify-content-center">
      <h2 class="text-center">我是店家</h2>
    </div>
    <div class="col-7">
      <form>
        <h1>填寫店家資訊</h1>
        <div class="mb-3">
            <label for=" storeName" class="form-label">店家名稱</label>
            <input type="email" class="form-control" id=" storeName" aria-describedby="storeName">
        </div>
          <div class="mb-3">
            <label for="InputEmail1" class="form-label">email</label>
            <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <p>店家地址</p>
            <div class="row mb-3">
              <div class="col-6">
                <label for="InputCity" class="form-label">縣市</label>
                <input type="text" class="form-control" id="InputCity" aria-describedby="City">
              </div>
              <div class="col-6">
                <label for="InputArea" class="form-label ">區域</label>
                <input type="text" class="form-control" id="InputArea" aria-describedby="Area">
              </div>
            </div>
            <label for="InputAddress" class="form-label">地址</label>
            <input type="text" class="form-control" id="InputAddress" aria-describedby="Address">
          </div>
          <div class="mb-3">
            <label for="InputPassword1" class="form-label">密碼</label>
            <input type="password" class="form-control" id="InputPassword1">
          </div>
          <div class="mb-3">
            <label for="confirmInputPassword1" class="form-label">再次確認密碼</label>
            <input type="password" class="form-control" id="confirmInputPassword1">
          </div>
          <button type="submit" class="btn btn-primary" >下一步</button>

        <div class="mb-3">
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
          <button type="submit" class="btn btn-primary me-2">上一步</button>
      <RouterLink type="submit" class="btn btn-primary"
      :to="{ name: 'PlayerSignUpConfirm' }">下一步</RouterLink>
        </div>

      </form>

    </div>
  </div>
  </div>

</template>
