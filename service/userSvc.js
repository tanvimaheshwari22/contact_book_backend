import * as userRepo from '../repo/userRepo.js'

export const getUsers = async () => {
    return await userRepo.getUsers();
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

    const user = {
        ...reqBody,
        mobile_number: reqBody.mobile_number,
        status: "REGISTERED"
    }
    return await userRepo.updateUser(user)
}