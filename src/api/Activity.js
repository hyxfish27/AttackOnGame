import Axios from '@/utilities/axios';

/**
 * ActivityAPI
 * @author Vicky
 * @description 活動相關 API
 */
const ActivityAPI = {
    /**
     * create
     * @param {*} data
     * @returns 新增一筆活動資料
     */
    async create(data) {
        try {
            const response = await Axios.post('', data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * getAll
     * @description 取得所有活動資料
     */
    async getAll() {
        try {
            const response = await Axios.get('');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * getOne
     * @param {string} id
     * @description 取得單一活動資料
     */
    async getOne() {
        try {
            const response = await Axios.get('');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * update
     * @param {*} data
     * @description 更新活動資料
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
     * @description 刪除活動資料
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
};

export default ActivityAPI;
