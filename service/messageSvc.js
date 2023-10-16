
import { CLIENTS } from '../index.js';
import * as messageRepo from '../repo/messageRepo.js'

export const getMessages = async (req) => {
    return messageRepo.getMessages(req.user.userData.userId, req.query.user2Id)
}

export const sendMessage = async (req) => {
    const reqBody = req.body
    if (CLIENTS[`${reqBody.receiverId}`]) {
        CLIENTS[`${reqBody.receiverId}`].send(JSON.stringify({
            receiverId: reqBody.receiverId,
            senderId: req.user.userData.userId,
            message: reqBody.message
        }));
    }
    return messageRepo.sendMessage(
        req.user.userData.userId,
        reqBody.receiverId,
        reqBody.message,
    )
}

export const sendGroupMessage = async (req) => {
    const reqBody = req.body
    const response = await messageRepo.getGroupMembers(reqBody.groupId)
    // @ts-ignore
    const memberIds = response[0].map(r => r.member_id)
    const receiverIds = memberIds.filter(m => m != req.user.userData.userId)
    for (let i = 0; i < receiverIds.length; i++) {
        if (CLIENTS[`${receiverIds[i]}`]) {
            CLIENTS[`${receiverIds[i]}`].send(JSON.stringify({
                receiverId: receiverIds[i],
                senderId: req.user.userData.userId,
                message: reqBody.message,
                groupId: reqBody.groupId
            }));
        }
    }
    return messageRepo.sendGroupMessage(reqBody.groupId, reqBody.message, req.user.userData.userId)
}

export const getGroupMessages = async (req) => {
    return messageRepo.getGroupMessages(req.query.groupId)
}

export const getMessagesRequest = async () => {
    return messageRepo.getMessagesRequest()
}

export const updateMsgStatus = async (req) => {
    const res = await messageRepo.areAllMsgRead(req.user.userData.userId, req.body.contactUserID)
    if (res) {
        return
    }

    if (CLIENTS[`${req.body.contactUserID}`]) {
        CLIENTS[`${req.body.contactUserID}`].send(JSON.stringify({
            msgStatus: "READ",
            idToUpdate: req.user.userData.userId
        }));
    }
    return messageRepo.updateMsgStatus(req.user.userData.userId)
}
