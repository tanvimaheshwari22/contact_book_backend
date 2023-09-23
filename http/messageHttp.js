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

export default router
