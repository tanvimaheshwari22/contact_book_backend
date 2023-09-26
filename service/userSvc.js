import * as userRepo from '../repo/userRepo.js'

export const getUsers = async (req) => {
    return await userRepo.getUsers(req.user.user.user_id);
}

export const getAllUsers = async () => {
    return await userRepo.getAllUsers();
}

export const RegisterUser = async (req) => {
    const reqBody = req.body
    const userByNumber = await userRepo.findUserByMobileNumber(reqBody.mobile_number)
    if (userByNumber === null) {
        return await userRepo.createUser({
            ...reqBody,
            status: "REGISTERED"
        })
    }
    const reqUserName = `${reqBody.first_name} ${reqBody.last_name}`
    const users = await userRepo.getAllUsers();
    for (let i = 0; i < users.length; i++) {
        // @ts-ignore
        const userName = `${users[i].first_name} ${users[i].last_name}`
        if (userName === reqUserName) {
            return "User name already exist"
        }
    }

    const user = {
        ...reqBody,
        mobile_number: reqBody.mobile_number,
        status: "REGISTERED"
    }
    return await userRepo.updateUser(user)
}

export const findUserByMobileNumber = async (req) => {
    const reqBody = req.body
    return userRepo.findUserByMobileNumber(reqBody.mobile_number)
}

export const logout = async (req) => {
    const reqBody = req.body
    return userRepo.logout(reqBody.userId)
}

export const login = async (userId) => {
    return userRepo.login(userId)
}

export const getUserByID = async (userID) => {
    return userRepo.getUserByID(userID)
}