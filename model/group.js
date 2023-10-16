import User from "./users.js";

import DataTypes from "sequelize"
import { sequelize } from "../config/db.js"

const GroupDetails = sequelize.define("group_details", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    group_name: {
        type: DataTypes.STRING,
        unique: true
    }
})

export const GroupMembers = sequelize.define("group_members", {})

GroupMembers.belongsTo(GroupDetails, {
    foreignKey: "group_id",
    targetKey: "id"
});

GroupMembers.belongsTo(User, {
    foreignKey: "member_id",
    targetKey: "user_id"
});

GroupDetails.hasMany(GroupMembers, { foreignKey: "group_id" });
User.hasMany(GroupMembers, { foreignKey: "member_id" });

GroupDetails.sync({ alter: true })
GroupMembers.sync({ alter: true })

export default GroupDetails