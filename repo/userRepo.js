import User from "../model/users.js"

export const getUsers = async () => {
    return await User.findAll();
}

export const findUserByMobileNumber = async (mobileNumber) => {
    return await User.findOne({
        where: {
            mobile_number: mobileNumber
        }
    })
}

export const createUser = async (user) => {
    return await User.create(user)
}

export const updateUser = async (user) => {
    const userByNumber = await findUserByMobileNumber(user.mobile_number)
    return await User.update(user, {
        where: {
            // @ts-ignore
            user_id: userByNumber.user_id
        },
        returning: true
    },
    )
}