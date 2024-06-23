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
};
export default EventAPI;
