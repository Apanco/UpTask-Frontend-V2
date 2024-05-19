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
import { Link, useNavigate } from "react-router-dom"
import EyeIcon from "../icons/EyeIcon"
import { Project, User } from "@/types"
import { useState } from "react"

import { useAuth } from "@/hooks/useAuth"
type DropMenuProjectsProps = {
    project : Project
}

export default function DropMenuProjects({project} : DropMenuProjectsProps) {

    //. ->  Usuario autenticado
    const {data } = useAuth();

    //. ->  dropmenu state

    const [open, setOpen] = useState(false)
    //. ->  Navigate
    const navigate = useNavigate()
    const user : User  = data ?? {
        _id:"",
        name:"",
        email:""
    }

    const handleSubmit = async ()=>{
        navigate(location.pathname+`?deleteProject=${project._id}`)
        setOpen(false)
    }

    return (
        <DropdownMenu open={open} onOpenChange={()=>setOpen(!open)}>
            <DropdownMenuTrigger asChild className=" border-0 hover:border-0 border-transparent" >
            <Button onClick={()=>setOpen(true)} className=" p-0 border-transparent bg-transparent hover:bg-transparent hover:text-secundario border-0 hover:border-0">
                    <div className=" text-xs p-0">
                        <ElipsisVertical width={10} height={10}/> 
                    </div> 
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup>
                    <Link to={`/projects/${project._id}`}
                        className=" w-full rounded flex p-1 hover:bg-secundario_hover"
                    >
                        
                        <div className=" ml-5 flex items-center gap-x-2"><EyeIcon width={4} height={4}/> Ver proyecto</div>
                    </Link>


                    {project.manager === user._id &&(
                        <>
                            <Link to={`/projects/${project._id}/edit`}
                                className=" w-full rounded flex p-1 hover:bg-secundario_hover"
                            >
                                <div className=" ml-5 flex items-center gap-x-2"><PencilIcon width={4} height={4}/> Editar proyecto</div>
                            </Link>
                            <button
                                className="text-red-600 w-full rounded flex p-1 hover:bg-secundario_hover hover:text-white disabled:bg-secundario_hover disabled:text-gray-100 transition-all"
                                onClick={ handleSubmit }
                            >
                                <div className=" ml-5 flex items-center gap-x-2 "><TrashIcon width={4} height={4}/>Eliminar</div>
                            </button>
                        
                        </>
                    )}


                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
