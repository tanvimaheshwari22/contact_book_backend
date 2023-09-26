import * as userSvc from '../service/userSvc.js'
import express from 'express'

const router = express.Router()

router.get("/", async (req, res) => {
    const users = await userSvc.getUsers(req);
    res.status(200).send({ data: users[0] })
})

router.get("/all", async (req, res) => {
    const users = await userSvc.getAllUsers();
    res.status(200).send({ data: users[0] })
})

router.get("/:id", async (req, res) => {
    const user = await userSvc.getUserByID(req.params.id)
    res.status(200).send({ data: user[0] })
})

export default router