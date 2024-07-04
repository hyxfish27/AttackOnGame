import Axios from '@/utilities/axios';
import {
    LIMIT,
    SKIP,
    FORMATION_STATUS,
    REGISTRATION_STATUS,
    SORT_BY,
    SORT_ORDER,
} from '../constant/eventList';
/**
 * ActivityAPI
 * @author Sweet
 * @description 取得全站商店、活動的 API
 */
const EventAPI = {
    /**
     * get
     * @description 取得所有店家資料
     */
    async getStores() {
        try {
            const response = await Axios.get('/api/v1/store');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    /**
     * get
     * @param {String} id 店家id
     * @description 取得單一店家資料
     */
    async getStore(id) {
        try {
            const response = await Axios.get(`/api/v1/store/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    /**
     * get
     * @limit 抓取的筆數
     * @description 取得所有活動資料
     */
    async getEvents({
        limit = LIMIT,
        skip = SKIP,
        formationStatus = FORMATION_STATUS,
        registrationStatus = REGISTRATION_STATUS,
        sortBy = SORT_BY,
        sortOrder = SORT_ORDER,
        keyword = '',
    } = {}) {
        try {
            const params = new URLSearchParams();
            console.log(params);
            if (limit !== 12) params.append('limit', limit);
            if (skip !== SKIP) params.append('skip', skip);
            if (formationStatus !== FORMATION_STATUS)
                params.append('formationStatus', formationStatus);
            if (registrationStatus !== REGISTRATION_STATUS)
                params.append('registrationStatus', registrationStatus);
            if (sortBy !== SORT_BY) params.append('sortBy', sortBy);
            if (sortOrder !== SORT_ORDER) params.append('sortOrder', sortOrder);
            if (keyword !== '') params.append('keyword', keyword);

            const queryString = params.toString()
                ? `?${params.toString()}`
                : '';
            console.log(params);
            const response = await Axios.get(`/api/v1/event${queryString}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error.response;
        }
    },

    /**
     * getEvent
     * @param {String} eventId 活動id
     * @description 取得單一活動資料
     */
    async getEvent(eventId) {
        try {
            const response = await Axios.get(`/api/v1/event/${eventId}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    } /**
     * getStoreIdEvent
     * @param {String} storeId 店家id
     * @description 取得單一活動資料
     */,
    async getStoreEvent(storeId) {
        try {
            const response = await Axios.get(`/api/v1/event/store/${storeId}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    /**
     * postEvent
     * @param {String} title 活動名稱
     * @param {String} description 活動介紹
     * @param {String} eventStartTime 活動開始日期
     * @param {String} eventEndTime 活動截止日期
     * @param {String} registrationStartTime 報名開始日期
     * @param {String} registrationEndTime 報名截止日期
     * @param {Boolean} isFoodAllowed 是否可攜帶食物
     * @param {Number} maxParticipants 最大參與人數
     * @param {Number} minParticipants 最小/成團參與人數
     * @param {Number} participationFee 票價
     * @param {String} address 地址
     * @param {String} eventImageUrl 圖片
     * @description 店家新增活動
     */
    async postEvent(data) {
        try {
            const response = await Axios.post('/api/v1/event/', data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * getEventMessage
     * @param {String} eventId 活動id
     * @description 取得單一活動留言
     */
    async getEventMessage(eventId) {
        try {
            const response = await Axios.get(
                `/api/v1/event/${eventId}/messageBoard`
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    /**
     * postEventMessage
     * @param {String} eventId 活動id
     * @param {String} content 留言內容
     * @description 玩家活動留言
     */
    async postEventMessage(eventId, content) {
        try {
            const response = await Axios.post(
                `/api/v1/event/${eventId}/messageBoard`,
                content
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    /**
     * postReplyMessage
     * @param {String} eventId 活動id
     * @param {String} content 留言內容
     * @param {String} messageId 留言的 _id 值，指定的留言串留言
     * @description 玩家活動留言
     */
    async postReplyMessage(eventId, messageId, content) {
        try {
            const response = await Axios.post(
                `/api/v1/event/${eventId}/messageBoard/${messageId}/reply`,
                content
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
export default EventAPI;
