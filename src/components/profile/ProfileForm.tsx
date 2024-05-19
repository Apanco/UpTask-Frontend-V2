import { ProfileForm as ProfileFormType } from "@/types"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import ErrorMessageXs from "../ErrorMessageXs"
import { Button } from "../ui/button"
import { Loader2, SaveAllIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileApi"
import { toast } from "react-toastify"

type ProfileFormProps ={
    user:ProfileFormType
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProfileForm({user, setActive} : ProfileFormProps) {

    //. ->  button state
    const [load, setLoad] = useState(false);


    //. ->  react-hook-form
    const { register, formState:{errors}, handleSubmit, watch } = useForm<ProfileFormType>({defaultValues:user})


    //. ->  Verify changes
    const isChange = useMemo(()=>{
        if(user.name !== watch("name") || user.email !== watch("email")){
            return true
        }
        else{
            return false
        }
    },[watch("name"), watch("email")])

    //. ->  queryClient
    const queryClient = useQueryClient()

    //. ->  mutate
    const { mutateAsync } = useMutation({
        mutationFn: updateProfile,
        onError:(error)=>{
            toast.error(error.message)
            setLoad(false);
        },
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey:["user"]})
            setActive(false)
        }
    })

    //. ->  handleSubmit
    const handleUpdate = async (profileForm : ProfileFormType)=>{
        setLoad(true)
        await mutateAsync({profileForm})
        setLoad(false)
    }

    return (
        <div className=" w-full p-2">
            <form
                noValidate
                onSubmit={handleSubmit(handleUpdate)}
            >
                <div className="w-full">
                    <label className=" text-muted-foreground" htmlFor="name">Nombre</label>
                    <Input
                        type="text"
                        id="name"
                        className=" mt-3"
                        {...register("name",{
                            required:"Su nombre es obligatorio"
                        })}
                    />
                    <div className=" pl-2 mt-2 mb-2 h-3">
                        {errors.name&& <ErrorMessageXs>{errors.name.message}</ErrorMessageXs>}
                    </div>
                </div>
                <div className=" w-full">
                    <label className=" text-muted-foreground" htmlFor="email">Email</label>
                    <Input
                        type="email"
                        id="email"
                        className=" mt-3"
                        {...register("email",{
                            required:"Su email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    <div className=" pl-2 mt-2 mb-2 h-3">
                        {errors.email&& <ErrorMessageXs>{errors.email.message}</ErrorMessageXs>}
                    </div>
                </div>
                <Button
                    disabled={!isChange}
                    className=" w-full mt-2 border border-primary disabled:border-0"
                    variant={"secondary"}
                >
                    <div className=" w-full flex justify-center items-center gap-x-2">
                        {load ? (
                            <>
                                <Loader2 className=" w-4 h-4 animate-spin"/>
                                <p>Guardando cambios</p>
                            </>
                        ) : (
                            <>
                                <SaveAllIcon className=" w-4 h-4"/>
                                <p>Guardar cambios</p>  
                            </>
                        ) }
                        
                    </div>
                </Button>
            </form> 
        </div>
    )
}
