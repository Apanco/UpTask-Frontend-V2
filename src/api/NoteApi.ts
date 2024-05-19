import api from "@/lib/axios";
import { Note, NoteFormData, Project, Task, notesSchema } from "@/types";
import { isAxiosError } from "axios";

type NoteApiTypes = {
    noteId: Note['_id']
    formData: NoteFormData,
    projectId:Project['_id'],
    taskId: Task['_id']
}


export async function createNote({formData, projectId, taskId}: Pick<NoteApiTypes, "formData" | "projectId" | "taskId">){
    try {
        const url = `/projects/${projectId}/task/${taskId}/notes`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }   
}
export async function getNotes({projectId, taskId}: Pick<NoteApiTypes, "projectId" | "taskId">){
    try {
        const url = `/projects/${projectId}/task/${taskId}/notes`
        const { data } = await api(url)
        const result = notesSchema.safeParse(data)
        if(result.success){
            return result.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function deleteNote({noteId,projectId, taskId}: Pick<NoteApiTypes, "projectId" | "taskId" | "noteId">){
    try {
        const url = `/projects/${projectId}/task/${taskId}/notes/${noteId}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}