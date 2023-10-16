import express from 'express'
import * as messageSvc from '../service/messageSvc.js'

const router = express.Router()

router.get("/", async (req, res) => {
    const messages = await messageSvc.getMessages(req)
    res.status(200).send({ data: messages[0] })
})

router.post("/send", async (req, res) => {
    const message = await messageSvc.sendMessage(req)
    res.status(200).send({ success: true, data: message })
})

router.post("/groupMessages/send", async (req, res) => {
    const message = await messageSvc.sendGroupMessage(req)
    res.status(200).send({ success: true, data: message })
})

router.get("/groupMessages", async (req, res) => {
    const messages = await messageSvc.getGroupMessages(req)
    res.status(200).send({ success: true, data: messages[0] })
})

router.get("/request", async (req, res) => {
    const message = await messageSvc.getMessagesRequest()
    res.status(200).send({ success: true, data: message })
})

router.put("/status", async (req, res) => {
    await messageSvc.updateMsgStatus(req)
    res.status(200).send({ success: true })
})

export default router
