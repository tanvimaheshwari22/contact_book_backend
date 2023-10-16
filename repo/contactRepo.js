import { sequelize } from "../config/db.js";
import UserContacts from "../model/contacts.js"

export const createContact = async (userContact) => {
    return await UserContacts.create(userContact)
}

export const getUserContacts = async () => {
    return sequelize.query("SELECT * FROM user_contacts");
}

export const getUserContactByUserId = async (userId) => {
    return sequelize.query(`SELECT C.contact_user_id, C.user_id , U.mobile_number, U.first_name, U.last_name, U.status, U.picture, U.activity
                            FROM user_contacts AS C LEFT JOIN user_details AS U
                            ON U.user_id = C.contact_user_id
                            WHERE C.user_id = ${userId}`);
}

export const getSearchUsers = async (userId, searchValue) => {
    return sequelize.query(`SELECT C.contact_user_id, C.user_id , U.mobile_number, U.first_name, U.last_name, U.status, U.picture, U.activity
    FROM user_contacts AS C LEFT JOIN user_details AS U 
    ON U.user_id = C.contact_user_id
    WHERE C.user_id = ${userId} AND (C.name LIKE '%${searchValue}%' OR U.mobile_number LIKE '%${searchValue}%')`);
};

export const findUser = async (user1, user2) => {
    return await UserContacts.findOne({
        where: {
            contact_user_id: user1,
            user_id: user2
        }
    })
}
