import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ArrowLeft from "./icons/ArrowLeft";
import C_Avatar from "./C_Avatar";
import { useState } from "react";
import { User } from "@/types";
import C_RecizableSimple from "./C_RecizableSimple";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import UserIcon from "./icons/User";
import HomeIcon from "./icons/HomeIcon";
import LogoutIcon from "./icons/LogoutIcon";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type C_SheetProps = {
  user: User;
};

export default function C_Sheet({ user }: C_SheetProps) {
  //. ->  State del boton
  const [load, setLoad] = useState(false)
  //. ->  sheet State
  const [open, setOpen] = useState(false)
  //. ->  QueryClient
  const queryClient = useQueryClient()
  //. -> Funcion logout
  //. ->  navigate
  const navigate = useNavigate();
  const logout = async () => {

    setLoad(true)
    await Promise.allSettled([
      localStorage.removeItem('AUTH_TOKEN'),
      queryClient.invalidateQueries({queryKey:['user']})
    ]) 
    toast.success("Has cerrado sesion")
    setLoad(false)
   
  }

  //. -> State del boton
  const [color, setColor] = useState("#FFF");
  const changeColor = () => {
    setColor("hsl(346.8, 77.2%, 49.8%)");
  };
  //. ->  Inicial
  const initial = user.name.slice(0,2);
  const leve = () => {
    setColor("#FFF");
  };
  return (
    <>
      <Sheet open={open} onOpenChange={()=>setOpen(!open)}>
        <SheetTrigger onClick={()=>setOpen(true)}>
          <div
            onMouseEnter={changeColor}
            onMouseLeave={leve}
            className=" flex items-center gap-x-4 py-1 border-2 border-white px-3 rounded-full hover:border-secundario text-secundario"
          >
            <C_Avatar name={initial} />
            <ArrowLeft color={color} width={3} />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className=" mt-5">
            <SheetTitle asChild>
              <C_RecizableSimple color="transparent">
                <div className=" w-full h-full p-3 flex justify-center items-center">
                  <img className=" h-12 md:h-20" src="/UpTask.svg" alt="Logo UpTask"/>
                </div>
              </C_RecizableSimple>
            </SheetTitle>
          </SheetHeader>
          <div className=" mt-5 w-full h-auto">
            <C_RecizableSimple color="">
              <div className=" w-full flex flex-col md:flex-row px-3 bg-none items-center">

                <div className=" w-1/3 h-full flex items-center">
                  <Avatar className=" w-20 h-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className=" text-xl text-secundario">{initial}</AvatarFallback>
                  </Avatar>
                </div>

                <div className=" w-2/3 h-full py-2 flex flex-col justify-center text-center md:text-start">
                  <p className=" text-xl font-bold"> Hola <span>{user.name}</span> </p>
                  <p className=" text-sm"> {user.email} </p>
                </div>
              </div>

            </C_RecizableSimple>

          </div>
          <div className=" w-full h-full mt-5">
            <C_RecizableSimple color="transparent">
              <div className=" w-full h-full flex flex-col">
                <Button onClick={()=>{
                  navigate("/profile")
                  setOpen(false)
                }} className=" w-full text-start flex justify-start cursor-pointer" asChild variant={"ghost"}>
                  <div className=" w-full flex justify-start items-center gap-x-3">
                    <UserIcon w={4} h={4}/>
                    <p className=" text-base">Mi perfil</p>
                  </div>
                </Button>

                <Button onClick={()=>{
                  navigate("/")
                  setOpen(false)
                }} className=" w-full text-start flex justify-start" variant={"ghost"}>
                  <div className=" w-full flex justify-start items-center gap-x-3">
                    <HomeIcon w={4} h={4}/>
                    <p className=" text-base">Mis proyectos</p>
                  </div>
                </Button>

                <Button 
                  disabled={load}
                  className=" w-full text-start flex justify-start text-red-700 hover:bg-red-700" 
                  variant={"ghost"}
                  onClick={logout}
                  >
                  <div className=" w-full flex justify-start items-center gap-x-3">
                    {load ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        <p className=" text-base">Cerrando sesion</p>
                      </>
                    ) : (
                      
                      <>
                        <LogoutIcon w={4} h={4}/>
                        <p className=" text-base">Cerrar sesión</p>

                      </>
                    )}
                  </div>
                </Button>

              </div>
            </C_RecizableSimple>
          </div>


        </SheetContent>
      </Sheet>
    </>
  );
}
