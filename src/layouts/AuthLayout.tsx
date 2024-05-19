import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function AuthLayout() {
    //# -> navigate
    const navigate = useNavigate()
    
    //# -> Identificar url
    const location = useLocation();
    const defaultURL = location.pathname.includes("/auth/login") ? "login" : "register"
    return (
        <>
             <div className=" h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
                <div className=" flex flex-col items-center justify-start space-y-3 mx-5 pt-3">
                    <div className="w-full flex items-center h-full justify-center">
                        <img className=" max-h-32" src="/UpTask.svg" alt="Logo UpTask" />
                    </div>
                    <Tabs defaultValue={defaultURL} className="w-[400px] md:w-8/12 lg:w-8/12">
                        <TabsList className=" grid w-full grid-cols-2">
                            <TabsTrigger onClick={()=>navigate("/auth/login")} value="login">Iniciar Sesion</TabsTrigger>
                            <TabsTrigger onClick={()=>navigate("/auth/register")} value="register">Registrarse</TabsTrigger>
                        </TabsList>

                        {/* //# -> Login */}
                        <TabsContent value="login">
                             <Outlet/>

                             {/* <nav className="w-full flex justify-center py-2">
                                <button 
                                
                                onClick={()=>navigate("/auth/register")}
                                >¿No tienes cuenta? <span className=" text-secundario">Crea una</span> </button>
                            </nav> */}
                        </TabsContent>
                        <TabsContent value="register"> <Outlet/> </TabsContent>
                        {defaultURL === "login" &&(
                            <TabsList className=" w-full bg-transparent">
                                <TabsTrigger 
                                    onClick={()=>navigate("/auth/register")}
                                    value="register" className="w-full bg-transparent"
                                    >¿No tienes cuenta?{"  "} <span className=" text-secundario">{" "}Crea una</span></TabsTrigger>
                            </TabsList>
                        )}
                    </Tabs>
                </div>
                <div className="max-h-screen hidden bg-muted lg:block">
                    <img className=" object-cover w-full h-full" src="/bg.jpg"/>
                </div>

            </div>
            
        </>
    )
}
