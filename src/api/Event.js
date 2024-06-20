import Axios from '@/utilities/axios';
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
        limit = 12,
        skip = 0,
        formationStatus = 0,
        registrationStatus = 0,
        sortBy = 'eventStartTime',
        sortOrder = 'desc',
        keyword = '',
    } = {}) {
        try {
            const params = new URLSearchParams();
            console.log(params);
            if (limit !== 12) params.append('limit', limit);
            if (skip !== 0) params.append('skip', skip);
            if (formationStatus !== 0)
                params.append('formationStatus', formationStatus);
            if (registrationStatus !== 0)
                params.append('registrationStatus', registrationStatus);
            if (sortBy !== 'eventStartTime') params.append('sortBy', sortBy);
            if (sortOrder !== 'desc') params.append('sortOrder', sortOrder);
            if (keyword !== '') params.append('keyword', keyword);

            const queryString = params.toString()
                ? `?${params.toString()}`
                : '';
            console.log(params);
            const response = await Axios.get(`/api/v1/event${queryString}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    /**
     * get
     * @param {String} id 活動id
     * @description 取得單一活動資料
     */
    async getEventID(id) {
        try {
            const response = await Axios.get(`/api/v1/event/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
export default EventAPI;
