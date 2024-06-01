/**
 * toPlayerViewObject
 * @author Vicky
 * @param {Object} player              後端回傳的玩家資料
 * @param {string} player._id          玩家 id
 * @param {string} player.name         玩家名稱
 * @param {string} player.user         玩家的使用者 id
 * @param {string} player.phone        玩家的電話
 * @param {string} player.avatar       玩家的頭像
 * @param {Array}  player.preferGame   喜好的遊戲
 * @param {number} player.__v          TODO: 未知欄位
 * @description 將後端回傳的玩家資料轉換成前端玩家資料
 */
const toViewObject = ({ _id, name, user, phone, avatar, preferGame, __v }) => {
    return {
        id: _id,
        role: 'player',
        name,
        user,
        phone,
        avatar,
        preferGame,
        v: __v,
    };
};

const playerAdapter = {
    toViewObject,
};

export default playerAdapter;
