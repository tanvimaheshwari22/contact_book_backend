import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './http/userHttp.js'
import contactRoutes from './http/contactHttp.js'
import loginRoutes from './http/loginHttp.js'
import messageRoutes from './http/messageHttp.js'
import groupRoutes from './http/groupHttp.js'
import authenticateUser from './middleware/authentication.js';
import cors from 'cors'
import http from "http";
import { WebSocketServer } from 'ws'
import * as userRepo from './repo/userRepo.js'
import * as contactRepo from "./repo/contactRepo.js"

const app = express();
const PORT = 5000;

const server = http.createServer(app);

const wsServer = new WebSocketServer({ server });

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use("/", loginRoutes)
app.use("/users", authenticateUser, userRoutes)
app.use("/contacts", authenticateUser, contactRoutes)
app.use("/messages", authenticateUser, messageRoutes)
app.use("/groups", authenticateUser, groupRoutes)

server.listen(PORT, (error) => {
    if (!error)
        console.log(`Server is Successfully Running, 
                   and App is listening on port `+ PORT)
    else
        console.log("Error occurred, server can't start", error);
});


export const CLIENTS = {};

wsServer.on('connection', (ws, request) => {
    let userId
    ws.on('message', async (data) => {
        userId = JSON.parse(data.toString()).userId
        userRepo.updateActivity(userId, "ONLINE")
        CLIENTS[userId] = ws;

        for (const key in CLIENTS) {
            const users = await contactRepo.getUserContactByUserId(key)
            for (let i = 0; i < users[0].length; i++) {
                // @ts-ignore
                if (users[0][i].contact_user_id == userId) {
                    CLIENTS[`${key}`].send(JSON.stringify({
                        update: "activity updated",
                        clientId: key
                    }))
                }
            }
        }
    })

    ws.on('close', async (data) => {
        let curUser
        for (const key in CLIENTS) {
            if (CLIENTS[key]._closeCode === data) {
                userRepo.updateActivity(key, "OFFLINE")
                curUser = key
                delete CLIENTS[`${key}`]
            }
        }
        for (const key in CLIENTS) {
            const users = await contactRepo.getUserContactByUserId(key)
            for (let i = 0; i < users[0].length; i++) {
                // @ts-ignore
                if (users[0][i].contact_user_id == curUser) {
                    CLIENTS[`${key}`].send(JSON.stringify({
                        update: "activity updated",
                        clientId: key
                    }))
                }
            }
        }
    })

    app.set("socket", ws)
});