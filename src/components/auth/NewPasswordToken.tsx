//# ->  Components
import { validateToken } from "@/api/AuthAPI"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,} from "@/components/ui/input-otp"
import { ConfirmToken } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-toastify"

type NewPasswordTokenProps = {
  token : ConfirmToken['token']
  setToken: React.Dispatch<React.SetStateAction<ConfirmToken['token']>>
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken} : NewPasswordTokenProps) {

  const [load, setLoad] = useState(false)

  const handleChange = (token : ConfirmToken['token'])=>{
    setToken(token)
  }
  const {mutateAsync} = useMutation({
    mutationFn:validateToken,
    onError:(error)=>{
      toast.error(error.message)
      setLoad(false)
    },
    onSuccess:(data)=>{
      toast.success(data)
      setIsValidToken(true);
    }
  })
  const handleComplete = async ()=>{
    setLoad(true)
    await mutateAsync({token})
    setLoad(false)
  }

  return (
    <div className="flex items-center flex-col space-y-5 pb-3">
      <label>Codigo de 6 digitos</label>
      <InputOTP value={token} onChange={handleChange} onComplete={handleComplete} maxLength={6} >
        <InputOTPGroup className=" bg-transparente rounded-lg" >
          <InputOTPSlot index={0}/>
          <InputOTPSlot index={1}/>
          <InputOTPSlot index={2}/>
        </InputOTPGroup>
        <InputOTPSeparator/>
        <InputOTPGroup className=" bg-transparente rounded-lg" >
          <InputOTPSlot index={3}/>
          <InputOTPSlot index={4}/>
          <InputOTPSlot index={5}/>
        </InputOTPGroup>
      
      </InputOTP>
    </div>
  )
}
