import * as groupRepo from "../repo/groupRepo.js"
import * as userRepo from "../repo/userRepo.js"
import nodemailer from "nodemailer"

export const getGroups = async (req) => {
    return groupRepo.getGroups(req.user.userData.userId)
}

export const createGroup = async (req) => {
    const reqBody = req.body

    await groupRepo.createGroup(reqBody.name)
    const groupId = await groupRepo.getGroupIdByName(reqBody.name)

    reqBody.members.push(req.user.userData.userId)

    for (let i = 0; i < reqBody.members.length; i++) {
        const user = await userRepo.getUserByID(reqBody.members[i])
        // @ts-ignore
        if (user[0][0].status === "INVITED") {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ID,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            var mailOptions = {
                from: process.env.EMAIL_ID,
                to: 'tanvimaheshwari67@gmail.com', // email id should be user.email
                subject: `${reqBody.name} invited you to join group`,
                text: `${reqBody.name} invited you to join group by adding you in their
                        contact, if want to connect back then click on below link to register :`,
                // html: <a href="https://9.109.124.229:9100/"> Click here </a>
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error: ", error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        await groupRepo.addGroupMember(groupId, reqBody.members[i])
    }
    return
}

export const getGroupIdByName = async (name) => {
    return groupRepo.getGroupIdByName(name)
}