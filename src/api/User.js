import Axios from '@/utilities/axios';
import cookie from '@/utilities/cookie/cookie';

/**
 * UserAPI
 * @author Vicky
 * @description 使用者相關 API
 */
const UserAPI = {
    /**
     * signUp
     * @param {string} email      使用者信箱
     * @param {string} password   使用者密碼
     * @param {string} role   使用者角色
     * @description 使用者註冊
     */
    async signUp(data) {
        try {
            const response = await Axios.post('/api/v1/user', data);
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * login
     * @param {string} email      使用者信箱
     * @param {string} password   使用者密碼
     * @description 使用者登入
     */

    async login({ email, password }) {
        try {
            const response = await Axios.post('/api/v1/login', {
                email,
                password,
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * checkIsLogin
     * @description 檢查使用者登入狀態
     */
    async checkIsLogin() {
        try {
            const response = await cookie.checkIsExpire('AttackOnGameJWT');
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * logout
     * @description 使用者登出
     */
    async logout() {
        try {
            await cookie.delete('AttackOnGameJWT');
            localStorage.removeItem('attack-on-game-user');
            window.location.reload();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default UserAPI;
