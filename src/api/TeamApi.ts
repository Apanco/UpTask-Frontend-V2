import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { TeamSchema, User, genericResponseSchema, teamMemberSchema, type Project, type TeamMemberForm } from "@/types";

type TeamApi = {
    projectId : Project['_id']
    formData: TeamMemberForm
    id: User['_id']
}

export async function findMemberByEmail({projectId, formData} : Pick<TeamApi, "formData" | "projectId">){
    try {
        const url= `/projects/${projectId}/team/find`
        const {data} = await api.post(url, formData)
        const result = teamMemberSchema.safeParse(data)
        if(result.success){
            return result.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }   
}
export async function addMember({projectId, id} : Pick<TeamApi, "projectId" | "id">){
    try {
        const url= `/projects/${projectId}/team`
        const {data} = await api.post(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }   
}
export async function getProjectTeam({projectId} : Pick<TeamApi, "projectId">){
    try {
        const url= `/projects/${projectId}/team`
        const {data} = await api(url)
        const result = TeamSchema.safeParse(data)
        if(result.success){
            return result.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }   
}
export async function removeMember({projectId, id} : Pick<TeamApi, "projectId" | "id">){
    try {
        const url= `/projects/${projectId}/team/${id}`
        const {data} = await api.delete(url)
        const result = genericResponseSchema.safeParse(data)
        if(result.success){
            return result.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }   
}