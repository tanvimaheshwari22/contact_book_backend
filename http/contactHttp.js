import * as contactSvc from '../service/contactSvc.js'
import express from 'express'

const router = express.Router()

router.get("/", async (req, res) => {
    const users = await contactSvc.getUserContacts();
    res.status(200).send({ data: users })
})

router.get("/all", async (req, res) => {
    const users = await contactSvc.getUserContactById(req);
    res.status(200).send({ data: users[0] })
})

router.post("/", async (req, res) => {
    const user = await contactSvc.addUserToContactList(req)
    res.status(200).send({ isVerified: true, data: user })
})

export default router
