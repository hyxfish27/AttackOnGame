import dayjs from '@/utilities/dayjs';

const today = dayjs();
export default (event) => {
    const isRegi =
        today.isSameOrBefore(event.registrationEndTime) &&
        today.isSameOrAfter(event.registrationStartTime);
    if (!isRegi) {
        return 'OUT_DATE';
    }
    if (event.currentParticipantsCount < event.minParticipants) {
        return 'NOT_FORMED';
    }
    if (event.currentParticipantsCount === event.maxParticipants) {
        return 'FULL';
    }
    return 'FORMED';
};
