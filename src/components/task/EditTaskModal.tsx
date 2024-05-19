//# ->  Componentes
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
//# ->  Hooks
import { useMediaQuery } from 'usehooks-ts'


//# ->  Types
import TaskUpdateForm from "./TaskUpdateForm"
import { useLocation, useNavigate } from "react-router-dom"
import { Task } from "@/types"

type EditTaskModalProps = {
    task: Task
}

export default function EditTaskModal({task} : EditTaskModalProps) {
    //# ->  navigate
    const navigate = useNavigate()
    //# ->  State del modal
    const isDesktop = useMediaQuery("(min-width: 768px)")

    //# ->  Obtener el id de la tarea
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get("editTask")!
    const isOpen = taskId ? true : false;
    
    //#-> Me elimina el navigate

    const handleModal = () => {
        navigate(location.pathname,{replace:true})
    }
    const handleClose = () => {
        navigate(location.pathname,{replace:true})
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
                        <TaskUpdateForm task={task}/>
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
                <div className=" mb-5">
                    <TaskUpdateForm task={task}/>

                </div>

            </DrawerContent>
            
        </Drawer>
      )
}
