//# ->  Components
import { getTaskById, updateStatus } from "@/api/TaskApi";
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import {Drawer,DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerOverlay} from "@/components/ui/drawer"
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger} from "@/components/ui/accordion"
import {ResizableHandle,ResizablePanel,ResizablePanelGroup,} from "@/components/ui/resizable"
import AddNote from "../notes/AddNote";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

//# ->  Hooks
import { formatDate, formatDateHour } from "@/utils/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMediaQuery } from "usehooks-ts";
import { statusTranslations } from "@/locales/es";
import { Loader2 } from "lucide-react";
import { Task } from "@/types";
import { useState } from "react";
import NotesPanel from "../notes/NotesPanel";
import { Skeleton } from "../ui/skeleton";

//# ->  Types


export default function TaskModalDetails() {
    //# -> Styles
    
    const statusStyles : {[key:string]: string} = {
        pending:"bg-slate-500",
        inProgress:"bg-blue-500",
        onHold:"bg-red-500",
        underReview:"bg-amber-500",
        completed:"bg-emerald-500"
    }
    //# ->  MediaQuery
    const isDesktop = useMediaQuery("(min-width: 768px)")
    //# ->  Navigate
    const navigate = useNavigate();
    //# ->  Obtener id de la tarea a traves del url
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!
    //# -> analizar si existe taskId
    const existTaskId = taskId ? true : false;
    //# -> funcion para cerrar modal y volver a la anterior url
    const handleClose = ()=>{
        navigate(location.pathname,{replace:true})
    }
    //# -> obtener id del proyecto
    const params = useParams()
    const projectId = params.projectId!;
    //# ->  query
    const { data, isLoading } =  useQuery({
        queryKey:['task',taskId],
        queryFn:()=> getTaskById({projectId, taskId}),
        enabled:!!taskId
    })
    const create = data?.createdAt??"2023-04-29T18:27:59.411+00:00"
    const update = data?.updatedAt??"2023-04-29T18:27:59.411+00:00"
    const dateUpdate = formatDateHour(update)
    //# ->  QueryClient
    const queryClient = useQueryClient()
    //# ->  Mutation
    const { mutateAsync } = useMutation({
        mutationFn:updateStatus,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['viewProject', projectId]})
            queryClient.invalidateQueries({queryKey:['task', taskId]})
        }
    })
    //# -> State del select
    const [load, setLoad] = useState(false);
    //# ->  HandleChange
    const handleChange = async (e: Task['status'])=>{
        setLoad(true)
        const status = e
        const setData = {projectId, taskId, status}
        await mutateAsync(setData)
        setLoad(false)
    }
    //. ->  Historial
    const history = data?.completedBy ? data.completedBy : []
    if (isDesktop) {
        return (
          <Dialog open={existTaskId} onOpenChange={handleClose}>
            <DialogContent className=" w-full max-w-4xl max-h-[90vh]  p-10">
 
                {isLoading ? (
                    <>
                        Cargando
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <div className=" w-full flex justify-between px-5">
                                <div>
                                    <DialogTitle className=" text-2xl font-bold">{data?.name}</DialogTitle>
                                    <DialogDescription asChild className="  ">
                                        <>
                                            <p className=" text-sm text-secundario">Descripcion: <span className=" text-gray-400">
                                                {data?.description}    
                                            </span></p>
                                            
                                        </>
                                    </DialogDescription>
                                </div>
                                <div className=" mb-3 space-y-1">
                                    <p className=" text-xs text-gray-600">Creada el {
                                        formatDate(create!)
                                        
                                    }</p>
                                    <p className=" text-xs text-gray-600">Ultima modificacion el {
                                        dateUpdate.date
                                    } a las {dateUpdate.hour}</p>
                                </div>

                            </div>
                        </DialogHeader>
                        <ResizablePanelGroup className=" w-full border-2 rounded" direction={"horizontal"}>
                            <ResizablePanel className=" w-full p-10 flex flex-col justify-center">
                                <div className=" w-full mt-3 flex gap-5 items-center">
                                    <label  className=" font-bold flex items-center gap-x-1">
                                        <div className={`h-6 w-2  ${statusStyles[data?.status!]}`}></div>
                                        Estado:
                                    </label>
                                    <Select 
                                        defaultValue={data?.status}
                                        onValueChange={handleChange}    
                                        disabled={load}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Seleccione el estado" />
                                        </SelectTrigger>
                                        <SelectContent className="">
                                            <SelectGroup>
                                                {Object.entries(statusTranslations).map(([key, value]) =>(
                                                    <SelectItem key={key} value={key}>
                                                        <div className=" flex items-center gap-x-4">
                                                            <div className={` h-3 w-3 ${statusStyles[key]} rounded-full`}></div> {value}
                                                            
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {load && (
                                        <div>
                                            <Loader2 className=" animate-spin"/>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <HistoryChanges history={history}/>
                                </div>
                                <div className=" mt-5 w-full">
                                    <AddNote/>
                                    
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle/>
                            <ResizablePanel className=" w-full h-full">
                                <NotesPanel/>
                            </ResizablePanel>

                        </ResizablePanelGroup>
                        
                    
                    </>
                )}
                </DialogContent>
          </Dialog>
        )
    }
    //# ---------------------------------------------------------------------------------------------->
    return (
        <Drawer open={existTaskId}>
            <DrawerOverlay className=" z-50 bg-transparent" onClick={handleClose}/>
            <DrawerContent className=" mb-10">
                {isLoading ? (
                    <div className=" w-full p-5">
                        <Skeleton className=" w-3/4 h-10"/>
                        <Skeleton className=" mt-5 w-full h-14"/>
                    </div>
                ) : (
                    <>
                        <DrawerHeader className="text-left">
                            <div className=" mb-3 space-y-1">
                                <p className=" text-xs text-gray-600">Creada el {
                                    formatDate(create!)
                                    
                                }</p>
                                <p className=" text-xs text-gray-600">Ultima modificacion el {
                                    dateUpdate.date
                                } a las {dateUpdate.hour}</p>
                            </div>
                            <DrawerTitle className=" text-2xl font-bold">{data?.name}</DrawerTitle>
                            <DrawerDescription asChild className="  ">
                                <>
                                    <p className=" text-sm text-secundario">Descripcion: <span className=" text-gray-400">
                                        {data?.description}    
                                    </span></p>
                                    
                                </>
                            </DrawerDescription>
                        </DrawerHeader>
                        <ScrollArea className=" w-full h-[55vh]">
                            <ScrollBar orientation="vertical"/>
                            <div className=" w-full mt-3 flex gap-5 items-center  mx-5">
                                <label  className=" font-bold flex items-center gap-x-1">
                                    <div className={`h-6 w-2  ${statusStyles[data?.status!]}`}></div>
                                    Estado:
                                </label>
                                <Select 
                                    defaultValue={data?.status}
                                    onValueChange={handleChange}    
                                    disabled={load}
                                >
                                    <SelectTrigger className="w-[180px] z-50">
                                        <SelectValue placeholder="Seleccione el estado" />
                                    </SelectTrigger>
                                    <SelectContent className="">
                                        <SelectGroup>
                                            {Object.entries(statusTranslations).map(([key, value]) =>(
                                                <SelectItem key={key} value={key}>
                                                    <div className=" flex items-center gap-x-4">
                                                        <div className={` h-3 w-3 ${statusStyles[key]} rounded-full`}></div> {value}
                                                        
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {load && (
                                    <div>
                                        <Loader2 className=" animate-spin"/>
                                    </div>
                                )}
                            </div>
                            <div className=" mt-5 mx-5">
                                <HistoryChanges history={history}/>
                                <div className=" w-full mt-5">
                                    <AddNote/>
                                </div>
                                <div className=" w-full mt-5">
                                    <NotesPanel/>
                                </div>
                            </div>
                        </ScrollArea>
                        

                    </>
                )}
            </DrawerContent>
        </Drawer>
    )
}
type HistoryChangesProps = {
    history: Task['completedBy']
}
const HistoryChanges = ({history} : HistoryChangesProps)=>{
    return (
        <>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className=" text-lg">Historial de cambios</AccordionTrigger>
                    <AccordionContent>
                        <ScrollArea className=" h-28">
                            <ScrollBar orientation="vertical"/>
                            <ul className=" space-y-3">

                                {history.map((item, index) => (
                                    <div key={item._id} className=" ml-5 flex w-full gap-x-2 items-center">
                                        <div className=" text-xs font-bold">{index + 1} .-</div>
                                        <p className=" text-xs text-slate-50"><span className={`font-semibold`}>{statusTranslations[item.status] + " "}</span> por {item.user.name}</p>
                                    </div>
                                    )    
                                )}
                                {history.length=== 0 &&(
                                    <div className=" w-full h-5"><p>No hay registro de cambios</p></div>
                                )}
                            </ul>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}