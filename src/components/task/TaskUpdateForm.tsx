import { useForm } from "react-hook-form";
import { C_Boton } from "../C_Boton";
import TaskForm from "./TaskForm";
import { Task, TaskFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/TaskApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
type TaskUpdateFormProps = {
    task:Task

}

export default function TaskUpdateForm({task} : TaskUpdateFormProps) {
    //# ->  navigate
    const navigate = useNavigate()

    //# ->  State del loading
    const [load, setLoad] = useState(false)
    //# ->  Obtener projecto de params
    const params = useParams();
    const projectId = params.projectId!
    //# ->  QueryClient
    const queryClient = useQueryClient()

    //# ->  Mutation
    const { mutateAsync } = useMutation({
        mutationFn: updateTask,
        onError: (error)=>{
            toast.error(error.message)
            setLoad(false)
        },
        onSuccess:(data)=>{
            //? ->  Sincronizacion del state con bd
            queryClient.invalidateQueries({queryKey:['viewProject', projectId]})
            queryClient.invalidateQueries({queryKey:['task', task._id]})
            toast.success(data)
        }
    })
    //# ->  Hook form
    const initialValues : TaskFormData= {
        name: task.name ,
        description: task.description
    }
    const { register, handleSubmit, formState:{errors}, reset } = useForm({defaultValues:initialValues})
    const handleUpdate = async (formData : TaskFormData) =>{
        setLoad(true);
        const taskId = task._id
        await mutateAsync({projectId, taskId, formData})
        reset();
        navigate(location.pathname,{replace:true});
        setLoad(false);
    }
    return (
        <form noValidate
            onSubmit={handleSubmit(handleUpdate)}
        >
            <TaskForm
                register={register}
                errors={errors}
            />
                <C_Boton
                    isLoad={load}
                    text="Actualizar tarea"
                    textLoading="Actualizando tarea"
                />
        </form>
    )
}
