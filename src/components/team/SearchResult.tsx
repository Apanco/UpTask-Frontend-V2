import { TeamMember, TeamMemberForm } from "@/types"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addMember } from "@/api/TeamApi"
import { toast } from "react-toastify"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import type { UseFormReset } from "react-hook-form"
type SearchResultProps = {
    user: TeamMember
    reset:UseFormReset<TeamMemberForm>
}

export default function SearchResult({user, reset} :SearchResultProps) {
    //. ->  Nagigate
    const navigate = useNavigate()
    //. -> STATE
    const [load, setLoad] = useState(false)

    //. ->  Params
    const params = useParams()
    const projectId = params.projectId!
    //. ->  queryClient
    const queryClient = useQueryClient()
    //. ->  Mutate
    const { mutateAsync } = useMutation({
        mutationFn:addMember,
        onError:(error)=>{
            toast.error(error.message)
            setLoad(false);
        },
        onSuccess:(data)=>{
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey:['projectTeam', projectId]})
            navigate(location.pathname,{replace:true})
        }
    })
    //. ->  HandleClick
    const handleClick = async ()=>{
        setLoad(true)
        const id = user._id
        const data = {
            projectId,
            id
        }
        await mutateAsync(data)
        setLoad(false);
    }
    return (
        <>
            <h3 className=" text-center mt-5">
                Resultado
            </h3>
            <Card className=" w-full py-3 px-5 flex justify-between mt-5 items-center">
                <p>{user.name}</p>
                <Button
                    disabled={load}
                    variant={"ghost"} 
                    onClick={handleClick}
                    className=" py-2 gap-x-3 h- rounded-full flex items-center hover:text-secundario">
                    {load ? (
                        <>
                            <Loader2 className=" animate-spin"/>
                            Agregando al proyecto
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Agregar al proyecto

                        </>
                    )}
                </Button>
            </Card>
        </>
    )
}
