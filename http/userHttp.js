import * as userSvc from '../service/userSvc.js'
import jwt from 'jsonwebtoken'
import express from 'express'

const router = express.Router()

const jwtAccessToken = process.env.JWT_ACCESS_TOKEN
const jwtRefreshToken = process.env.JWT_REFRESH_TOKEN

router.get("/", async (req, res) => {
    const users = await userSvc.getUsers();
    res.status(200).send({ data: users })
})

router.post("/", async (req, res) => {
    const user = await userSvc.RegisterUser(req)

    const accessToken = jwt.sign({user}, jwtAccessToken, {
        expiresIn: "1d"
    })

    const refreshToken = jwt.sign({user}, jwtRefreshToken, {
        expiresIn: "3d"
    })
    res.status(200).send({ isVerified: true, accessToken, refreshToken, data: user })
})

export default router