import * as userRepo from "../repo/userRepo.js"
import * as contactRepo from "../repo/contactRepo.js"

import nodemailer from "nodemailer"

export const addUserToContactList = async (req) => {
    const reqBody = req.body
    const user = await userRepo.findUserByMobileNumber(reqBody.mobile_number)
    let addedUser
    if (user === null) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_ID,
            to: 'tanvimaheshwari67@gmail.com', // email id should be from request body
            subject: `${req.user.user.first_name} invited you to join chat`,
            text: `${req.user.user.first_name} invited you to join chat by adding you in their
                    contact, if want to connect back then click on below link to register :`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error: ", error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        addedUser = await userRepo.createUser({
            first_name: reqBody.first_name,
            last_name: reqBody.last_name,
            mobile_number: reqBody.mobile_number,
            email: reqBody.email,
            status: "INVITED"
        })

        const newUser = await userRepo.findUserByMobileNumber(reqBody.mobile_number)
        // @ts-ignore
        return await contactRepo.createContact({
            name: `${reqBody.first_name} ${reqBody.last_name}`,
            user_id: req.user.userData.userId,
            // @ts-ignore
            contact_user_id: newUser.user_id,
            fav: reqBody.fav
        })
    }

    return await contactRepo.createContact({
        // @ts-ignore
        user_id: req.user.userData.userId,
        name: `${reqBody.first_name} ${reqBody.last_name}`,
        // @ts-ignore
        contact_user_id: user.user_id,
        fav: reqBody.fav
    })
}

export const getUserContacts = async () => {
    return await contactRepo.getUserContacts();
}

export const getUserContactByUserId = async (req) => {
    return getUserContactByUserId(req.query.userId)
}

export const getUserContactById = async (req) => {
    if (req.query.search_value == undefined || req.query.search_value == "") {
        return contactRepo.getUserContactByUserId(req.query.userId)
    }
    return contactRepo.getSearchUsers(req.query.userId, req.query.search_value);
}
