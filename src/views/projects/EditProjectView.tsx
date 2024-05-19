
//# ->  Dependencies
import { useParams } from "react-router-dom"
import { useQuery    } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectApi";
import { Link } from "react-router-dom";
//# ->  Components
import ArrowLeftBack from "@/components/icons/ArrowLeftBack";
import C_isLoading from "@/components/C_isLoading";
import C_RecizableSimple from "@/components/C_RecizableSimple";
import UpdateProjectForm from "@/components/projects/UpdateProjectForm";
import C_Encabezado from "@/components/C_Encabezado";
export default function EditProjectView() {
    const params = useParams()
    const projectId = params.projectId!
    
    const { data, isLoading, isError } = useQuery({
        queryKey:['editProject', projectId],
        queryFn: ()=> getProjectById(projectId),
        retry:2
    })
    return (
        <>
            <C_Encabezado
                title="Editar proyecto"
                description="Edite los campos del formulario para editar el proyecto"
            >
                <Link to={"/"}
                    className=" py-2 px-4 border-2 border-secundario text-secundario rounded flex hover:bg-secundarioF hover:text-white"
                >   
                    <div className=" flex flex-row gap-x-3 mx-auto">
                        <ArrowLeftBack width={2}/>
                        Volver a proyectos  
                    </div>
                </Link>

            </C_Encabezado>
        
            {
                //? Cuerpo de la pagina
            }
            <div className="max-w-3xl mx-auto mt-5">
                {isLoading ?(
                    <>
                        <C_isLoading/>
                    </>
                ) : isError ? (
                    <>
                        <C_RecizableSimple color="secundario">
                            <div className="w-full flex items-center justify-center py-5 gap-x-2">
                                <p>Ups... proyecto no encontrado </p>
                                <Link className="text-secundario" to={"/"}>  Volver a proyectos</Link>
                            </div>
                        </C_RecizableSimple>
                    </>
                ) : (
                    <>
                        <UpdateProjectForm data={data!}/>
                    </>
                )}
            </div>
        </>
    )
}
