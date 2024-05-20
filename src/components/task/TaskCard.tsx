import { TaskProject } from "@/types"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import DropMenuTask from "./DropMenuTask"
import { useNavigate } from "react-router-dom"
import { useDraggable } from "@dnd-kit/core"
import { useMediaQuery } from "usehooks-ts"


type TaskCardProps = {
    task:TaskProject,
    canEdit:boolean
}
const statusStyles : {[key:string]: string} = {
    pending:"border-slate-500",
    inProgress:"border-blue-500",
    onHold:"border-red-500",
    underReview:"border-amber-500",
    completed:"border-emerald-500"
}
const statusStylesText : {[key:string]: string} = {
    pending:"text-slate-500",
    inProgress:"text-blue-500",
    onHold:"text-red-500",
    underReview:"text-amber-500",
    completed:"text-emerald-500"
}

export default function TaskCard({task, canEdit}:TaskCardProps) {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const { attributes, listeners, setNodeRef, transform, over, active } = useDraggable({
        id:task._id
    });
    const navigate = useNavigate()
    const handleTask = () => {
        navigate(location.pathname + `?viewTask=${task._id}`)
    }
    const style = transform ? {
        transform:`translate3d(${transform.x}px, ${transform.y}px, 0px)`
    } : undefined
    const styleCard = over && active?.id===task._id ? `border ${statusStyles[over.id]} ${statusStylesText[over.id]}` : ""
    if(isDesktop){

        return (
            <li>
                <Card 
                    
                    {...attributes}
                    ref={setNodeRef}
                    style={style}
    
                    className=" bg-transparente w-full pb-5 text-muted-foreground cursor-default z-30">
                    <div {...listeners} className={`cursor-grab ${styleCard} w-full text-muted-foreground flex justify-center items-center border-b h-14 md:h-5`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                        </svg>
                    </div>
                    <div className=" min-w-0 flex flex-col gap-y-1 px-2">
                        <div className="w-full flex justify-between">
                            <Button
                                variant={"link"}
                                className=" text-white text-left justify-start px-2 py-0 hover:text-secundario line-clamp-2"
                                onClick={handleTask}
                            >
                                {task.name}</Button>
                            <DropMenuTask task={task} canEdit={canEdit}/>
                        </div>
                        <p className=" pl-2 text-gray-400 line-clamp-3 w-full">{task.description}</p>
                    </div>
                </Card>
               
            </li>
        )
    }
    else{
        return (
            <li>
                <Card 
                    
                    {...attributes}
                    ref={setNodeRef}
                    style={style}
    
                    className=" bg-transparente w-full pb-5 text-muted-foreground cursor-default z-30">
                    
                    <div className=" min-w-0 flex flex-col gap-y-1 px-2">
                        <div className="w-full flex justify-between">
                            <Button
                                variant={"link"}
                                className=" text-white text-left justify-start px-2 py-0 hover:text-secundario line-clamp-2"
                                onClick={handleTask}
                            >
                                {task.name}</Button>
                            <DropMenuTask task={task} canEdit={canEdit}/>
                        </div>
                        <p className=" pl-2 text-gray-400 line-clamp-3 w-full">{task.description}</p>
                    </div>
                </Card>
               
            </li>
        )
    }
}
