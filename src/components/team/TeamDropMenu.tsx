import {DropdownMenu,DropdownMenuContent,DropdownMenuLabel,DropdownMenuRadioGroup,DropdownMenuSeparator,DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { EllipsisVerticalIcon, Loader2 } from "lucide-react"
import TrashIcon from "../icons/TrashIcon"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeMember } from "@/api/TeamApi"
import { toast } from "react-toastify"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { User } from "@/types"

type TeamDropMenuProps = {
    id:User['_id']
}

export default function TeamDropMenu({id} : TeamDropMenuProps) {

    //. ->  projectId
    const params = useParams()
    const projectId = params.projectId!

    //. ->  State de carga
    const [load, setLoad] = useState(false)
    //. ->  QueryClient
    const queryClient = useQueryClient()
    //. ->  Mutation
    const { mutateAsync } = useMutation({
        mutationFn: removeMember,
        onError:(error)=>{
            toast.error(error.message)
            setLoad(false)
        },
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['projectTeam', projectId]})
        }

    })
    //. ->  handleClick
    const handleDelete = async ()=>{
        setLoad(true)
        const data = {
            projectId,
            id
        }
        await mutateAsync(data)
        setLoad(false)
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className=" border-0 hover:border-0 border-transparent p-0 border-spacing-0" >
                <Button className=" p-0 border-transparent bg-transparent hover:bg-transparent hover:text-secundario border-0 hover:border-0" >
                    <div className=" p-0">
                        <EllipsisVerticalIcon/>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-56">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioGroup>
                    <button
                    onClick={handleDelete}
                        disabled={load}
                        className=" text-red-600 w-full rounded flex p-1 hover:bg-secundario_hover hover:text-white disabled:bg-secundario_hover disabled:text-gray-100 transition-all"
                    >
                        {load ? (
                            <>
                                <div className=" ml-5 flex items-center gap-x-2 "><Loader2 className="mr-2 h-4 w-4 animate-spin" />Eliminando miembro</div>
                            </>
                        ) : (
                            <>
                                <div className=" ml-5 flex items-center gap-x-2 "><TrashIcon width={4} height={4}/>Eliminar miembro</div>
                            
                            </>
                        )}

                    </button>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
