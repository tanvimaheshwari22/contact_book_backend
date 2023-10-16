import { sequelize } from "../config/db.js";
import User from "../model/users.js"

export const getUsers = async (userId) => {
    return sequelize.query(`SELECT * FROM user_details WHERE user_id != ${userId}`);
}

export const getAllUsers = async () => {
    return sequelize.query(`SELECT * FROM user_details`);
}

export const findUserByMobileNumber = async (mobileNumber) => {
    return await User.findOne({
        where: {
            mobile_number: mobileNumber
        }
    })
}

export const createUser = async (user) => {
    return User.create(user)
}

export const updateUser = async (user) => {
    const userByNumber = await findUserByMobileNumber(user.mobile_number)
    return await User.update(user, {
        where: {
            // @ts-ignore
            user_id: userByNumber.user_id,
            mobile_number: user.mobile_number,
        },
        returning: true
    },
    )
}

export const findByEmailAndPassword = async (email, password) => {
    return await User.findOne({
        where: {
            email: email,
            password: password
        }
    })
}

export const logout = async (userId) => {
    return User.update({ activity: "OFFLINE" }, {
        where: {
            user_id: userId
        }
    })
}

export const login = async (userId) => {
    return User.update({ activity: "ONLINE" }, {
        where: {
            user_id: userId
        }
    })
}

export const getUserByID = async (userId) => {
    return sequelize.query(`SELECT * FROM user_details WHERE user_id = ${userId}`)
}

export const updateActivity = async (userId, status) => {
    return User.update({ activity: status }, {
        where: {
            user_id: userId
        }
    })
}
