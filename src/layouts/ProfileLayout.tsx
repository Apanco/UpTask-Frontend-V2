import { Outlet, useLocation, useNavigate } from "react-router-dom";
//# ->  Components
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "usehooks-ts";
import { LockIcon, User2Icon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";



export default function ProfileLayout() {
    //. ->  user
    const { data } = useAuth()
    const initial = data?.name.slice(0,2)
    //. ->  Identificar url
    const location = useLocation()
    const defaultURL = location.pathname.includes("profile/password") ? "password" : "profile"

    //. ->  Navigate
    const navigate = useNavigate()

    //. ->  Mediquery
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if(isDesktop){
        return (
            <>  
                <Tabs defaultValue={defaultURL} value={defaultURL}>
                    <TabsList className=" w-[400px]">
                        <TabsTrigger onClick={()=>navigate("/profile")} className=" w-1/2" value="profile">
                            <div className=" w-full flex  justify-center items-center gap-x-2">
                                <User2Icon className=" w-4 h-4"/>
                                <p>Perfil</p>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger onClick={()=>navigate("/profile/password")} className=" w-1/2" value="password">
                            <div className=" w-full flex  justify-center items-center gap-x-2">
                                <LockIcon className=" w-4 h-4"/>
                                <p>Contraseña</p>
                            </div>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <Card className=" w-full mt-10 pb-5 bg-background">
                    <div className=" w-full h-24 relative">
                        <div className=" bg-gradient-to-r from-yellow-200 to-pink-400 w-full h-24 absolute flex justify-center items-center overflow-hidden">
                            <img className=" object-center w-full" src="/port2.svg" alt="" />
                        </div>
                        <div className=" w-full flex items-center justify-center absolute -bottom-16">
                            <div className=" w-32 h-32 bg-background rounded-full flex justify-center items-center ">
                                <Avatar className=" w-28 h-28">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className=" text-xl text-secundario">{initial}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-16">
                        <Outlet/>   
                    </div>
                </Card>
            </>
    
        )
    }
    else{
        return(
            <>
                <Tabs defaultValue={defaultURL} value={defaultURL}>
                    <TabsList className=" w-full">
                        <TabsTrigger onClick={()=>navigate("/profile")} className=" w-1/2" value="profile">
                            <div className=" w-full flex  justify-center items-center gap-x-2">
                                <User2Icon className=" w-4 h-4"/>
                                <p>Perfil</p>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger onClick={()=>navigate("/profile/password")} className=" w-1/2" value="password">
                        <div className=" w-full flex  justify-center items-center gap-x-2">
                                <LockIcon className=" w-4 h-4"/>
                                <p>Contraseña</p>
                            </div>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <Card className=" w-full h-auto pb-5 mt-10 bg-background">
                    <div className=" w-full h-24 relative">
                        <div className=" bg-gradient-to-r from-yellow-200 to-pink-400 w-full h-24 absolute flex justify-center items-center overflow-hidden">
                            <img className=" h-full mx-auto object-center" src="/port2.svg" alt="" />
                        </div>
                        <div className=" w-full flex items-center justify-center absolute -bottom-16">
                            <div className=" w-32 h-32 bg-background rounded-full flex justify-center items-center ">
                                <Avatar className=" w-28 h-28">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className=" text-xl text-secundario">{initial}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-24 w-full">
                        <Outlet/>   

                    </div>
                </Card>
            </>
        )
    }
}
