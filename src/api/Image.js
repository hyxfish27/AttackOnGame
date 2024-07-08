import Axios from '@/utilities/axios';
/// api/v1/image/player/upload/{{playerId}}
const ImageAPI = {
    /**
     * postPlayerImg
     * @param {String} playerId 用戶id
     * @description 上傳玩家照片
     */
    async postPlayerImg(playerId, file) {
        try {
            const fileData = new FormData();
            fileData.append('file', file);
            console.log('file', file);
            console.log('APIfileData', fileData);
            const response = await Axios.post(
                `/api/v1/image/player/upload/${playerId}`,
                fileData
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    /**
     * postStoreImg
     * @param {String} storeId 店家id
     * @description 上傳店家照片
     */
    async postStoreImg(storeId, file) {
        try {
            const fileData = new FormData();
            fileData.append('file', file);
            const response = await Axios.post(
                `/api/v1/image/store/upload/${storeId}`,
                fileData
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    /**
     * postEventImg
     * @param {String} eventId 活動id
     * @description 上傳活動照片
     */
    async postEventImg(eventId, file) {
        try {
            const fileData = new FormData();
            fileData.append('file', file);
            const response = await Axios.post(
                `/api/v1/image/event/upload/${eventId}`,
                fileData
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default ImageAPI;
