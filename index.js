import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './http/userHttp.js'

const app = express();
const PORT = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use("/users", userRoutes)

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server is Successfully Running, 
                   and App is listening on port `+ PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);



