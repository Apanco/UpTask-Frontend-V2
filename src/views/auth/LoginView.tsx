import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import { C_Boton } from "@/components/C_Boton";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useState } from "react";

export default function LoginView() {
  //. ->  State del boton
  const [load, setLoad] = useState(false)

  //. ->  navigate
  const navigate = useNavigate();
  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  //. ->  QueryClient
  const queryClient = useQueryClient();

  //. ->  Mutate
  const { mutateAsync } = useMutation({
    mutationFn:authenticateUser,
    onError:(error)=>{
      toast.error(error.message)
      setLoad(false);
      // console.log(error)
    },
    onSuccess:()=>{
      toast.success("Has iniciado sesion"),
      queryClient.invalidateQueries({queryKey:['user']})
      navigate("/")
    }
  })
  const handleLogin = async (formData: UserLoginForm) => {
    setLoad(true)
    await mutateAsync(formData)
    setLoad(false);
  }
  return (
    <>
      <Card className=" border-0">
        <CardHeader>
          <CardTitle className=" mb-3 text-center font-bold">Iniciar sesion</CardTitle>
          <CardDescription>Comienza a planear tus proyectos{" "+" "} <span className=" text-secundario">iniciando sesion</span></CardDescription>
        </CardHeader>

        <CardContent className=" space-y-2">
          <form 
            onSubmit={handleSubmit(handleLogin)}
            noValidate
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
                <div className=" h-3">
                  {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  )}
                </div>
            </div>
            <div className=" mb-3 md:mb-3 space-y-2">
                <Label className=" font-normal">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  {...register("password",{required:"El email es obligatorio"})}
                />
                <div className=" h-3">
                  {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )}
                </div>
            </div>
            <C_Boton
              isLoad={load}
              text="Iniciar sesion"
              textLoading="Iniciando sesion"
            />  

          </form>
        </CardContent>
      </Card>
      <div className=" w-full flex justify-center text-sm mt-5">
        <Link to={"/auth/forgot-password"}>¿Olvidaste tu contraseña?{"  "}<span className=" font-semibold text-secundario">Restablecela</span></Link>

      </div>
    </>
  )
}