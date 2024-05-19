import { Note } from "@/types"
import { Button } from "../ui/button"
import { Loader2, Trash2Icon } from "lucide-react"
import { formatDate, formatDateHour } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "@/api/NoteApi"
import { toast } from "react-toastify"
import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { CalendarDays } from "lucide-react"
 
import {Avatar,AvatarFallback,AvatarImage} from "@/components/ui/avatar"
import {HoverCard,HoverCardContent,HoverCardTrigger} from "@/components/ui/hover-card"




//# ->  Type component
type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({note} : NoteDetailProps) {

    const { data } = useAuth()

    const [load, setLoad] = useState(false)
    //. ->  Obtener id de la tarea
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get("viewTask")! 
    //. ->  Obtener proyecto
    const params = useParams()
    const projectId = params.projectId!
    //. ->  queryClient
    const queryClient = useQueryClient()

    //. ->  mutation
    const { mutateAsync } = useMutation({
        mutationFn: deleteNote,
        onError:(error)=>{
            toast.error(error.message)
            setLoad(false)
        },
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey:["notes", taskId]})
        }
    })
    const isAutor = data?._id === note.createdBy._id ? true : false

    const handleDelete = async ()=>{
        setLoad(true)
        const data = {
            noteId:note._id,
            projectId,
            taskId
        }
        await mutateAsync(data)
    }

    return (
        <>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <div className="mx-auto pl-4 pr-3 flex justify-between items-center py-2 hover:bg-muted">
                        <div className="flex flex-col space-y-1 w-5/6">
                            <p className=" max-w-48 truncate text-sm">{note.content}</p>
                            <p className="text-xs text-muted-foreground">
                                por {note.createdBy.name} el {formatDate(note.createdAt)}
                            </p>
                        </div>
                        <div className=" w-1/6">
                            <Button onClick={handleDelete} variant="ghost" disabled={load || !isAutor} className="py-0 px-2 text-red-700 hover:border-2 hover:border-red-700 disabled:text-muted-foreground">
                                {load?(
                                    <>
                                        <Loader2 className=" h-4 w-4 animate-spin"/>
                                    </>
                                ):(
                                    <>
                                        <Trash2Icon className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                    
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <div className="flex justify-star space-x-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className=" w-fullspace-y-1">
                        <h4 className="text-sm font-bold mb-3">por {" " + note.createdBy.name}</h4>
                        <p className="text-sm w-full max-w-52 break-words mb-2">
                            {note.content}
                        </p>
                        <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                            {formatDate(note.createdAt) + " a las " + formatDateHour(note.createdAt).hour}
                        </span>
                        </div>
                    </div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </>
        
    )
}
