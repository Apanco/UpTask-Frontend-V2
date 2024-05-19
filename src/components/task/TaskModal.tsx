
//# ->  Dependencies
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"

//# ->  Components
import { Button } from "@/components/ui/button"
import { C_Boton } from "../C_Boton"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Plus from "../icons/Plus"
import { useEffect, useState } from "react"
import TaskForm from "./TaskForm"
import { TaskFormData } from "@/types"
import { createTask } from "@/api/TaskApi"
import { toast } from "react-toastify"

export default function TaskModal() {
    //# ->  State de carga
    const [isLoad, setisLoad] = useState(false);

    //# ->  navigate
    const navigate=useNavigate()
    
    //# ->  Locacion
    const location = useLocation();
    const queryParams =new URLSearchParams(location.search)//va a buscar los parametros 
    const modalTask = queryParams.get("newTask")//analizara si existe ?true:null
    const show = modalTask ? true : false;//si existe ? true : false

    //# ->  State del modal
    const [open, setOpen] = useState(show);
    useEffect(()=>{
        if(!open){
            navigate(location.pathname,{
                replace:true
            })
        }
    },[open])

    //# -> Hook form
    const initialValues : TaskFormData = {
        name:"",
        description:""
    }
    const { register, handleSubmit, formState:{errors}, reset } = useForm({defaultValues:initialValues})

    //# ->  Invalidate query
    const queryClient = useQueryClient();
    
    //# ->  mutation
    const {mutateAsync} = useMutation({
        mutationFn: createTask,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:['viewProject', projectId]})
            toast.success(data)
        }
    }) 
    //# ->  leer el proyecto de la url
    const param = useParams();  
    const projectId = param.projectId!

    //# -> Funcion submit
    const handleCreateTask = async (formData:TaskFormData) => {
        setisLoad(true)
        const data = {
            formData,
            projectId
        }
        await mutateAsync(data);
        setOpen(false)
        reset();
        setisLoad(false);
        
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild onClick={()=>navigate("?newTask=true")} className="w-full">
                    <Button variant={"secondary"} className=" w-full border-2 border-secundario flex items-center gap-x-2 hover:text-secundario">
                        <Plus/>
                        <p className=" h-full">
                            Crear tarea
                        </p>
                    </Button>
                </DialogTrigger>
                <DialogContent className=" w-11/12 md:w-full">
                    <div className=" p-0 md:p-5">
                        <DialogHeader >
                            <DialogTitle className=" text-2xl">Nueva tarea</DialogTitle>
                            <DialogDescription asChild className=" mt-5 text-base">
                                <p>LLena el formulario y crea <span  className=" text-secundario">una tarea</span></p>
                            </DialogDescription>
                        </DialogHeader>
                        {/* //$ ->  Formulario */}
                        <form 
                            noValidate
                            className="mt-5"
                            onSubmit={handleSubmit(handleCreateTask)}
                        >
                            
                            <TaskForm
                                register={register}
                                errors={errors}
                            />
                            <C_Boton
                                isLoad={isLoad}
                                text="Crear tarea"
                                textLoading="Creando tarea"
                            />

                        </form>
                    </div>
                    
                </DialogContent>
            </Dialog>
        </>
  )
}
