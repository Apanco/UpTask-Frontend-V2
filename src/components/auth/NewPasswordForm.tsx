import { ConfirmToken, NewPasswordForm as NewPasswordFormT } from "@/types"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import ErrorMessageXs from "../ErrorMessageXs"
import { C_Boton } from "../C_Boton"
import { useMutation } from "@tanstack/react-query"
import { updatePasswordWithToken } from "@/api/AuthAPI"
import { toast } from "react-toastify"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type NewPasswordFormProps = {
    token : ConfirmToken['token']
}

export default function NewPasswordForm({token}: NewPasswordFormProps) {
    //# ->Navigate
    const navigate = useNavigate();
    const [load, setLoad] = useState(false)
    const initialValues : NewPasswordFormT = {
        password:"",
        password_confirmation:""
    }

    const { register, formState:{errors}, reset, watch, handleSubmit} = useForm({defaultValues:initialValues})
    const password = watch('password')
    const { mutateAsync } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError:(error)=>{
            toast.error(error.message)
            setLoad(false);
        },
        onSuccess:(data)=>{
            toast.success(data)
            reset()
            navigate("/auth/login")
        }
    })
    const handleForm = async (formData : NewPasswordFormT)=>{
        setLoad(true)
        const data = {formData, token}
        await mutateAsync(data)
        setLoad(false)
    }
    return (
        <div>
            <form
                noValidate
                onSubmit={handleSubmit(handleForm)}
            >
                <div className=" flex flex-col">
                    <label className=" mb-3" htmlFor="password">Contraseña</label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Ingrese su nueva contraseña"
                        {...register("password",{
                            required:"La contraseña es obligatoria",
                            minLength:{
                                value:8,
                                message:"La contraseña debe 8 caracteres min"
                            }
                        })}
                    />
                    <div className=" w-full h-5 mt-2">
                        {errors.password&&(
                            <ErrorMessageXs>{errors.password.message}</ErrorMessageXs>
                        )}
                    </div>
                </div>
                <div className=" flex flex-col">
                    <label className=" mb-3" htmlFor="password_confirmation">Repetir contraseña</label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite tu nueva contraseña"
                        {...register("password_confirmation",{
                            required:"Repetir tu contraseña es obligatorio",
                            validate: value => value === password || "Las contraseñas no son iguales"
                        })}
                    />
                    <div className=" w-full h-5 mt-2">
                        {errors.password_confirmation&&(
                            <ErrorMessageXs>{errors.password_confirmation.message}</ErrorMessageXs>
                        )}
                    </div>
                </div>
                <div className=" w-full mt-2">
                    <C_Boton
                        isLoad={load}
                        text="Cambiar contraseña"
                        textLoading="Cambiando contraseña"     
                    />

                </div>
            </form>

        </div>
    )
}
