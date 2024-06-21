import _ from 'lodash';

export default (value, { NaNString = '' } = {}) => {
    console.log('aaa', value);
    if (_.isNaN(value) || _.isNull(value)) {
        return NaNString || value;
    }
    const numberValue = _.toNumber(value);
    return numberValue.toLocaleString('en-US');
};
