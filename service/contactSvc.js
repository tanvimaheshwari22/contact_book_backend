import * as userRepo from "../repo/userRepo.js"
import * as contactRepo from "../repo/contactRepo.js"

export const addUserToContactList = async (req) => {
    const reqBody = req.body
    const user = await userRepo.findUserByMobileNumber(reqBody.mobile_number)
    let addedUser
    if (user === null) {
        addedUser = await userRepo.createUser({
            first_name: reqBody.first_name,
            last_name: reqBody.last_name,
            mobile_number: reqBody.mobilmobile_numbereNumber,
            status: "INVITED"
        })

        // @ts-ignore
        return await contactRepo.createContact({
            user_id: addedUser.dataValues.user_id,
            contact_user_id: reqBody.contact_user_id,
            fav: reqBody.fav
        })
    }

    return await contactRepo.createContact({
        // @ts-ignore
        user_id: user.user_id,
        contact_user_id: reqBody.contact_user_id,
        fav: reqBody.fav
    })
}

export const getUserContacts = async () => {
    return await contactRepo.getUserContacts();
}

export const getUserContactById = async (userId) => {
    return contactRepo.getUserContactByUserId(userId)
}
