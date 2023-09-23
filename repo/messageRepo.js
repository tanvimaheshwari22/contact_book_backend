import { sequelize } from "../config/db.js"
import Message from "../model/messages.js"

export const sendMessage = async (senderId, recieverId, message) => {
    return Message.create({
        sender_id: senderId,
        receiver_id: recieverId,
        message: message
    })
}

export const getMessages = async (user1_id, user2_id) => {
    return sequelize.query(`SElECT * from user_messages 
    WHERE (sender_id=${user1_id} AND receiver_id=${user2_id}) OR (sender_id=${user2_id} AND receiver_id=${user1_id}) ORDER BY created_at`)
}
