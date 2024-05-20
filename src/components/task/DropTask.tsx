import { useDroppable } from "@dnd-kit/core"
import { useMediaQuery } from "usehooks-ts"

type DropTaskProps = {
    status: string
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

export default function DropTask({status} : DropTaskProps) {

    const { isOver, setNodeRef } = useDroppable({
        id:status
    })
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const styles = isOver ? `${statusStylesText[status]} ${statusStyles[status]}` : "border-muted-foreground"
    if(isDesktop){
        return (
            <div ref={setNodeRef} className={` text-xs text-center text-muted-foreground font-semibold p-2 border border-dashed  mt-5 ${styles}`}>
                Soltar tarea aqui
            </div>
        )
    }else{
        return (
            <>
            </>
        )
    }
}
