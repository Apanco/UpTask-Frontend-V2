import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { Card } from "@/components/ui/card";
import { ConfirmToken } from "@/types";
import { useState } from "react";

export default function NewPasswordView() {
  //# -> State del token
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col items-center px-5">
        <div className="max-w-lg w-full">
          <h1 className=" text-2xl font-bold">Restablecer contraseña</h1>
          <p className=" text-start">
            Ingresa el codigo que recibiste por{" "}
            <span className=" text-secundario font-bold">e-mail</span> de
          </p>
        </div>
        <Card  className=" p-5 max-w-lg w-full mt-5 rounded md:p-10">
          {!isValidToken ?(
            <>
              <NewPasswordToken token = {token} setToken={setToken} setIsValidToken={setIsValidToken}/>
            </>
          ):(
            <>
              <NewPasswordForm token={token}/>
            </>
          )}  
        </Card>
      </div>
    </>
  );
}
