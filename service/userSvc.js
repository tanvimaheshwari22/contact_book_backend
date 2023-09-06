import * as userRepo from '../repo/userRepo.js'

export const getUsers = async () => {
    return await userRepo.getUsers();
}

export const RegisterUser = async (req) => {
    const reqBody = req.body

    console.log("req body:",reqBody);

    const userByNumber = await userRepo.findUserByMobileNumber(reqBody.mobileNumber)
    if (userByNumber === null) {
        return await userRepo.createUser({
            ...reqBody,
            status: "REGISTERED"
        })
    }

    const user = {
        ...reqBody,
        mobileNumber: reqBody.mobileNumber,
        status: "REGISTERED"
    }
    return await userRepo.updateUser(user)
}