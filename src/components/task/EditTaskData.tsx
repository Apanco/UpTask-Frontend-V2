
//# ->  Dependencies
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/TaskApi";    
import { Task } from "@/types";
import { useMediaQuery } from "usehooks-ts";

//# ->  Componentes
import TaskUpdateForm from "./TaskUpdateForm"

import {
    Drawer,

    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
  } from "@/components/ui/drawer"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    
} from "@/components/ui/dialog"
import { Skeleton } from "../ui/skeleton";

export default function EditTaskData() {

    //# ->  navigate
    const navigate = useNavigate()

    //# ->  Obtener el id de la tarea
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get("editTask")!
    const isOpen = taskId ? true : false;
    //# ->  Obtener proyecto de params
    const params = useParams();
    const projectId = params.projectId!
    //# ->  Query   
    const { data, isLoading} = useQuery({
        queryKey:["task", taskId],
        queryFn:()=>getTaskById({projectId, taskId}),
        enabled:!!taskId
    })
    //# ->  State del modal
    const isDesktop = useMediaQuery("(min-width: 768px)")
    //#-> Me elimina el navigate
    const handleModal = () => {
        navigate(location.pathname,{replace:true})
    }
    const handleClose = () => {
        navigate(location.pathname,{replace:true})
    }
    const secondData : Task = {
        _id: "",
        name: "",
        description: "",
        project: "",
        status: "pending"
    }
    if(isDesktop){
        return( 
            <Dialog open={isOpen} onOpenChange={handleModal}>
                <DialogContent className="w-full">
                    <DialogHeader>
                        <DialogTitle className=" text-2xl">Editar tarea</DialogTitle>
                        <DialogDescription asChild className=" mt-5 text-base">
                            <p>Edite el formulario para actualizar <span  className=" text-secundario">la tarea</span></p>
                        </DialogDescription>
                    </DialogHeader>
                        {isLoading ? (
                            <>
                                <Skeleton className=" w-full h-10 my-12"/>
                                <Skeleton className=" w-full h-10 mb-12"/>    
                                <Skeleton className=" w-2/4 h-10 mx-auto mb-12"/>
                            </>
                        ) : (
                            <>
                                <TaskUpdateForm task={data??secondData}/>

                            </>
                        )}
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <Drawer open={isOpen} onClose={handleClose}>
            <DrawerOverlay className=" z-50" onClick={handleClose} />
            <DrawerContent>
                <DrawerHeader >
                <DrawerTitle className=" text-2xl" >Editar tarea</DrawerTitle>
                <DrawerDescription asChild className=" mt-5 text-base">
                    <p>Edite el formulario para actualizar <span  className=" text-secundario">la tarea</span></p>
                </DrawerDescription>
                </DrawerHeader>
                <div className=" mb-5 px-5">
                    {isLoading ? (
                        <>
                            <Skeleton className=" w-full h-10 mb-16"/>
                            <Skeleton className=" w-full h-10 mb-16"/>    
                            <Skeleton className=" w-2/4 h-10 mx-auto mb-16"/>    
                        </>
                    ) : (
                        <>
                            <TaskUpdateForm task={data??secondData}/>

                        </>
                    )}

                </div>

            </DrawerContent>
            
        </Drawer>
      )
    
}
