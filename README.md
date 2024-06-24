# 聚人 AttackOnGame

<img width="400" src="https://imgur.com/rs7cEYF.png" />

- 首頁： [AttackOnGame](https://attack-on-game.vercel.app/#/)

AttackOnGame 聚人 是一個專為桌遊愛好者設計的揪團平台，讓玩家輕鬆組隊參加店家舉辦的各類桌遊活動。無論你是策略遊戲高手，還是尋求輕鬆休閒的遊戲體驗，AttackOnGame 聚人都能幫助你找到志同道合的夥伴，一起享受桌遊的樂趣！

### 測試帳號

```bash

【玩家1號 : 皓月清涼】
帳號：Leo2728@gmail.com
密碼：123456789

【玩家2號 : Frank】
帳號：Frank2930@gmail.com
密碼：123456789

【店家1號 : PartyTime 派對時光】
帳號：Alice1234@gmail.com
密碼：123456789

【店家2號 : 桌遊貓貓♡派對樂園♡南京店】
帳號：Jack2425@gmail.com
密碼：123456789

```

### 畫面
- 首頁
<img width="800" src="https://imgur.com/LEWxuCh.png" />
  
- 活動列表
<img width="800" src="https://imgur.com/4NosUC8.png" />

- 店家列表
<img width="800" src="https://imgur.com/aNfW5J1.png" />

### 專案技術

```plaintext
Vue v3.4.21
Vue-router v4.3.0
Pinia v2.1.7
Bootstrap v5.3.3
```

### 安裝指南

## Node Version

```plaintext
v18.20.2
```

```bash
nvm use 18.20.2
```

## 取得專案

```bash
git clone git@github.com:hyxfish27/AttackOnGame.git
cd AttackOnGame
```

## 安裝套件
```bash
npm install
```

## 運行專案
```bash
npm run dev
```

## 格式化 src路徑下所有代碼
```bash
npm run format
```
使用 Prettier 工具格式化 src路徑下所有代碼。

## 風格檢查 src路徑下所有代碼
```bash
npm run lint
```
使用 eslint 工具做代碼檢查，檢查不合規範的代碼。


### 命名規則

1. constant（常數）: 全大寫英文，使用下底線(_)連接

    ```javascript
    const MAX_COUNT = 10;
    const API_URL = 'https://api.github.com';
    ```

2. variable：lowerCamel

    ```javascript
    const phoneNumber = '0912345678';
    const userName = 'John';
    ```

3. function：lowerCamel

    ```javascript
    function getUser() {}
    function createUser() {}
    function editUser() {}
    function deleteUser() {}
    ```

4. type：UpperCamel

    ```javascript
    class BoardGame {}
    ```

    `TODO` 待確認

5. interface：UpperCamel

    ```javascript
    interface BoardGame {}
    ```

6. css class：kebab-case, BEM

    html

    ```html
    <div class="activity-card">
        <div class="activity-card__header"></div>
        <div class="activity-card__body">
            <button class="btn btn--sm">Confirm</button>
        </div>
        <div class="activity-card__footer"></div>
    </div>
    ```

    scss

    ```scss
    .activity-card {
        &__header {}

        &__body {}

        &__footer {}
    }

    .btn {
        &--sm {}
        &--md {}
        &--lg {}
    }
    ```

7. 布林值字詞：使用 is or has 開頭

    ```javascript
    const isEmpty = false
    const hasFood = true
    ```
