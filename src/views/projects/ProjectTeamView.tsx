//# ->  Hooks
import { useNavigate, useParams } from "react-router-dom"


//# ->  Componentes
import C_Encabezado from "@/components/C_Encabezado"
import { Button } from "@/components/ui/button"
import Plus from "@/components/icons/Plus"
import ArrowLeftBack from "@/components/icons/ArrowLeftBack"
import TeamAddModal from "@/components/team/TeamAddModal"
import { useQuery } from "@tanstack/react-query"
import { getProjectTeam } from "@/api/TeamApi"
import { Skeleton } from "@/components/ui/skeleton"
import TeamDropMenu from "@/components/team/TeamDropMenu"

export default function ProjectTeamView() {
    const navigate = useNavigate()
    //. ->  Obtener id projecto
    const params = useParams()
    const projectId = params.projectId!
    //. ->  HandleClick
    const handleClick = ()=>{
        navigate(location.pathname + '?addMember=true')
    }
    //. -> Query
    const { data, isLoading } = useQuery({
        queryKey:['projectTeam', projectId],
        queryFn:()=>getProjectTeam({projectId}),
        retry:1
    })
    const members = data?? [];
    return (
        <>
            <C_Encabezado
                title="Administrar equipo"
                description="Administra el equipo de trabajo para este proyecto"
            >
                <Button
                    onClick={()=>navigate(`/projects/${projectId}`)} 
                    variant={"secondary"} 
                    className=" py-2 gap-x-3 w-full border-2 border-secundario flex items-center hover:text-secundario">
                    <ArrowLeftBack width={2}/>
                    <p className=" h-full">
                        Volver al proyecto
                    </p>
                </Button>

            </C_Encabezado>
            <div  className=" w-full mt-7 flex flex-col md:flex-row gap-5">
                <div className=" w-full md:w-1/2 flex ">
                    <Button 
                        onClick={handleClick}
                        variant={"secondary"} 
                        className=" gap-x-2 border-2 border-morado flex items-center hover:text-morado">
                        <Plus/>
                        <p className=" h-full">
                            Agregar miembros
                        </p>
                    </Button>

                </div>
            </div>
            <div className="w-full mt-10 space-y-5">
                {isLoading && (
                    <>
                        <Skeleton className=" w-full h-14"/>
                        <div className=" w-full flex justify-between gap-8">
                            <Skeleton className=" w-full h-20"/>
                            <Skeleton className=" w-full h-20"/>
                        </div>
                        <Skeleton className=" w-full h-20"/>
                    </>
                )}
                <h2 className="text-3xl text-center font-bold my-10">Miembros actuales</h2>
                {members.length ? (
                    <ul role="list" className="divide-y divide-borde border border-borde mt-10 bg-transparente shadow-lg">
                        {members.map((member) => (
                            <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">
                                        <p className="text-2xl font-black text-gray-100">
                                            {member.name}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                        {member.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-6">
                                    <TeamDropMenu id={member._id}/>   
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='text-center py-20'>No hay miembros en este equipo</p>
                )}
            </div>



            
            <TeamAddModal/>
        </>
    )
}
