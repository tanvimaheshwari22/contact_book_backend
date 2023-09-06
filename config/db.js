import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config();

const db = process.env.PG_DATABASE
const username = process.env.PG_USER
const password = process.env.PG_PASSWORD
const host = process.env.PG_HOST

export const sequelize = new Sequelize(db,username,password,{
    host:host,
    dialect:'postgres',
})

const testdbConn = async () => {
    try{
        await sequelize.authenticate();
        console.log("connection established");
    }catch(e){
        console.log("error:",e);
    }
}

export default testdbConn