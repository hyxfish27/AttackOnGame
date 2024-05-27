/**
 * Cookie
 * @author Vicky
 * @description Cookie 相關操作
 */
const Cookie = {
    /**
     * get
     * @param {string} name  Cookie 名稱
     * @description 取得 Cookie 的值
     */
    get(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    },

    /**
     * set
     * @param {string} name  Cookie 名稱
     * @param {string} value Cookie 值
     * @param {number} days  Cookie 有效天數
     * @description 設定 Cookie
     */
    set({ name, value, days }) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value || ''}${expires}; path=/`;
    },

    /**
     * isExpire
     * @param {string} name  Cookie 名稱
     * @description 檢查 Cookie 是否過期
     */
    checkIsExpire(name) {
        const isExpire = this.get(name);

        return isExpire;
    },

    /**
     * delete
     * @param {string} name Cookie 名稱
     * @description 刪除 Cookie
     */
    delete(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },

    /**
     * clear
     * @description 清除所有 Cookie
     */
    clear() {
        const cookies = document.cookie.split(';');
        cookies.forEach((cookie) => {
            const parts = cookie.split('=');
            const name = parts.shift().trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
    },
};

export default Cookie;
