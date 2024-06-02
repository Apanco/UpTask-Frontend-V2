
import { Project, User } from '@/types'
import { Link } from "react-router-dom"
import DropMenuProjects from '@/components/projects/DropMenuProjects'
import ProjectProgressBar from './ProjectProgressBar'
import { obtenerEtapa, setPorcentaje } from '@/utils/utils'
import { useAuth } from '@/hooks/useAuth'
import { Badge } from '../ui/badge'
import { isManager } from '@/utils/policies'
import { useMediaQuery } from 'usehooks-ts'
type C_ProjectLisProps = {
    project: Project
}
const statusStyles : {[key:string]: string} = {
    pending:"border-l-slate-500",
    inProgress:"border-l-blue-500",
    onHold:"border-l-red-500",
    underReview:"border-l-amber-500",
    completed:"border-l-emerald-500"
    }

export default  function C_ProjectList({project} : C_ProjectLisProps) {
    //. ->  MediaQuery
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const {data } = useAuth();
    const user : User  = data ?? {
        _id:"",
        name:"",
        email:""
    }

    const tasks = project.tasks
    const projectCompletionPercentage = setPorcentaje({tasks})
    const estado = obtenerEtapa(projectCompletionPercentage)
    //. ->  Desktop
    if(isDesktop){

        return (
            <>
                <li 
                    key={project._id} 
                    className={`flex justify-between gap-x-6 px-5 py-10 hover:bg-secundarioF`}>
                    <div className="flex min-w-0 gap-x-10 w-full justify-around flex-col md:flex-row">
                        <div className={`min-w-0 flex-auto w-full md:w-1/2 space-y-2 mb-5 md:mb-0 border-0 border-l-4 pl-4 ${statusStyles[estado]}`}>
            
                            
                            <Link to={`/projects/${project._id}`}
                                className="text-white cursor-pointer hover:underline hover:text-secundario text-3xl font-bold"
                            >{project.projectName}</Link>
                            <p className="text-sm text-gray-400">
                                Cliente: {project.clientName}
                            </p>
                            <p className="text-sm text-gray-400 text-ellipsis overflow-hidden">
                                {project.description}
                            </p>
                        </div>
                        <div className=' w-full md:w-1/2 flex flex-col justify-center gap-y-5 items-start'>
                            {
                                isManager( project.manager, user._id ) ? (
                                    <Badge className=' border-2 px-4 border-blue-600' variant={"secondary"}>Manager</Badge>
                                ) : (
                                    <Badge className=' border-2 px-4 border-green-600'  variant={"secondary"}> miembro</Badge>
                                )
                            }
                            <ProjectProgressBar tasks={project.tasks}/>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-6">
                        <DropMenuProjects 
                            project={project}
                        />
                    </div>
                </li>
            
            </>
        )
    }
    //. ->  Mobile
    else{

        return (
            <>
                <li 
                    key={project._id} 
                    className={`flex flex-col justify-between gap-x-6 px-5 py-10 hover:bg-secundarioF`}>
                    <div className=' w-full flex justify-between'>
                        <div className="flex min-w-0 gap-x-10 w-full justify-around flex-col md:flex-row">
                            <div className={`min-w-0 flex-auto w-full md:w-1/2 space-y-2 mb-5 md:mb-0 border-0 border-l-4 pl-4 ${statusStyles[estado]}`}>
                                <Link to={`/projects/${project._id}`}
                                    className="text-white cursor-pointer hover:underline hover:text-secundario text-3xl font-bold"
                                >{project.projectName}</Link>
                                <p className="text-sm text-gray-400">
                                    Cliente: {project.clientName}
                                </p>
                                <p className="text-sm text-gray-400 text-ellipsis overflow-hidden">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-6">
                            <DropMenuProjects 
                                project={project}
                            />
                        </div>
                    </div>
                    <div className=' w-full flex gap-x-5 items-center'>
                            {
                                isManager( project.manager, user._id ) ? (
                                    <Badge className=' border-2 px-4 border-blue-600' variant={"secondary"}>Manager</Badge>
                                ) : (
                                    <Badge className=' border-2 px-4 border-green-600'  variant={"secondary"}> miembro</Badge>
                                )
                            }
                            <ProjectProgressBar tasks={project.tasks}/>
                        </div>
                </li>
            
            </>
        )
    }
}
