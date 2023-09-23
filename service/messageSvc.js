
import * as messageRepo from '../repo/messageRepo.js'

export const getMessages = async (req) => {
    console.log("req user :", req.user);
    return messageRepo.getMessages(req.user.user.user_id, req.query.user2Id)
}

export const sendMessage = async (req) => {
    const reqBody = req.body
    return messageRepo.sendMessage(
        req.user.user.user_id,
        reqBody.receiverId,
        reqBody.message,
    )
}
