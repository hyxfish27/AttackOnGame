import _ from 'lodash';

export default (value, { NaNString = '' } = {}) => {
    if (_.isNaN(value) || _.isNull(value)) {
        return NaNString || value;
    }
    return _.toString(value).toLocaleString('en-US');
};
