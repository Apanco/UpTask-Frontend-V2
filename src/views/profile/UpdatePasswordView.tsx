import { updatePassword } from "@/api/ProfileApi";
import ErrorMessageXs from "@/components/ErrorMessageXs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpdatePassword } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Loader2, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UpdatePasswordView() {
  //. -> button state
  const [load, setLoad] = useState(false);
  //. ->  initial values
  const initialValues : UpdatePassword = {
    passwordCurrency:"",
    password:"",
    password_confirmation:""
  }

  //. ->  react-hook-form
  const { register, formState:{errors}, handleSubmit, watch, reset } = useForm<UpdatePassword>({defaultValues:initialValues})
  const password = watch("password")

  //. ->  Mutate
  const { mutateAsync } = useMutation({
    mutationFn:updatePassword,
    onError:(error)=>{
      toast.error(error.message)
      setLoad(false)
    },
    onSuccess:(data)=>{
      toast.success(data)
    }
  })

  //. ->  handleForm
  const handleForm = async (passwordForm : UpdatePassword)=>{
    setLoad(true)
    await mutateAsync({passwordForm})
    reset()
    setLoad(false)
  }
  return (
    <div className=" w-full flex flex-col items-center justify-center pt-0 md:pt-5 max-w-lg mx-auto px-5">
      <h2 className=" text-center text-2xl font-bold">Cambiar contraseña</h2>
      <p className=" w-full mt-5 text-start text-base text-muted-foreground">LLene los siguientes campos para cambiar su contraseña</p>
      <form 
        className=" w-full mt-5"
        noValidate
        onSubmit={handleSubmit(handleForm)}
      >
        <div className=" w-full">
          <label htmlFor="passwordCurrency">Contraseña actual</label>
          <Input
            id="passwordCurrency"
            type="password"
            className=" mt-3"
            placeholder="Ingrese su contraseña actual"
            {...register("passwordCurrency",{
              required:"Su contraseña actual es obligatoria"
            })}
          />
          <div className=" mt-2 h-3 pl-3">
            {errors.passwordCurrency && <ErrorMessageXs>{errors.passwordCurrency.message}</ErrorMessageXs>}
          </div>
        </div>
        <div className=" w-full">
          <label htmlFor="password">Contraseña nueva</label>
          <Input
            id="password"
            type="password"
            className=" mt-3"
            placeholder="Ingrese su contraseña nueva"
            {...register("password",{
              required:"Su contraseña nueva es obligatoria",
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres'
              }
            })}
          />
          <div className=" mt-2 h-3 pl-3">
            {errors.password && <ErrorMessageXs>{errors.password.message}</ErrorMessageXs>}
          </div>
        </div>
        <div className=" w-full">
          <label htmlFor="password_confirmation">Repita su contraseña nueva</label>
          <Input
            id="password_confirmation"
            type="password"
            className=" mt-3"
            placeholder="Ingrese su contraseña actual"
            {...register("password_confirmation",{
              required:"Su contraseña nueva es obligatoria",
              validate: value => value === password || 'Las contraseñas no son iguales'
            })}
          />
          <div className=" mt-2 h-3 pl-3">
            {errors.password_confirmation && <ErrorMessageXs>{errors.password_confirmation.message}</ErrorMessageXs>}
          </div>
        </div>

        <Button
          type="submit"
          variant={"secondary"}
          className=" w-full mt-3 border border-primary"
          disabled={load}
        >
          <div className=" w-full flex justify-center items-center gap-x-3">
            {load ? (
              <>
                <Loader2 className=" w-4 h-4 animate-spin"/>
                <p>Actualizando contraseña</p>
              </>
            ) : (
              <>
                <LockKeyhole className=" w-4 h-4"/>
                <p>Actualizar contraseña</p>
              </>
            )}
          </div>

        </Button>
      </form>
    </div>
  )
}
