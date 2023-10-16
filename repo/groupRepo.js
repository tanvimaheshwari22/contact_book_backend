import { sequelize } from "../config/db.js";
import GroupDetails, { GroupMembers } from "../model/group.js"

export const getGroups = async (userId) => {
    return sequelize.query(`SELECT *
                            FROM group_members AS M 
                            LEFT JOIN group_details AS D
                            ON M.group_id = D.id
                            LEFT JOIN user_details AS U
                            ON M.member_id = U.user_id
                            WHERE M.member_id = ${userId}`);
}

export const createGroup = async (name) => {
    return GroupDetails.create({
        group_name: name
    })
}

export const addGroupMember = async (groupId, memberId) => {
    return GroupMembers.create({
        group_id: groupId,
        member_id: memberId
    })
}

export const getGroupIdByName = async (name) => {
    const group = await GroupDetails.findOne({
        where: {
            group_name: name
        }
    })
    if (!group) {
        return undefined
    }
    // @ts-ignore
    return group.id
}