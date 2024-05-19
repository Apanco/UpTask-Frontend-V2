import { TeamMemberForm } from "@/types"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { C_Boton } from "../C_Boton"
import ErrorMessageXs from "../ErrorMessageXs"
import { useMutation } from "@tanstack/react-query"
import { findMemberByEmail } from "@/api/TeamApi"
import { useParams } from "react-router-dom"
import SearchResult from "./SearchResult"




export default function TeamAddForm() {
    //. ->  Params
    const params = useParams()
    const projectId = params.projectId!

    //. ->  Default values
    const initialValues : TeamMemberForm = {
        email:""
    }
    //. ->  useForm
    const { register, formState:{errors}, handleSubmit, reset } = useForm({defaultValues:initialValues})
    //. -> mutation
    const mutation = useMutation({
        mutationFn: findMemberByEmail
    })

    //. ->  HandleSubmit
    const handleAddMember = async (formData : TeamMemberForm)=>{
        const data = {projectId, formData}
        mutation.mutate(data);
    }
    return (
        <>
            <form
                noValidate
                onSubmit={handleSubmit(handleAddMember)}
            
            >
                <div className=" w-full space-y-3 mb-5 md:mb-3">
                    <label htmlFor="email">Email</label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email",{
                            required:"Es email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            }
                        })}
                    />
                    <div className=" h-3">
                        {errors.email&&(
                            <ErrorMessageXs>{errors.email.message}</ErrorMessageXs>
                        )}
                    </div>
                </div>
                <C_Boton
                    isLoad={mutation.isPending}
                    text="Buscar usuario"
                    textLoading="Buscando usuario"
                />
            </form>
            {mutation.isError && (
                <p className=" mt-5 md:mt-2 text-center">Usuario no encontrado</p>
            )}
            {mutation.data && (
                <SearchResult reset={reset} user={mutation.data}/>
            )}
        </>
    )
}
