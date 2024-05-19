import { Label } from "@radix-ui/react-dropdown-menu"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { NoteFormData } from "@/types"
import ErrorMessageXs from "../ErrorMessageXs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"
import { useState } from "react"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

export default function AddNote() {

    //. -> button state
    const [load, setLoad] = useState(false)

    //. -> initial values
    const initialValues : NoteFormData = {
        content:""
    }
    //. ->  queryClient
    const queryClient = useQueryClient()

    //. ->  react-hook-form
    const { register, handleSubmit, formState:{errors}, reset } = useForm({defaultValues:initialValues})

    //. ->  Obtener id de la tarea
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get("viewTask")! 

    //. ->  Obtener proyecto
    const params = useParams()
    const projectId = params.projectId!

    //. ->  mutation
    const { mutateAsync } = useMutation({
        mutationFn:createNote,
        onError:(error)=>{
            toast.error(error.message)
            setLoad(false)
        },
        onSuccess:(data)=>{
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey:["notes", taskId]})
        }
    })
    const handleNote =  async (formData : NoteFormData)=>{
        setLoad(true);
        const data = {
            formData,
            projectId,
            taskId
        }
        await mutateAsync(data)
        setLoad(false)
    }

    return (
        <div>
            <form
                noValidate
                onSubmit={handleSubmit(handleNote)}
            >
                <div className=" w-full mb-3">
                    <Label className=" ml-2">Crear nota</Label>
                    <Input
                        id="content"
                        type="text"
                        placeholder="Contenido de la nota"
                        className=" mt-3 mb-2"
                        {...register('content',{
                            required:"El contenido de la nota es obligatorio"
                        })}
                    />
                    <div className=" h-3 pl-8">
                        {errors.content && (
                            <ErrorMessageXs>*{errors.content.message}</ErrorMessageXs>
                        )}
                    </div>
                </div>
                <Button
                    type={"submit"}
                    variant={"secondary"}
                    className=" w-full border-2 border-primary"
                    disabled={load}
                >
                    {load ? (
                        <>
                        <div className=" w-full flex justify-center space-x-3 items-center">
                            <Loader2 className=" animate-spin h-4 w-4"/>
                            <p>Creando nota</p>
                        </div>
                        </>
                    ) :(
                        <>
                            <p>Crear nota</p>
                        </>
                    )}
                </Button>


            </form>
        </div>
    )
}
