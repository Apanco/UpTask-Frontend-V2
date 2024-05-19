import { RequestConfirmationCode } from "@/api/AuthAPI"
import { C_Boton } from "@/components/C_Boton"
import ErrorMessageXs from "@/components/ErrorMessageXs"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RequestConfirmationCodeForm } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
export default function RequestNewCodeView() {
    const [load, setLoad] = useState(false)
    const initialValues : RequestConfirmationCodeForm=  {
        email:""
    }
    const { register, handleSubmit, formState:{errors} } = useForm({defaultValues:initialValues})
    const { mutateAsync } = useMutation({
        mutationFn:RequestConfirmationCode,
        onError:(error)=>{
            toast.error(error.message)
            setLoad(false)
        },
        onSuccess:(data)=>{
            toast.success(data)
        }
        
    })
    const handleRequestCode = async ( formData : RequestConfirmationCodeForm)=>{
        setLoad(true)
        await mutateAsync(formData)
        setLoad(false)
    }
    return (
        <div className="w-full flex flex-col items-center px-5">
            <div className="max-w-lg w-full">
                <h1 className=" text-2xl font-bold">Solicitar codigo de confirmacion</h1>
                <p 
                    className=" text-start"
                >Coloca tu e-mail para recibir un  {" "} <span className=" text-secundario font-bold">nuevo codigo</span>
                </p>
            </div>
            <Card className=" w-full p-5 max-w-lg mt-5 rounded">
                <form
                    noValidate
                    onSubmit={handleSubmit(handleRequestCode)}
                >
                <div className=" w-full space-y-3 mb-3">
                    <label htmlFor="email">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Ingrese su email"
                        {...register("email",{
                            required:"El email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    <div className=" h-5">
                        {errors.email&&(
                            <ErrorMessageXs>
                                {errors.email.message}
                            </ErrorMessageXs>
                        )}
                    </div>
                </div>
                <C_Boton
                    isLoad={load}
                    text="Enviar codigo"
                    textLoading="Enviando codigo"
                />

                </form>
            </Card>
            <Link to={"/auth/confirm-account"} className=" text-xs mt-5">
                ¿Ya tienes un codigo? <span className=" text-secundario">Ingresalo aqui</span>
            </Link>
        </div>
    )
}
