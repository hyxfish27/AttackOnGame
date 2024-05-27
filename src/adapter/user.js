/**
 * toUserViewObject
 * @author Vicky
 * @param {Object} user       使用者資料
 * @param {string} user.email 使用者 email
 * @param {string} user._id   使用者 id
 * @param {string} user.role  使用者角色
 * @description 將後端回傳的使用者資料轉換成前端使用者資料
 */
const toViewObject = ({ email, _id, role }) => {
    return {
        email,
        id: _id,
        role,
    };
};

const userAdapter = {
    toViewObject,
};

export default userAdapter;
