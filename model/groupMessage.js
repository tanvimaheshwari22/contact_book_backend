import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./users.js";
import GroupDetails from "./group.js";

const GroupMessage = sequelize.define("group_messages", {
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
})

GroupMessage.belongsTo(User, {
    foreignKey: "sender_id",
    targetKey: "user_id"
});

GroupMessage.belongsTo(GroupDetails, {
    foreignKey: "group_id",
    targetKey: "id"
});

GroupMessage.sync({ alter: true })

export default GroupMessage