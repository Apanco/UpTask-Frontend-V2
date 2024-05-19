import C_Logo from "@/components/C_Logo";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import Plus from "@/components/icons/Plus";
import HomeIcon from "@/components/icons/HomeIcon";
export default function SimpleLayout() {
    const navigate = useNavigate()
    return (
        <>
            <div className=" h-screen w-full flex justify-center items-center flex-col">
                <div className=" max-h-24 h-full w-full flex items-center justify-center">
                    <C_Logo h="24"/>
                </div>
                <div className=" w-full max-w-lg py-5 px-5 md:px-0">
                    <Button 
                        onClick={()=>navigate("/auth/login")}
                        variant={"secondary"} className=" w-full border-2 border-secundario flex items-center gap-x-2 hover:text-secundario">
                        <HomeIcon/>
                        <p className=" h-full">
                            Volver a inicio
                        </p>
                    </Button>
                </div>
                <Outlet/>
            </div>
            
        </>
    )
}
