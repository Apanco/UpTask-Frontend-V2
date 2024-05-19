import { Button } from './ui/button'
import ArrowLeftBack from './icons/ArrowLeftBack'
import { useNavigate } from 'react-router-dom'
export default function C_BotonVolverProyectos() {
    const navigate = useNavigate()
    return (
        
        <Button
            onClick={()=>navigate("/")} 
            variant={"secondary"} 
            className=" py-2 gap-x-3 w-full border-2 border-secundario flex items-center hover:text-secundario">
            <ArrowLeftBack width={2}/>
            <p className=" h-full">
                Volver a proyectos
            </p>
        </Button>
    )
}
