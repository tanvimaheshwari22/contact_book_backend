import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./users.js";

const Message = sequelize.define("user_messages", {
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
    },
    attachment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    contact_status: {
        type: DataTypes.STRING,
    },
    seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

Message.belongsTo(User, {
    foreignKey: "sender_id",
    targetKey: "user_id"
});

Message.sync({ alter: true })

export default Message