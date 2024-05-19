import api from "@/lib/axios";
import { CheckPassword, CountProjectSchema, ProfileForm, UpdatePassword } from "@/types";
import { isAxiosError } from "axios";

type ProfileApi = {
    profileForm: ProfileForm,
    passwordForm:UpdatePassword,
    checkForm:CheckPassword
}

export async function updateProfile({profileForm} : Pick<ProfileApi, "profileForm">){
    try {
        const url = `/auth/profile`
        const { data } = await api.put(url, profileForm)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectsUser(){
    try {
        const url =`projects/count`
        const {data} = await api(url);
        const response = CountProjectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePassword({passwordForm} : Pick<ProfileApi, "passwordForm">){
    try {
        const url = `/auth/update-password`
        const { data } = await api.post<string>(url, passwordForm)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkPassword({checkForm}:Pick<ProfileApi, "checkForm">){
    try {
        const url = `/auth/check-password`;
        const { data } = await api.post<string>(url,checkForm);
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}