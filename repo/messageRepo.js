import { sequelize } from "../config/db.js"
import GroupMessage from "../model/groupMessage.js"
import Message from "../model/messages.js"
import User from "../model/users.js"
import * as contactRepo from "../repo/contactRepo.js"

export const sendMessage = async (senderId, recieverId, message) => {
    const user = await contactRepo.findUser(senderId, recieverId)
    if (!user) {
        return Message.create({
            sender_id: senderId,
            receiver_id: recieverId,
            message: message,
            contact_status: "NotAddedBack"
        })
    }
    return Message.create({
        sender_id: senderId,
        receiver_id: recieverId,
        message: message,
        contact_status: "AddedBack"
    })
}

export const getMessages = async (user1_id, user2_id) => {
    return sequelize.query(`SELECT * from user_messages 
    WHERE (sender_id=${user1_id} AND receiver_id=${user2_id}) OR (sender_id=${user2_id} AND receiver_id=${user1_id}) ORDER BY created_at DESC`)
}

export const getGroupMessages = async (groupId) => {
    return sequelize.query(`SELECT *
                            FROM group_messages AS M 
                            LEFT JOIN user_details AS U
                            ON M.sender_id = U.user_id
                            WHERE M.group_id = ${groupId} ORDER BY created_at DESC`);
}

export const getGroupMembers = async (groupId) => {
    return sequelize.query(`SELECT member_id 
                            FROM group_members 
                            WHERE group_id = ${groupId}`)
}

export const sendGroupMessage = async (groupId, message, senderId) => {
    return GroupMessage.create({
        group_id: groupId,
        message: message,
        sender_id: senderId,
    })
}

export const getMessagesRequest = async () => {
    return Message.findAll({
        where: {
            contact_status: "NotAddedBack"
        },
        order: [
            ['created_at', 'ASC']
        ],
        include: User
    })
}

export const updateMsgStatus = async (userId) => {
    return Message.update({ seen: true }, {
        where: {
            receiver_id: userId
        }
    })
}

export const areAllMsgRead = async (receiverId, senderId) => {
    const message = await sequelize.query(`SELECT * from user_messages 
    WHERE (sender_id=${senderId} AND receiver_id=${receiverId}) AND (seen=false)`)
    if (message[0].length == 0) {
        return true
    }
    return false
}
