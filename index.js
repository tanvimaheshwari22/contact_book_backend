import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './http/userHttp.js'
import contactRoutes from './http/contactHttp.js'
import loginRoutes from './http/loginHttp.js'
import messageRoutes from './http/messageHttp.js'
import authenticateUser from './middleware/authentication.js';
import cors from 'cors'

const app = express();
const PORT = 5000;

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


app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server is Successfully Running, 
                   and App is listening on port `+ PORT)
    else
        console.log("Error occurred, server can't start", error);
});
