# 聚人 AttackOnGame

## 協作指南

### start

#### Node Version

```plaintext
v18.20.2
```

```bash
nvm use 18.20.2
```

git clone project

```bash
git clone git@github.com:hyxfish27/AttackOnGame.git
cd AttackOnGame
```

install node modules

```bash
npm install
```

start vite server

```bash
npm run dev
```

#### Vue3 x Vite

##### Vue version

```plaintext
v3.4.21
```

##### Vite version

```plaintext
v5.2.9
```

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
