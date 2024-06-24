import _ from 'lodash';

export default (value, { NaNString = '' } = {}) => {
    if (_.isNaN(value) || _.isNull(value)) {
        return NaNString || 0;
    }
    const numberValue = _.toNumber(value);
    return numberValue.toLocaleString('en-US');
};
