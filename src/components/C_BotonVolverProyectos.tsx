import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftCircleIcon } from 'lucide-react'
export default function C_BotonVolverProyectos() {
    const navigate = useNavigate()
    return (
        
        <Button
            onClick={()=>navigate("/")} 
            variant={"secondary"} 
            className=" py-2 gap-x-3 w-full border-2 border-secundario flex items-center hover:text-secundario">
            <ArrowLeftCircleIcon className=' w-6 h-6'/>
            <p className=" h-full">
                Volver a proyectos
            </p>
        </Button>
    )
}
