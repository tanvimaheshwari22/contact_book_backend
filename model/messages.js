import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Message = sequelize.define("user_messages", {
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
})

Message.sync({ alter: true })

export default Message