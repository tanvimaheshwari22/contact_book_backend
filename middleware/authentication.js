import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const jwtAccessToken = process.env.JWT_ACCESS_TOKEN

const authenticateUser = (req, res, next) => {
    const accessToken = req.headers["access_token"]

    jwt.verify(accessToken, jwtAccessToken, async (err, user) => {
        if (user) {
            req.user = user;
            next();
        } else if (err.name === "TokenExpiredError") {
            return res.status(401).send({ msg: "Access Token Expired" })
        } else {
            return res.status(401).send({ msg: "User not Authenticated" })
        }
    })
}

export default authenticateUser