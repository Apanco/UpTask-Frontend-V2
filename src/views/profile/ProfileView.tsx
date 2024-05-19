
//# ->  Components
import {Accordion,AccordionContent,AccordionItem,} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"
//# ->  Hooks
import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import ProfileForm from "@/components/profile/ProfileForm"
import { ProfileForm as ProfileFormType} from "@/types"
import { useQuery } from "@tanstack/react-query"
import { getProjectsUser } from "@/api/ProfileApi"

export default function ProfileView() {
    const {data} = useAuth()
    const user : ProfileFormType = {
        name:data?.name ??"",
        email:data?.email??""
    }
    //. ->  accordion state
    const [value,setValue]=useState("");

    //. ->  button state
    const [active, setActive] = useState(false);

    //. ->  button style´s
    const styles = active ? "text-primary border border-primary hover:border-white" : "hover:text-primary hover:border hover:border-primary"
    //. ->  Accrodion style´s
    const AccordionStyles = active ? "border-t border-border" : ""
    useEffect(()=>{
        if(active){
            setValue("item-1")
        }
        else{
            setValue("")
        }
    },[active])
    //. ->  query
    const { data:projects } = useQuery({
        queryKey:["countProject"],
        queryFn:getProjectsUser
    })
    
    return (
        <div className=" w-full flex flex-col items-center justify-center gap-y-2">
            <div className=" pt-5 l flex flex-col justify-center items-center relative">
                <h2 className=" text-3xl font-bold">{data?.name}</h2>
                <Button
                    onClick={()=>setActive(!active)}
                    variant={"ghost"}
                    className={`absolute w-8 p-0 px-0 -right-10 ${styles}`}
                >
                    <PencilIcon className=" w-4 h-4"/>
                </Button>

                
            </div>
            <p className=" text-base text-muted-foreground">{data?.email}</p>
            <div className=" w-full mt-5 flex justify-center items-center">
                <div className=" w-1/2 flex flex-col items-end justify-center">
                    <div className=" w-auto">
                        <p className=" text-center text-2xl font-bold">{projects?.manager}</p>
                        <p>Proyectos</p>
                    </div>
                </div>
                <div className=" mx-5 h-10 w-[2px] bg-muted-foreground rounded-full"></div>
                <div className=" w-1/2 flex flex-col items-start justify-center">
                    <div className=" w-auto">
                        <p className=" text-center text-2xl font-bold">{projects?.member}</p>
                        <p>Compartidos</p>
                    </div>
                </div>
            </div>
            <div className=" w-full max-w-lg mt-5 px-5 md:p-0">
                <Accordion type="single" collapsible value={value}>
                    <AccordionItem className={`border-0 ${AccordionStyles}`} value="item-1">
                        <AccordionContent>
                            <div className=" w-full pt-5">
                                <h3 className=" text-xl font-bold">Edita tus datos</h3>
                                <ProfileForm user={user} setActive={setActive}/>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    ) 
}
