import { sequelize } from "../config/db.js";
import UserContacts from "../model/contacts.js"
import User from "../model/users.js";

export const createContact = async (userContact) => {
    return await UserContacts.create(userContact)
}

export const getUserContacts = async () => {
    return sequelize.query("SELECT * FROM user_contacts");
}

export const getUserContactByUserId = async (userId) => {
    return sequelize.query(`SELECT C.contact_user_id, C.user_id , U.mobile_number, U.first_name, U.last_name, U.status
                            FROM user_contacts AS C LEFT JOIN user_details AS U
                            ON U.user_id = C.contact_user_id
                            WHERE C.user_id = ${userId}`);
}

export const getSearchUsers = async (userId, searchValue) => {
    return sequelize.query(`SELECT C.contact_user_id, C.user_id , U.mobile_number, U.first_name, U.last_name, U.status
    FROM user_contacts AS C LEFT JOIN user_details AS U 
    ON U.user_id = C.contact_user_id
    WHERE C.user_id = ${userId} AND (C.name LIKE '%${searchValue}%' OR U.mobile_number LIKE '%${searchValue}%')`);
};
