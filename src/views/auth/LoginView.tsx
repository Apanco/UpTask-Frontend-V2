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
import {DropdownMenu,DropdownMenuContent,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { CopyIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast as sonner } from "sonner"

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

  //. ->  Copiar
  const [email] = useState('aperezapanco@gmail.com');
  const [password] = useState("12345678")
  const handleEmail = () => {
    navigator.clipboard.writeText(email);
    notification("Email copiado en el portapapeles")
  }
  const handlePassword = () => {
    navigator.clipboard.writeText(password);
    notification("Contraseña copiada en el portapapeles")
  }

  const notification = ( text : string )=>{
    sonner(`${text}`, {
      action: {
        label: ("Cerrar"),
        onClick: () => {},
      },
    })
  }

  return (  
    <>
      <Card className=" bg-background border-2">
        <CardHeader>
          <CardTitle className=" mb-3 text-center font-bold">Iniciar sesion</CardTitle>
          <CardDescription className=" flex w-full justify-between">
            <span>
              Comienza a planear tus proyectos{" "+" "} <span className=" text-secundario">iniciando sesion</span>
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger><InfoIcon className=" w-6 h-6"/></DropdownMenuTrigger>
              <DropdownMenuContent className=" w-72 p-2">
                <DropdownMenuLabel>Datos de prueba</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className=" w-full space-y-2">
                  <h3>Email</h3>
                  <div className=" w-full flex justify-start">
                    <Button disabled variant={"secondary"} className=" text-start justify-start min-w-52 rounded-r-none">{email}</Button>
                    <Button variant={"secondary"} className=" rounded-l-none border-2 border-primary" onClick={handleEmail} >
                      <CopyIcon className=" w-4 h-4"/> 
                    </Button>
                  </div>
                </div>
                <div className=" w-full space-y-2">
                  <h3>Contraseña</h3>
                  <div className=" w-full flex justify-start">
                    <Button disabled variant={"secondary"} className=" text-start justify-start min-w-52 rounded-r-none">{password}</Button>
                    <Button variant={"secondary"} className=" rounded-l-none border-2 border-primary" onClick={handlePassword} >
                      <CopyIcon className=" w-4 h-4"/> 
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardDescription>
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