/**
 * Cookie
 * @author Vicky
 * @description Cookie 相關操作
 */
const Cookie = {
    /**
     * get
     * @param {string} name Cookie 名稱
     * @returns {string} Cookie 值
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
};

export default Cookie;
