import Axios from '@/utilities/axios';

/**
 * UserAPI
 * @author Vicky
 * @description 使用者相關 API
 */
const UserAPI = {
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
};

export default UserAPI;
