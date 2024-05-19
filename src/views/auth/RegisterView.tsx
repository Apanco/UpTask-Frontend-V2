import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessageXs from "@/components/ErrorMessageXs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import { C_Boton } from "@/components/C_Boton";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterView() {
  //# -> Navigate
  const navigate = useNavigate()
  //# ->  State of input button
  const [load, setLoad] = useState(false)
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const password = watch('password');
  //# ->  mutation
  const { mutateAsync } = useMutation({
    mutationFn: createAccount,
    onError: (error)=>{
      toast.error(error.message)
      setLoad(false);
    },
    onSuccess:(data)=>{
      toast.success(data)
      reset()
      navigate("/auth/confirm-account")
    }
  })
  const handleRegister = async (formData: UserRegistrationForm) => {
    setLoad(true);
    await mutateAsync(formData)
    setLoad(false);
  }

  return (
    <>
      <Card>
        <CardHeader className=" pb-5">
          <CardTitle className=" text-center mb-2 font-bold">Crear cuenta</CardTitle>
          <CardDescription>LLene el formulario para{" "+" "} <span className=" text-secundario">Crear su cuenta</span></CardDescription>
        </CardHeader>
        <CardContent className=" space-y-2">
          <form 
            onSubmit={handleSubmit(handleRegister)}
            noValidate
            className=""
          >
            <div className=" mb-1 md:mb-3 space-y-2">
                <Label className=" font-normal">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email de registro"
                  {...register("email",{required:"El email es obligatorio",
                    pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                },
                  })}
                />
                <div className=" h-1 text-xs">
                  {errors.email && (
                    <ErrorMessageXs>{errors.email.message}</ErrorMessageXs>
                  )}
                </div>
            </div>
            <div className=" mb-3 md:mb-3 space-y-2">
                <Label className=" font-normal">Nombre</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Nombre de usuario"
                  {...register("name",{required:"El nombre de usuario es obligatorio"
                      
                  })}
                />
                <div className=" h-1">
                  {errors.name && (
                    <ErrorMessageXs>{errors.name.message}</ErrorMessageXs>
                  )}
                </div>
            </div>
            <div className=" w-full flex justify-between gap-x-5">
                <div className=" mb-3 md:mb-3 space-y-2 w-full">
                    <Label className=" font-normal">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Ingrese su contraseña"
                      {...register("password",{required:"La contraseña es obligatoria"})}
                    />
                    <div className=" h-1">
                      {errors.password && (
                        <ErrorMessageXs>{errors.password.message}</ErrorMessageXs>
                      )}
                    </div>
                </div>
                <div className=" mb-3 md:mb-3 space-y-2 w-full">
                    <Label className=" font-normal">Repetir contraseña</Label>
                    <Input
                      id="password_confirmation"
                      type="password"
                      placeholder="Repita su contraseña"
                      {...register("password_confirmation",{
                        required:"Es obligatorio repetir su contraseña",
                        validate: value => value ===password || 'Las contraseñas no son iguales'
                      })}
                    />
                    <div className=" h-1">
                      {errors.password_confirmation && (
                        <ErrorMessageXs>{errors.password_confirmation.message}</ErrorMessageXs>
                      )}
                    </div>
                </div>
            </div>
            
            <div className=" w-full mt-5">
              <C_Boton
                isLoad={load}
                text="Registrarse"
                textLoading="Registrando usuario"
              />  

            </div>

          </form>
        </CardContent>
      </Card>
    </>
  )
}