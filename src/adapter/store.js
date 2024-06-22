/**
 * toViewObject
 * @author Vicky
 */
const toViewObject = ({
    _id,
    name,
    user,
    avatar,
    introduce,
    address,
    phone,
}) => {
    return {
        id: _id,
        name,
        user,
        avatar,
        introduce,
        address,
        phone,
    };
};

const storeAdapter = {
    toViewObject,
};

export default storeAdapter;
