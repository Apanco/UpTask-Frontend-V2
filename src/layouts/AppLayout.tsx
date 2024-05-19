//# ->  Dependencias
import { Link, Outlet, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'; 

//# ->  Componentes
import C_Logo from "@/components/C_Logo";
import C_Sheet from "@/components/C_Sheet";
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { User } from "@/types";


//# ->  Componente principal
export default function AppLayout() {
    //. ->  Usuario alternativo
    const alternativeUSer : User = {
        name:"",
        email:"",
        _id:""
    }
    //. ->  Navigate
    const navigate = useNavigate()
    //. ->  Obtener usuario
    const { data, isLoading, isError} = useAuth()
    if(isError){
        navigate("/auth/login")
    }
    return (
        <>
            
            <header
                className=" bg-negro py-4 ">
                <div className=" max-w-screen-lg w-full mx-auto flex justify-between items-center px-4">
                    <div className=" w-52 md:w-64"><Link to="/"><C_Logo/></Link>  </div>
                    <C_Sheet user={data?data:alternativeUSer}/>
                </div>
            </header>
                <Separator/>
            <section className="max-w-screen-lg mx-auto mt-6 p-5">
                {isLoading?(
                    <>
                        <div className=" bg-transparente top-0 bottom-0 left-0 w-screen h-screen fixed flex justify-center items-center">
                            <Loader2 
                                className=" animate-spin"
                                size={64}
                                strokeWidth={2}    
                            />
                        </div>
                    </>
                ):(
                    <>
                        <Outlet/>
                    </>
                )}
            </section>
            <footer className=" py-5">
                <p className=" text-center">Todos los derechos reservados {new Date().getFullYear()}</p>
            </footer>
        </>
    )
}


