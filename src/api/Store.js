import Axios from '@/utilities/axios';

/**
 * StoreAPI
 * @author Vicky
 * @description 商店相關 API
 */
const StoreAPI = {
    /**
     * create
     * @param {*} data
     * @description 新增商店資料
     */
    async create(data) {
        try {
            const response = await Axios.post('/api/v1/store', data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * get
     * @param {string} userId  使用者 ID
     * @description 取得商店資料
     */
    async get(userId) {
        try {
            const response = await Axios.get(`/api/v1/store/${userId}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * update
     * @param {*} data
     * @description 更新商店資料
     */
    async update(data) {
        try {
            const response = await Axios.put('', data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * delete
     * @description 刪除商店資料
     */
    async delete() {
        try {
            const response = await Axios.delete('');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * getRating
     * @description 取得商店評分
     */
    async getRating() {
        try {
            const response = await Axios.get('');
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default StoreAPI;
