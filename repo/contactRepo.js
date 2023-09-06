import { sequelize } from "../config/db.js";
import UserContacts from "../model/contacts.js"

export const createContact = async (userContact) => {
    return await UserContacts.create(userContact)
}

export const getUserContacts = async () => {
    return sequelize.query("SELECT * FROM user_contacts");
}

export const getUserContactByUserId = async (userId) => {
    return sequelize.query(`SELECT C.contact_user_id, C.user_id , U.mobile_number
                            FROM user_contacts AS C LEFT JOIN user_details AS U 
                            ON U.user_id = C.contact_user_id
                            WHERE C.user_id= ${userId}`);
}