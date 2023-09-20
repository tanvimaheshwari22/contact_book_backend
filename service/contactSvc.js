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
            mobile_number: reqBody.mobile_number,
            status: "INVITED"
        })

        const newUser = await userRepo.findUserByMobileNumber(reqBody.mobile_number)
        // @ts-ignore
        return await contactRepo.createContact({
            name: `${reqBody.first_name} ${reqBody.last_name}`,
            user_id: req.user.user.user_id,
            // @ts-ignore
            contact_user_id: newUser.user_id,
            fav: reqBody.fav
        })
    }

    return await contactRepo.createContact({
        // @ts-ignore
        user_id: req.user.user.user_id,
        name: `${reqBody.first_name} ${reqBody.last_name}`,
        // @ts-ignore
        contact_user_id: user.user_id,
        fav: reqBody.fav
    })
}

export const getUserContacts = async () => {
    return await contactRepo.getUserContacts();
}

export const getUserContactById = async (req) => {
    if (req.query.search_value == undefined || req.query.search_value == "") {
        return contactRepo.getUserContactByUserId(req.user.user.user_id)
    }
    return contactRepo.getSearchUsers(req.user.user.user_id, req.query.search_value);
}
