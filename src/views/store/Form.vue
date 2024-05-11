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
          <h3>店家介紹</h3>
          <textarea name="shopIntroduce" id="shopIntroduce" cols="30" rows="10"></textarea>
      <button type="submit" class="btn btn-primary">完成基本資料</button>
        </div>

      </form>

    </div>
  </div>
  </div>

</template>
