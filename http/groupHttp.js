import express from 'express'
import * as groupSvc from '../service/groupSvc.js'

const router = express.Router()

router.get("/", async (req, res) => {
    const messages = await groupSvc.getGroups(req)
    res.status(200).send({ data: messages[0] })
})

router.post('/', async (req, res) => {
    if (req.body.members.length == 0) {
        return res.status(400).send({ msg: "select atleast one member to create group" })
    }

    const groupId = await groupSvc.getGroupIdByName(req.body.name)

    if (groupId) {
        return res.status(400).send({ msg: "Group name already Exist" })
    }

    const data = await groupSvc.createGroup(req)
    res.status(200).send({ data: data })
})

export default router