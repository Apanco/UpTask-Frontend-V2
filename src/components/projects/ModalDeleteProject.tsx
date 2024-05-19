import { useMediaQuery } from "usehooks-ts"
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import {Drawer,DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerOverlay} from "@/components/ui/drawer"
import { useLocation, useNavigate } from "react-router-dom"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader2, Trash2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { CheckPassword, Project } from "@/types"
import ErrorMessageXs from "../ErrorMessageXs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { checkPassword } from "@/api/ProfileApi"
import { toast } from "react-toastify"
import { useState } from "react"
import { deleteProject } from "@/api/ProjectApi"
export default function ModalDeleteProject() {

    //. ->  MediaQuery
    const isDesktop = useMediaQuery("(min-width: 768px)")
    //. ->  Navigate
    const navigate = useNavigate()
    //. ->  projectId}
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search );
    const projectId = queryParams.get("deleteProject")!
    const existProject = projectId ? true : false;
    //. ->  Close modal
    const handleClose = ()=>{
        navigate(location.pathname,{replace:true})
    }


    //. ->  Textos del modal
    const title = "¿Estas seguro?"
    const description=["Esto eliminara tus tareas, notas y miembros relacionados", "para siempre", "¡Eso es mucho tiempo!"]
    if(isDesktop){
        return (
            <Dialog open={existProject} onOpenChange={handleClose}>
                <DialogContent className=" p-10 md:px-14 bg-background max-w-xl">
                    <DialogHeader className=" space-y-3">
                        <DialogTitle className=" text-3xl font-bold">{title}</DialogTitle>
                        <DialogDescription> {description[0]} <span className=" text-primary"> {description[1]} </span>{" "+description[2]}</DialogDescription>
                    </DialogHeader>
                    <div className=" w-full">
                        <div className=" h-[1px] w-full bg-border my-5"></div>
                        <FormCheckPassword projectId={projectId} handleClose={handleClose}/>
                    </div>
                </DialogContent>
            </Dialog>
        )
    } else{
        return(
            <Drawer open={existProject} onClose={handleClose}>
                <DrawerOverlay onClick={handleClose} className=" z-50 bg-transparent"/>
                <DrawerContent className=" p-5 pb-16">
                    <DrawerHeader className=" space-y-2">
                        <DrawerTitle className=" text-2xl font-bold">{title}</DrawerTitle>
                        <DrawerDescription className=" text-start">{description[0]} <span className=" text-primary"> {description[1]} </span>{" "+description[2]}</DrawerDescription>
                    </DrawerHeader>
                    <div className=" w-full">
                        <div className=" h-[1px] w-full bg-border my-5"></div>
                        <FormCheckPassword projectId={projectId} handleClose={handleClose}/>
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }
}
type FormCheckPasswordProps = {
    projectId: Project['_id']
    handleClose: ()=>void
}

const FormCheckPassword = ({projectId, handleClose}: FormCheckPasswordProps)=>{

    //. -> button state
    const [load, setLoad] = useState(false)

    //. ->  Default values
    const initialValues : CheckPassword = {
        password:""
    }
    //. ->  react-hook-form
    const { register, formState:{errors}, handleSubmit } =useForm({defaultValues:initialValues})

    //. ->  QueryClient
    const queryClient = useQueryClient();

    //. ->  Mutation checkPassword
    const checkPasswordMutation = useMutation({
        mutationFn:checkPassword,
        onError:(error)=>{
            toast.error(error.message)
            setLoad(false);
        },
        onSuccess:()=>{
            
        }
    })

    //. ->  delete project mutation
    const deleteProjectMutation = useMutation({
        mutationFn:deleteProject,
        onError:(error)=>{
            toast.error(error.message)
            setLoad(false);
        },
        onSuccess:()=>{
            toast.success("Proyecto eliminado correctamente")
            queryClient.invalidateQueries({queryKey:['projects']})
            handleClose()
            
        }
    })

    //. ->  handleSubmit
    const handleForm = async (checkForm : CheckPassword)=>{
        setLoad(true)
        await checkPasswordMutation.mutateAsync({checkForm})
        await deleteProjectMutation.mutateAsync(projectId)
        setLoad(false);
    }
    
    return (
        <>
            <form className=" space-y-5" noValidate onSubmit={handleSubmit(handleForm)}>
                <label htmlFor="password" className=" text-muted-foreground">Ingrese su contraseña para continuar</label>
                <div className=" flex justify-center items-center gap-x-1">
                    <Input
                        id="password"
                        type="password"
                        className=" h-full rounded-r-none"
                        {...register("password", {
                            required:"Este campo es obligatorio"
                        })}
                    />
                    <Button
                        type="submit"
                        variant={"secondary"}
                        className=" h-full rounded-l-none border-2 border-red-700 text-red-700 disabled:text-white"
                        disabled={load}
                    >
                        {load ? (
                            <>
                                <Loader2 className=" w-5 h-5 animate-spin"/>
                            </>
                        ): (
                            <>
                                <Trash2Icon className=" w-5 h-5"/>
                            </>
                        )}

                    </Button>
                </div>
                <div className=" w-full mt-3 h-3">
                    {errors.password && <ErrorMessageXs>{errors.password.message}</ErrorMessageXs>}
                </div>
            </form>
        </>
    )
}