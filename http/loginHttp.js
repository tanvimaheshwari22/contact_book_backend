import * as userSvc from '../service/userSvc.js'
import jwt from 'jsonwebtoken'
import express from 'express'

const router = express.Router()

const jwtAccessToken = process.env.JWT_ACCESS_TOKEN
const jwtRefreshToken = process.env.JWT_REFRESH_TOKEN

router.post("/register", async (req, res) => {
    const user = await userSvc.RegisterUser(req)
    if (user == "User name already exist") {
        return res.status(400).send({ success: false, msg: user })
    }
    res.status(200).send({ success: true, data: user })
})

router.post("/login", async (req, res) => {
    const user = await userSvc.findUserByMobileNumber(req)

    if (user == null) {
        return res.status(404).send({ msg: "User does not Exist" })
    }

    // @ts-ignore
    if (user.status !== "REGISTERED") {
        return res.status(404).send({ msg: "User does not Registered" })
    }

    // @ts-ignore
    if (user.password != req.body.password) {
        return res.status(400).send({ msg: "Invalid Credentials" })
    }

    const accessToken = jwt.sign({ user }, jwtAccessToken, {
        expiresIn: "1d"
    })

    const refreshToken = jwt.sign({ user }, jwtRefreshToken, {
        expiresIn: "3d"
    })

    const userData = {
        // @ts-ignore
        name: `${user.first_name} ${user.last_name}`,
        // @ts-ignore
        mobileNumber: user.mobile_number,
        // @ts-ignore
        userId: user.user_id,
    };

    res.status(200).send({ isVerified: true, accessToken, refreshToken, data: userData })
})

export default router