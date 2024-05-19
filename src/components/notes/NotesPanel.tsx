import { getNotes } from "@/api/NoteApi"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import NoteDetail from "./NoteDetail"
import { useMediaQuery } from "usehooks-ts"

export default function NotesPanel() {
  const isDesktop = useMediaQuery("(min-width: 768px)")


  //. ->  Obtener id de la tarea
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get("viewTask")! 
  //. ->  Obtener proyecto
  const params = useParams()
  const projectId = params.projectId!
  const { data } = useQuery({
    queryKey:["notes", taskId],
    queryFn:()=>getNotes({projectId, taskId})
  })
  const notes = data ?? []
  if(isDesktop){
    return (
      <div className=" w-full h-full p-5">
        <h2 className=" text-2xl font-bold">Notas</h2>
          <div className=" w-full h-full flex justify-center mt-5">
            <ScrollArea className=" flex flex-col w-full max-w-full h-full max-h-80">
              <ScrollBar orientation="vertical"/>
  
              {notes.length?(
                <>
                  <div className=" w-full max-w-full border border-border divide-y divide-border">
                    {notes.map(note => <NoteDetail key={note._id} note={note}/>)}
                  </div>
                </>
              ):(
                <div className=" w-full mt-5 flex justify-center items-center">
                  <p>Aun no hay notas</p>
                </div>
              )}
            </ScrollArea>
  
          </div>
      </div>
    )
  }
  else {
    return(
      <>
        <div className=" w-full h-full">
        <h2 className=" text-2xl font-bold">Notas</h2>
          <div className=" w-full h-full flex justify-center mt-5">
          {notes.length?(
                <>
                  <div className=" w-full max-w-full border border-border divide-y divide-border">
                    {notes.map(note => <NoteDetail key={note._id} note={note}/>)}
                  </div>
                </>
              ):(
                <div className=" w-full mt-5 flex justify-center items-center">
                  <p>No hay notas</p>
                </div>
              )}
  
          </div>
      </div>
      </>
    )
  }
}
