import { confirmAccount } from "@/api/AuthAPI";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,} from "@/components/ui/input-otp"
import { ConfirmToken } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function ConfirmAccountView() {
    const navigate = useNavigate()
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const handleChange =(token :ConfirmToken['token'])=>{
        setToken(token)
    }
    const { mutateAsync } = useMutation({
        mutationFn:confirmAccount,
        onError:()=>{
            toast.error("Token no valido")
        },
        onSuccess:(data)=>{
            toast.success(data)
            navigate("/auth/login")
        }
    })
    const handleComplete = async ()=>{
        await mutateAsync({token})
    }
    return (
        <div className="w-full flex flex-col items-center px-5">  
            <div className="max-w-lg w-full">
                <h1 className=" text-2xl font-bold">Confirma tu cuenta</h1>
                <p 
                    className=" text-start"
                >Ingresa el codigo que recibiste por {" "} <span className=" text-secundario font-bold">email</span>
                </p>

            </div>
            <Card className=" p-5 max-w-lg w-full mt-5 rounded">
                <div className=" w-full flex items-center flex-col space-y-5 pb-3">
                    <label> Codigo de 6 digitos</label>
                    <InputOTP value={token} onChange={handleChange}  maxLength={6} onComplete={handleComplete}>
                        <InputOTPGroup className=" bg-transparente rounded-lg">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className=" bg-transparente rounded-lg">
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            </Card>
            <Link to={"/auth/request-code"} className=" text-xs mt-5">
                ¿No recibiste ningun codigo? <span className=" text-secundario">Solicita uno nuevo</span>
            </Link>
        </div>
    )
}
