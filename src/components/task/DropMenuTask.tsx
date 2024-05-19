import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ElipsisVertical from "../icons/ElipsisVertical"
import PencilIcon from "../icons/PencilIcon"
import TrashIcon from "../icons/TrashIcon"
import { useNavigate, useParams } from "react-router-dom"
import EyeIcon from "../icons/EyeIcon"
import { TaskProject } from "@/types"

import { Loader2 } from "lucide-react"
import { useState } from "react"

//* ->  Hooks
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTask } from "@/api/TaskApi"
import { toast } from "react-toastify"

type DropMenuTaskProps = {
    task : TaskProject
    canEdit:boolean
}

export default function DropMenuTask({task, canEdit} : DropMenuTaskProps) {
    //# ->  Navigate
    const navigate = useNavigate()
    //# ->  State del dropMenu
    const [open, getOpen] = useState(false)
    //# -> delete button state
    const [isLoading, setIsLoading] = useState(false)
    //# ->  Redireccion a actualizar tarea
    const handleClick = () => {
        navigate(location.pathname + `?editTask=${task._id}`)
        getOpen(false)
    }
    //# -> Redirection to view details task
    const handleDetails = () => {
        navigate(location.pathname + `?viewTask=${task._id}`)
        getOpen(false)
    }
    //¡ ->  Delete

    //# ->  Obtener projectId
    const params = useParams();
    const projectId = params.projectId!
    //# ->  QueryClient
    const queryClient = useQueryClient();
    //# ->  Mutation
    const { mutateAsync} = useMutation({
        mutationFn: deleteTask,
        onError: (error)=>{
            toast.error(error.message);
        },
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:['viewProject', projectId]}),
            toast.success(data);
        }

    })
    //# ->  Delete function
    const handleDelete = async () => {
        setIsLoading(true);
        const taskId = task._id
        await mutateAsync({projectId, taskId})
        getOpen(false);
        setIsLoading(false);
    }
    return (
        <DropdownMenu open={open} onOpenChange={getOpen} >
            <DropdownMenuTrigger asChild className=" border-0 hover:border-0 border-transparent p-0 border-spacing-0" >
                <Button className=" p-0 border-transparent bg-transparent hover:bg-transparent hover:text-secundario border-0 hover:border-0">
                    <div className=" text-xs p-0">
                        <ElipsisVertical width={6} height={6}/> 
                    </div> 
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup>
                    <button
                        onClick={handleDetails}
                        className=" w-full rounded flex p-1 hover:bg-secundario_hover"
                    >
                        
                        <div className=" ml-5 flex items-center gap-x-2"><EyeIcon width={4} height={4}/> Ver tarea</div>
                    </button>
                        
                    {canEdit && (
                       <>
                            <button
                                onClick={handleClick}
                                className=" w-full rounded flex p-1 hover:bg-secundario_hover"
                            >
                                <div className=" ml-5 flex items-center gap-x-2"><PencilIcon width={4} height={4}/> Editar tarea</div>
                            </button>

                            <button
                                className="text-red-600 w-full rounded flex p-1 hover:bg-secundario_hover hover:text-white disabled:bg-secundario_hover disabled:text-gray-100 transition-all"
                                disabled={isLoading}
                                onClick={handleDelete}
                            >
                                {isLoading ? (
                                    <>
                                        <div className=" ml-5 flex items-center gap-x-2 "><Loader2 className="mr-2 h-4 w-4 animate-spin" />Eliminando tarea</div>
                                    </>
                                ) : (
                                    <>
                                        <div className=" ml-5 flex items-center gap-x-2 "><TrashIcon width={4} height={4}/>Eliminar tarea</div>
                                    
                                    </>
                                )}
                            </button>

                       </> 
                    )}

                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
