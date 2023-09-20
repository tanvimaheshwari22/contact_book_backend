import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
// import * as Joi from "joi";

// const userSchema = Joi.object().keys({
//     user_id: Joi.number().integer().required(),
//     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }),
//     password: Joi.string().alphanum().min(8).max(20),
//     first_name: Joi.string().alphanum().min(3).max(30),
//     last_name: Joi.string().alphanum().min(3).max(30),
//     mobile_number: Joi.string().length(10).pattern(/^([+]\d{2})?\d{10}$/).required(),
//     gender: Joi.string(),
//     status: Joi.string()
// });

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
        allowNull: true,
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
    }
})

// userSchema.validate(User)

User.sync({ alter: true })

export default User