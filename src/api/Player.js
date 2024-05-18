import Axios from '@/utilities/axios';

/**
 * PlayerAPI
 * @author Vicky
 * @description 玩家相關 API
 */
const PlayerAPI = {
    /**
     * create
     * @param {*} data
     * @description 新增玩家資料
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
     * @description 取得玩家資料
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
     * @description 更新玩家資料
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
     * @param {*} data
     * @description 刪除玩家資料
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

export default PlayerAPI;
