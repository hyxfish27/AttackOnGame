const EVENT_STATUS_MAP = {
    OUT_DATE: {
        text: '不可報名',
        tagcolor: 'mockup',
        barColor: 'bg-greyD4',
    },
    NOT_FORMED: {
        text: '未成團',
        tagcolor: 'bg-yellow',
        barColor: 'bg-blue-light',
    },
    FULL: {
        text: '已滿團',
        tagcolor: 'mockup',
        barColor: 'bg-green',
    },
    FORMED: {
        text: '已成團',
        tagcolor: 'bg-greyD4',
        barColor: 'bg-blue-light',
    },
};

export default EVENT_STATUS_MAP;
