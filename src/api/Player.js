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
            const response = await Axios.post('/api/v1/user', data);
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * get
     * @param {string} userId  使用者 id
     * @description 取得玩家資料
     */
    async get(userId) {
        try {
            const response = await Axios.get(`/api/v1/player/${userId}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * update
     * @param {string} playerId    玩家 ID
     * @param {string} name        玩家名稱
     * @param {string} phone       玩家電話
     * @param {string} preferGame  喜好遊戲
     * @param {string} avatar      玩家頭像
     * @description 更新玩家資料
     */
    async update({ playerId, name, phone, preferGame, avatar }) {
        try {
            const response = await Axios.patch(`/api/v1/player/${playerId}`, {
                name,
                phone,
                preferGame,
                avatar,
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
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
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default PlayerAPI;
