import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { C_Boton } from "@/components/C_Boton";
import ErrorMessageXs from "@/components/ErrorMessageXs";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ForgotPasswordView() {
  //# ->  button state
  const [load, setLoad] = useState(false);
  //# ->  Navigate
  const navigate = useNavigate();

  //# ->  Inital values
  const initialValues: ForgotPasswordForm = {
    email: "",
  };
  //# ->  useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  //# ->  Mutate
  const { mutateAsync } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message);
      setLoad(false);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/new-password");
    },
  });
  //# ->  HandleSubmit
  const handleForgotPassword = async (formData: ForgotPasswordForm) => {
    setLoad(true);
    await mutateAsync(formData);
    setLoad(false);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center px-5">
        <div className="max-w-lg w-full">
          <h1 className=" text-2xl font-bold">Restablecer contraseña</h1>
          <p className=" text-start">
            Coloca tu e-mail para recibir un{" "}
            <span className=" text-secundario font-bold">nuevo codigo</span> de
            recuperacion
          </p>
        </div>
        <Card className=" w-full max-w-lg py-10 px-5 md:px-10 mt-5">
          <form onSubmit={handleSubmit(handleForgotPassword)} noValidate>
            <div className="flex flex-col gap-3 mb-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Email de Registro"
                {...register("email", {
                  required: "El Email de registro es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
              <div className=" h-5">
                {errors.email && (
                  <ErrorMessageXs>{errors.email.message}</ErrorMessageXs>
                )}
              </div>
            </div>

            <C_Boton
              isLoad={load}
              text="Enviar instrucciones"
              textLoading="Enviando instrucciones"
            />
          </form>
        </Card>
        <nav className="mt-5 flex flex-col space-y-3">
          <Link to="/auth/login" className="text-center font-normal">
            ¿Ya tienes cuenta?{" "}
            <span className=" font-semibold text-secundario">
              Iniciar Sesión
            </span>
          </Link>

          <Link to="/auth/register" className="text-center font-normal">
            ¿No tienes cuenta?{" "}
            <span className=" font-semibold text-secundario">Crea una</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
