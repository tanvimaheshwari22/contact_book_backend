import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './http/userHttp.js'
import contactRoutes from './http/contactHttp.js'
import loginRoutes from './http/loginHttp.js'
import messageRoutes from './http/messageHttp.js'
import authenticateUser from './middleware/authentication.js';
import cors from 'cors'
import http from "http";
import { WebSocketServer } from 'ws'

const app = express();
const PORT = 5000;

const server = http.createServer(app);

const wsServer = new WebSocketServer({ server });

app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use("/", loginRoutes)
app.use("/users", authenticateUser, userRoutes)
app.use("/contacts", authenticateUser, contactRoutes)
app.use("/messages", authenticateUser, messageRoutes)



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
    ws.on('message', (data) => {
        userId = JSON.parse(data.toString()).userId
        CLIENTS[userId] = ws;
    })

    app.set("socket", ws)
});