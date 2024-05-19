import { TeamMember, User } from "@/types";

export const isManager = (managerId : TeamMember['_id'], userId : User['_id'])=>{
    return managerId === userId
}