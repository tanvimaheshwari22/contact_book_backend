import * as userSvc from '../service/userSvc.js'
import express from 'express'

const router = express.Router()

router.get("/user", async (req, res) => {
    const user = await userSvc.getUserByID(req.query.id)
    res.status(200).send({ data: user[0] })
})

router.get("/", async (req, res) => {
    const users = await userSvc.getUsers(req);
    res.status(200).send({ data: users[0] })
})

router.get("/all", async (req, res) => {
    const users = await userSvc.getAllUsers();
    res.status(200).send({ data: users[0] })
})

router.put("/", async (req, res) => {
    await userSvc.updateUser(req)
    res.status(200).send({ success: true })
})

export default router