
import ProjectForm from "@/components/projects/ProjectForm";
import { Card } from "@/components/ui/card";
import { Project, ProjectFormData } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, SaveAllIcon } from "lucide-react";

type UpdateProjectFormProps = {
    data: Project
}

export default function UpdateProjectForm({data}:UpdateProjectFormProps) {
    const [isLoading, setisLoading] = useState(false)

    const projectId = data._id
    const navigate = useNavigate()
    const initialValues : ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description 
    }       

    const { register, handleSubmit, formState:{errors} } = useForm({defaultValues:initialValues})

    const queryClient = useQueryClient();
    
    const { mutateAsync } = useMutation({
        mutationFn: updateProject,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(result)=>{
            //! ->  sincronizacion del state y BD
            queryClient.invalidateQueries({queryKey:['projects']})//A la pagina que redirijimos hara un nuevo state, esto dara datos actualizados
            queryClient.invalidateQueries({queryKey:['editProject', projectId]})
            toast.success(result);
            navigate("/")
        }
    })
    const handleForm = async (formData : ProjectFormData)=>{
        setisLoading(true)
        const result={
            formData,
            projectId
        }
        await mutateAsync(result)   
        setisLoading(false)
    }
    return (
        <>
            <Card className=" px-5 py-10 rounded-sm border   bg-transparente">
                <form 
                    // className=" mt-10 bg-fondo shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate    
                    className=" px-2 md:px-10"
                >

                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <Button
                        variant={"secondary"}
                        className=" w-full"
                        disabled={isLoading}
                    >
                        <div className=" w-full flex justify-center items-center gap-x-3">
                            {isLoading ? (
                                <>
                                    <Loader2 className=" w-6 h-6 animate-spin"/>
                                    <p>Guardando cambios</p>
                                </>
                            ) : (
                                <>
                                    <SaveAllIcon className=" w-6 h-6"/>
                                    <p>Guardar proyecto</p>
                                </>
                            )}
                        </div>
                    </Button>
                </form>
            </Card>
        </>
    )
}
