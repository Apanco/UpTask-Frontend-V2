import { Link, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/api/ProjectApi"
import C_RecizableSimple from "@/components/C_RecizableSimple"

import C_ProjectList from "@/components/projects/C_ProjectList"
import Plus from "@/components/icons/Plus"
import C_isLoading from "@/components/C_isLoading"
import C_Encabezado from "@/components/C_Encabezado"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import ModalDeleteProject from "@/components/projects/ModalDeleteProject"
export default function DashboardView() {
    const navigate = useNavigate()


    const {isLoading:authLoading } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey:['projects'],
        queryFn:getProjects
    })
    return (
        <>  
            <C_Encabezado
                title="Mis proyectos"
                description="Maneja y administra tus proyectos"
            >
                <Button
                    onClick={()=>navigate("/projects/create")} 
                    variant={"secondary"} 
                    className=" py-2 gap-x-3 w-full border-2 border-secundario flex items-center hover:text-secundario">
                    <Plus/>
                    <p className=" h-full">
                        Nuevo proyetos
                    </p>
                </Button>
            </C_Encabezado>
            <div className=" mt-5">
                {isLoading || authLoading ? (//! Verifica si esta cargando
                    <C_isLoading/>
                ) : data && data.length === 0 ? (//!Verifica que exista data, y despues analiza si tiene algo en su arreglo
                    <div>
                        <C_RecizableSimple>
                            <div className=" w-full m-auto flex justify-center items-center p-4">
                                <p>
                                    Aun no hay proyectos  <Link to={"/projects/create"} className=" text-secundario font-bold">Cree uno ahora</Link>
                                </p>
                            </div>
                        </C_RecizableSimple>
                    </div>
                ) :(
                    <>
                        <ul role="list" className=" divide-y-2 border-2 divide-borde  mt-10 bg-transparente shadow-lg">
                        {data?.map((project) => (
                                <C_ProjectList
                                    key={project._id}
                                    project={project}
                                />
                            ))}
                        </ul>
                    </>
                )}
                
            </div>
            <ModalDeleteProject/>
        </>
    ) 
}
