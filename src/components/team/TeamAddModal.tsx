//# ->  Componentes
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle} from "@/components/ui/dialog"
import {Drawer,DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerOverlay} from "@/components/ui/drawer"
import { useLocation, useNavigate } from "react-router-dom";
//# ->  Hooks
import { useMediaQuery } from "usehooks-ts";
import TeamAddForm from "./TeamAddForm";

//# ->  Types



//# ->  Componente
export default function TeamAddModal() {
    //. ->  Navigate
    const navigate = useNavigate()
    //. ->  MediaQuery
    const isDesktop= useMediaQuery("(min-width: 768px)")
    //. ->  Location
    const location = useLocation()
    const queryParams= new URLSearchParams(location.search)
    const modalMember = queryParams.get("addMember")
    const openModal = modalMember ? true : false;
    //. -> Function to close modal
    const handleClose = ()=>{
        navigate(location.pathname,{replace:true})
    }
    //# ->  Desktop
    if(isDesktop){
        return(
            <Dialog  open={openModal} onOpenChange={handleClose}>
                <DialogContent className=" p-10 max-w-xl">
                    <DialogHeader>
                        <DialogTitle className=" text-2xl font-bold">Agregar integrante al equipo</DialogTitle>
                        <DialogDescription asChild>
                            <Description/>
                        </DialogDescription>
                    </DialogHeader>
                    <TeamAddForm/>
                </DialogContent>
            </Dialog>
        )
    } 
    //# ->  Movil
    else{
        return(
            <Drawer open={openModal}>
                <DrawerOverlay className=" z-50 bg-transparent" onClick={handleClose}/>
                <DrawerContent className=" p-5 mb-14">
                    <DrawerHeader>
                        <DrawerTitle className=" text-2xl font-bold">Agregar integrante al equipo</DrawerTitle>
                        <DrawerDescription className="" asChild>
                            <Description/>
                        </DrawerDescription>
                    </DrawerHeader>
                    <TeamAddForm/>
                </DrawerContent>
            </Drawer>
        )
    }

}

const Description = ()=>{
    return(
        <p className=" text-start pt-3 text-sm">Busca el nuevo integrante por su e-mail{" "} <span className=" text-secundario">para agregarlo al proyecto</span></p>
    )
}
