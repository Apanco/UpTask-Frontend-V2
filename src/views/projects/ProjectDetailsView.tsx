//# ->  Dependencies
import {  useNavigate, useParams } from "react-router-dom"
import { useQuery    } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectApi";
import { Link } from "react-router-dom";

//# ->  Components
import { Skeleton } from "@/components/ui/skeleton"
import C_RecizableSimple from "@/components/C_RecizableSimple";
import C_Encabezado from "@/components/C_Encabezado";
import TaskModal from "@/components/task/TaskModal";
import { Button } from "@/components/ui/button";
import User from "@/components/icons/User";
import TaskList from "@/components/task/TaskList";
import EditTaskData from "@/components/task/EditTaskData";
import TaskModalDetails from "@/components/task/TaskModalDetails";
import TaskProgressBar from "@/components/task/TaskProgressBar";
import C_BotonVolverProyectos from "@/components/C_BotonVolverProyectos";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";
export default function ProjectDetailsView() {
    //. ->  Usuario autenticado
    const {data:user } = useAuth();

    const navigate= useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    
    const { data, isLoading, isError } = useQuery({
        queryKey:['viewProject', projectId],
        queryFn: ()=> getProjectById(projectId),
        retry:2
    })
    const managerId = data?.manager ??""
    const userId = user?._id ?? ""

    //. ->  Verificar si es mannager
    const canEdit = useMemo(()=>{
        return data?.manager === user?._id
    },[data, user])

    return (
        <>
            {isLoading ?(//$ -> Si esta cargando
                <>
                    <div className="flex flex-col-reverse w-full md:justify-between md:flex-row">
                        <div>
                            <Skeleton className=" h-[48px] w-[420px] rounded-xl" />
                            <Skeleton className="  mt-6 md:mt-11 h-[32px] w-[400px] rounded-xl" />
                        </div>
                        <nav className="my-5">
                            <C_BotonVolverProyectos/>
                        </nav>
                    </div>
                    <Skeleton className=" w-full h-52 rounded-xl mt-10"  />
                </>
            ) : isError ? (//$ ->   Si dio error 
                <>
                    <C_RecizableSimple color="secundario">
                        <div className="w-full flex items-center justify-center py-5 gap-x-2">
                            <p>Ups... proyecto no encontrado </p>
                            <Link className="text-secundario" to={"/"}>  Volver a proyectos</Link>
                        </div>
                    </C_RecizableSimple>
                </>
            ) : (//$ -> Si fue correcta la consulta
                    <>
                        <C_Encabezado
                            title={data?.projectName}
                            description={data?.description}
                        >

                            <C_BotonVolverProyectos/>
                        </C_Encabezado>
                        <div className=" w-full mt-7 flex flex-col md:flex-row gap-5">
                            {
                                //# -> Verifica si es manager
                            isManager(managerId, userId) && (
                                <>
                                    <div className=" w-full md:w-1/2">
                                        <C_RecizableSimple>
                                            <div className=" w-full flex gap-x-10 justify-center md:justify-around px-10">
                                                <TaskModal/>
                                                <Button 
                                                    onClick={()=>navigate(`/projects/${data?._id??"s"}/team`)}
                                                    variant={"secondary"} 
                                                    className=" gap-x-2 w-full border-2 border-morado flex items-center hover:text-morado">
                                                    <User w={5} h={5}/>
                                                    <p className=" h-full">
                                                        Miembros
                                                    </p>
                                                </Button>
                                            </div>
                                        </C_RecizableSimple>

                                    </div>
                                
                                </>
                            )}
                            <div className=" w-full md:w-1/2">
                                <C_RecizableSimple>
                                    {data&&(
                                        <TaskProgressBar tasks={data.tasks??[]}/>
                                    )}
                                </C_RecizableSimple>
                            </div>
                        </div>
                        <main>
                            <TaskList
                                tasks={data?.tasks??[]}
                                canEdit = {canEdit}
                            />
                        </main>
                    </>
                )}  
            <EditTaskData/>
            <TaskModalDetails/>
            
        </>

    )
}
