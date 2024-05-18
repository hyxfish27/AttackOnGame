import Axios from '@/utilities/axios';

/**
 * StoreAPI
 * @author Vicky
 * @description 商店相關 API
 */
export const StoreAPI = {
    /**
     * create
     * @param {*} data
     * @description 新增商店資料
     */
    async create(data) {
        try {
            const response = await Axios.post('', data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    /**
     * get
     * @description 取得商店資料
     */
    async get() {
        try {
            const response = await Axios.get('');
            return response.data;
        } catch (error) {
            console.error(error);
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
        }
    },
};

export default StoreAPI;
