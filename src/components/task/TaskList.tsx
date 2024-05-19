import { Project, Task, TaskProject } from '@/types'
import TaskCard from './TaskCard'
import { statusTranslations } from '@/locales/es'
import { DndContext, DragEndEvent } from "@dnd-kit/core"
//# -> Componentes

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DropTask from './DropTask'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatus } from '@/api/TaskApi'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'


type GroupTask ={
    [key:string]:TaskProject[]
}

const statusStyles : {[key:string]: string} = {
    pending:"border-t-slate-500",
    inProgress:"border-t-blue-500",
    onHold:"border-t-red-500",
    underReview:"border-t-amber-500",
    completed:"border-t-emerald-500"
}
const initialStatusGroups : GroupTask = {
    pending:[],
    inProgress:[],
    onHold:[],
    underReview:[],
    completed:[]
}
//# ->  Type de los props
type TaskListProps = {
    tasks: TaskProject[],
    canEdit: boolean
}
//# ->  Componente
export default function TaskList({tasks, canEdit} : TaskListProps) {
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups); 
    //. ->  PROJECTiD
    const params = useParams()
    const projectId = params.projectId!
     //# ->  QueryClient
     const queryClient = useQueryClient()
     //# ->  Mutation
     const { mutate } = useMutation({
         mutationFn:updateStatus,
         onError:(error)=>{
             toast.error(error.message)
         },
         onSuccess:(data)=>{
             toast.success(data)
            queryClient.invalidateQueries({queryKey:['viewProject', projectId]})
            //  queryClient.invalidateQueries({queryKey:['task', taskId]})
         }
     })

    const handleDragEnd = (event: DragEndEvent)=>{
        const {over, active} = event
        if(over && over.id){
            const taskId =active.id.toString()
            const status = over.id as Task['status']

            mutate({taskId,projectId,status})
            queryClient.setQueryData(['viewProject', projectId],(prevData: Project)=>{
                const updateTasks = prevData.tasks.map((task : TaskProject)=>{
                    if(task._id=== taskId){
                        return{
                            ...task,
                            status

                        }
                    }
                    return task
                })
                return {
                    ...prevData,
                    tasks:updateTasks
                }
            })
        }
    }

    return (
            <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>
            
            <ScrollArea className=' w-full whitespace-nowrap rounded-md border'>
                <ScrollBar orientation="horizontal" />

                <div className='flex gap-3 pb-32 max-w-[980px] w-full px-0 mx-auto'>
                    <DndContext onDragEnd={handleDragEnd}>
                        {Object.entries(groupedTasks).map(([status, tasks]) => (
                            <div key={status} className=' w-1/5'>
                                <h3 className={` text-center text-white text-base font-normal border border-borde bg-input px-3 py-1 border-t-8 ${statusStyles[status]}`}>{statusTranslations[status]}</h3>
                                <DropTask status={status}/>
                                
                                <ul className='mt-5 space-y-5'>
                                    {tasks.length === 0 ? (
                                        <li className=" text-muted-foreground text-center font-semibold pt-3">No Hay tareas</li>
                                    ) : (
                                        tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit}/>)
                                    )}
                                </ul>
                            </div>
                        ))}

                    </DndContext>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            
        </>
    )
}

