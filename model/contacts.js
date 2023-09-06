import User from "./users.js";

import DataTypes from "sequelize"
import { sequelize } from "../config/db.js"

const UserContacts = sequelize.define("user_contacts", {
    fav: {
        type: DataTypes.BOOLEAN
    }
})

UserContacts.belongsTo(User, {
    foreignKey: "contact_user_id",
    targetKey: "user_id"
});

UserContacts.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id"
});

User.hasMany(UserContacts, { foreignKey: "user_id" });

UserContacts.sync({ alter: true })

export default UserContacts