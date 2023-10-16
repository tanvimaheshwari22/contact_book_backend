import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define("user_details", {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: {
                msg: "invalid email"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    mobile_number: {
        type: DataTypes.STRING,
        unique: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
    },
    activity: {
        type: DataTypes.STRING,
        defaultValue: "OFFLINE"
    },
    picture: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

User.sync({ alter: true })

export default User